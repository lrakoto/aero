import { useEffect, useRef } from 'react'

const VERTEX_SHADER = `#version 300 es
precision highp float;
out vec2 vUv;
const vec2 POSITIONS[3] = vec2[](
  vec2(-1.0, -1.0),
  vec2(3.0, -1.0),
  vec2(-1.0, 3.0)
);
void main() {
  vec2 position = POSITIONS[gl_VertexID];
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform vec2 uTextureSize;
uniform vec2 uPointer;
uniform float uPointerActive;
uniform float uTime;
in vec2 vUv;
out vec4 fragColor;

vec2 coverUv(vec2 uv) {
  float viewportAspect = uResolution.x / uResolution.y;
  float textureAspect = uTextureSize.x / uTextureSize.y;
  if (viewportAspect > textureAspect) {
    uv.y = 0.5 + (uv.y - 0.5) * textureAspect / viewportAspect;
  } else {
    uv.x = 0.5 + (uv.x - 0.5) * viewportAspect / textureAspect;
  }
  uv = 0.5 + (uv - 0.5) * 1.26;
  return uv;
}

void main() {
  vec2 uv = coverUv(vUv);
  float t = uTime;
  float broad = sin(uv.x * 18.0 + uv.y * 11.0 + t * 0.46);
  float crossing = sin(uv.x * -14.0 + uv.y * 23.0 - t * 0.34);
  float fine = sin(uv.x * 51.0 - uv.y * 29.0 + t * 0.61);
  vec2 flow = vec2(
    sin(uv.y * 43.0 + t * 0.39 + broad * 0.7),
    cos(uv.x * 37.0 - t * 0.31 + crossing * 0.58)
  );
  flow += vec2(crossing, fine) * 0.48;
  uv += flow * 0.0042;

  vec2 pointerDelta = vUv - uPointer;
  float pointerDistance = length(pointerDelta);
  vec2 pointerDirection = pointerDelta / max(pointerDistance, 0.001);
  float wake = sin(pointerDistance * 94.0 - t * 3.2)
    * exp(-pointerDistance * 8.5)
    * uPointerActive;
  uv += pointerDirection * wake * 0.0032;

  vec3 color = texture(uTexture, uv).rgb;
  float shimmer = 0.97 + (broad * 0.5 + crossing * 0.3 + fine * 0.2) * 0.035;
  fragColor = vec4(color * shimmer, 1.0);
}`

function compileShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export default function OceanCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: 'low-power',
    })
    if (!gl) return undefined

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vertexShader || !fragmentShader) return undefined

    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return undefined

    const texture = gl.createTexture()
    const textureLocation = gl.getUniformLocation(program, 'uTexture')
    const resolutionLocation = gl.getUniformLocation(program, 'uResolution')
    const textureSizeLocation = gl.getUniformLocation(program, 'uTextureSize')
    const pointerLocation = gl.getUniformLocation(program, 'uPointer')
    const pointerActiveLocation = gl.getUniformLocation(program, 'uPointerActive')
    const timeLocation = gl.getUniformLocation(program, 'uTime')

    let disposed = false
    let ready = false
    let rafId
    let lastFrame = 0
    let startTime = performance.now()
    const pointerTarget = { x: 0.5, y: 0.5, active: 0 }
    const pointer = { x: 0.5, y: 0.5, active: 0 }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const density = Math.min(window.devicePixelRatio || 1, 1)
      const width = Math.max(1, Math.round(rect.width * density))
      const height = Math.max(1, Math.round(rect.height * density))
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
      gl.viewport(0, 0, width, height)
    }

    const onPointerMove = ({ clientX, clientY }) => {
      pointerTarget.x = clientX / window.innerWidth
      pointerTarget.y = 1 - clientY / window.innerHeight
      pointerTarget.active = 1
    }
    const onPointerLeave = () => { pointerTarget.active = 0 }

    const render = (now) => {
      if (disposed || document.hidden) return
      if (now - lastFrame < 1000 / 30) {
        rafId = requestAnimationFrame(render)
        return
      }
      lastFrame = now
      resize()
      pointer.x += (pointerTarget.x - pointer.x) * 0.08
      pointer.y += (pointerTarget.y - pointer.y) * 0.08
      pointer.active += (pointerTarget.active - pointer.active) * 0.06
      gl.useProgram(program)
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      gl.uniform2f(pointerLocation, pointer.x, pointer.y)
      gl.uniform1f(pointerActiveLocation, pointer.active)
      gl.uniform1f(timeLocation, (now - startTime) / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      rafId = requestAnimationFrame(render)
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId)
      } else if (ready) {
        startTime = performance.now()
        rafId = requestAnimationFrame(render)
      }
    }

    const image = new Image()
    image.onload = () => {
      if (disposed) return
      gl.useProgram(program)
      gl.disable(gl.DEPTH_TEST)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
      gl.uniform1i(textureLocation, 0)
      gl.uniform2f(textureSizeLocation, image.naturalWidth, image.naturalHeight)
      canvas.dataset.renderer = 'webgl'
      ready = true
      resize()
      rafId = requestAnimationFrame(render)
    }
    image.src = `${import.meta.env.BASE_URL}assets/images/dark-ocean-aerial-v3.jpg`

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      disposed = true
      cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('mouseleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      gl.deleteTexture(texture)
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
    }
  }, [])

  return <canvas ref={canvasRef} className="ambient-ocean-canvas" />
}

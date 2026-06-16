"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function WebGLShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene | null
    camera: THREE.OrthographicCamera | null
    renderer: THREE.WebGLRenderer | null
    mesh: THREE.Mesh | null
    uniforms: any
    animationId: number | null
  }>({
    scene: null,
    camera: null,
    renderer: null,
    mesh: null,
    uniforms: null,
    animationId: null,
  })

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const { current: refs } = sceneRef

    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        
        float d = length(p) * distortion;
        
        // Compute two offset paths for orange and yellow waves to create depth
        float x1 = p.x * (1.0 + d);
        float x2 = p.x * (1.0 - d);

        float intensity1 = 0.05 / abs(p.y + sin((x1 + time) * xScale) * yScale);
        float intensity2 = 0.05 / abs(p.y + sin((x2 + time) * xScale) * yScale);

        // Mix Spark Orange (#ff8f00) and Spark Yellow (#ffb300) along the screen horizontal coordinates
        float gradientT = clamp((p.x + 1.2) / 2.4, 0.0, 1.0);
        
        // Optimize vector maths: since Red is always 1.0 and Blue is always 0.0,
        // we can mix the Green channel as a scalar and build the vectors directly.
        float g1 = mix(0.56, 0.78, gradientT);
        float g2 = 1.34 - g1; // 0.56 + 0.78 = 1.34 (identical to mix(0.78, 0.56, gradientT))

        float r = intensity1 + intensity2;
        float g = g1 * intensity1 + g2 * intensity2;
        
        gl_FragColor = vec4(r, g, 0.0, clamp(r, 0.0, 1.0));
      }
    `

    const initScene = () => {
      refs.scene = new THREE.Scene()
      refs.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
      // Optimize: limit device pixel ratio to 1.5 to reduce fragment shader invocations on high-DPI/Retina screens
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

      refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1)

      refs.uniforms = {
        resolution: { value: [window.innerWidth, window.innerHeight] },
        time: { value: 0.0 },
        xScale: { value: 1.0 },
        yScale: { value: 0.5 },
        distortion: { value: 0.05 },
      }

      const position = [
        -1.0, -1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0,  1.0, 0.0,
      ]

      const positions = new THREE.BufferAttribute(new Float32Array(position), 3)
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", positions)

      const material = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: refs.uniforms,
        side: THREE.DoubleSide,
        transparent: true,
      })

      refs.mesh = new THREE.Mesh(geometry, material)
      refs.scene.add(refs.mesh)

      handleResize()
    }

    let isVisible = true
    const animate = () => {
      if (!isVisible) return
      if (refs.uniforms) refs.uniforms.time.value += 0.01
      if (refs.renderer && refs.scene && refs.camera) {
        refs.renderer.render(refs.scene, refs.camera)
      }
      refs.animationId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      if (!refs.renderer || !refs.uniforms) return
      const parent = canvas.parentElement
      const width = parent ? parent.clientWidth : window.innerWidth
      const height = parent ? parent.clientHeight : window.innerHeight
      if (width === 0 || height === 0) return
      refs.renderer.setSize(width, height, false)
      refs.uniforms.resolution.value = [width, height]
    }

    initScene()
    animate()

    const resizeObserver = new ResizeObserver(() => {
      handleResize()
    })
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement)
    }

    // Optimize: throttle render loop when component is scrolled out of view
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        const nextVisible = entry.isIntersecting
        if (nextVisible && !isVisible) {
          isVisible = true
          animate()
        } else {
          isVisible = nextVisible
        }
      },
      { threshold: 0.01 }
    )
    visibilityObserver.observe(canvas)

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      if (refs.mesh) {
        refs.scene?.remove(refs.mesh)
        refs.mesh.geometry.dispose()
        if (refs.mesh.material instanceof THREE.Material) {
          refs.mesh.material.dispose()
        }
      }
      refs.renderer?.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block z-0 pointer-events-none opacity-80"
    />
  )
}

import { useEffect, useRef } from 'react'

interface Dot {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  opacity: number
  color: string
}

const COLORS = [
  '34, 211, 238',  // cyan-400
  '56, 189, 248',  // sky-400
  '96, 165, 250',  // blue-400
]

const DOT_COUNT = 72

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId: number
    const dots: Dot[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < DOT_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 0.15 + Math.random() * 0.25
      dots.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: 0.8 + Math.random() * 1.2,
        opacity: 0.25 + Math.random() * 0.45,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const dot of dots) {
        dot.x += dot.vx
        dot.y += dot.vy

        if (dot.x < 0) dot.x += canvas.width
        else if (dot.x > canvas.width) dot.x -= canvas.width
        if (dot.y < 0) dot.y += canvas.height
        else if (dot.y > canvas.height) dot.y -= canvas.height

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${dot.color}, ${dot.opacity})`
        ctx.fill()
      }

      rafId = requestAnimationFrame(tick)
    }

    tick()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}

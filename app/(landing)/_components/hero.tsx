'use client'
import React, { useEffect, useRef } from 'react'

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  color: string;
  followMouse: boolean;
}

export default function Hero(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    const particles: Particle[] = []
    const particleCount = 50
    let mouseX = 0
    let mouseY = 0

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const createParticle = (x: number, y: number): Particle => ({
      x,
      y,
      size: Math.random() * 3 + 2,
      speed: Math.random() * 3 + 1,
      angle: Math.random() * Math.PI * 2,
      color: `hsl(${Math.random() * 60 + 200}, 100%, 50%)`,
      followMouse: Math.random() < 0.2,
    })

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(Math.random() * canvas.width, Math.random() * canvas.height))
    }

    const drawParticle = (particle: Particle) => {
      ctx.beginPath()
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size
      )
      gradient.addColorStop(0, particle.color)
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
    }

    const moveParticle = (particle: Particle) => {
      if (particle.followMouse) {
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        particle.x += dx * 0.05
        particle.y += dy * 0.05
      } else {
        particle.x += Math.cos(particle.angle) * particle.speed
        particle.y += Math.sin(particle.angle) * particle.speed
      }

      if (particle.x < 0) particle.x = canvas.width
      if (particle.x > canvas.width) particle.x = 0
      if (particle.y < 0) particle.y = canvas.height
      if (particle.y > canvas.height) particle.y = 0
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        moveParticle(particle)
        drawParticle(particle)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section className="relative bg-gradient-to-b from-primary to-secondary text-white py-20">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Revolutionize Your Customer Interactions with BotDrop AI
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            The All-in-One Chatbot Solution for Lead Generation, Consulting, and Customer Support
          </p>
          <button className="bg-white text-primary px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition duration-300">
            Get Started for Free
          </button>
        </div>
      </div>
    </section>
  )
}
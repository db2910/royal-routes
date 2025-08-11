"use client"

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function FaviconLoader() {
  const pathname = usePathname()
  const router = useRouter()
  const animationRef = useRef<number>()
  const isLoadingRef = useRef(false)

  // Function to set favicon
  const setFavicon = (href: string) => {
    let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    link.href = href
  }

  useEffect(() => {
    let isAnimating = false

    // Function to create animated loading favicon
    const createLoadingFavicon = () => {
      if (isLoadingRef.current) return // Prevent multiple animations
      isLoadingRef.current = true

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = 32
      canvas.height = 32

      const img = new Image()
      img.onload = () => {
        let rotation = 0
        
        const animate = () => {
          // Clear canvas
          ctx.clearRect(0, 0, 32, 32)
          
          // Draw the original favicon
          ctx.drawImage(img, 0, 0, 32, 32)
          
          // Save context
          ctx.save()
          
          // Move to center and rotate
          ctx.translate(16, 16)
          ctx.rotate(rotation)
          
          // Draw loading spinner with brand colors
          ctx.strokeStyle = '#B8860B'
          ctx.lineWidth = 2.5
          ctx.lineCap = 'round'
          
          // Draw arc (partial circle)
          ctx.beginPath()
          ctx.arc(0, 0, 13, 0, Math.PI * 1.5)
          ctx.stroke()
          
          // Restore context
          ctx.restore()
          
          // Update rotation
          rotation += 0.15
          
          // Convert to data URL and set as favicon
          const dataUrl = canvas.toDataURL('image/png')
          setFavicon(dataUrl)
          
          // Continue animation
          if (isAnimating) {
            animationRef.current = requestAnimationFrame(animate)
          }
        }
        
        // Start animation
        isAnimating = true
        animate()
      }
      img.src = '/favicon-32x32.png'
    }

    // Function to stop loading animation
    const stopLoading = () => {
      isAnimating = false
      isLoadingRef.current = false
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      setFavicon('/favicon-32x32.png')
    }

    // Start loading animation when pathname changes
    createLoadingFavicon()

    // Stop loading after navigation completes
    const timer = setTimeout(() => {
      stopLoading()
    }, 1000)

    return () => {
      clearTimeout(timer)
      stopLoading()
    }
  }, [pathname])

  // Listen for router events
  useEffect(() => {
    const handleStart = () => {
      if (!isLoadingRef.current) {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        canvas.width = 32
        canvas.height = 32

        const img = new Image()
        img.onload = () => {
          let rotation = 0
          let isAnimating = true
          
          const animate = () => {
            ctx.clearRect(0, 0, 32, 32)
            ctx.drawImage(img, 0, 0, 32, 32)
            
            ctx.save()
            ctx.translate(16, 16)
            ctx.rotate(rotation)
            
            ctx.strokeStyle = '#B8860B'
            ctx.lineWidth = 2.5
            ctx.lineCap = 'round'
            
            ctx.beginPath()
            ctx.arc(0, 0, 13, 0, Math.PI * 1.5)
            ctx.stroke()
            
            ctx.restore()
            
            rotation += 0.15
            
            const dataUrl = canvas.toDataURL('image/png')
            setFavicon(dataUrl)
            
            if (isAnimating) {
              requestAnimationFrame(animate)
            }
          }
          
          animate()
          
          // Stop after 1 second
          setTimeout(() => {
            isAnimating = false
            setFavicon('/favicon-32x32.png')
          }, 1000)
        }
        img.src = '/favicon-32x32.png'
      }
    }

    // Add event listeners for navigation
    window.addEventListener('beforeunload', handleStart)
    
    return () => {
      window.removeEventListener('beforeunload', handleStart)
    }
  }, [])

  return null
}

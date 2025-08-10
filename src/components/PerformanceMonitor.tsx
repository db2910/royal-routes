"use client"

import { useEffect } from 'react'

export default function PerformanceMonitor() {
  useEffect(() => {
    // Track page load performance
    if (typeof window !== 'undefined') {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming
            console.log('Page Load Performance:', {
              totalLoadTime: navEntry.loadEventEnd - navEntry.loadEventStart,
              domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
              firstPaint: performance.getEntriesByType('paint').find(p => p.name === 'first-paint')?.startTime,
              firstContentfulPaint: performance.getEntriesByType('paint').find(p => p.name === 'first-contentful-paint')?.startTime,
            })
          }
        }
      })
      
      observer.observe({ entryTypes: ['navigation', 'paint'] })
      
      return () => observer.disconnect()
    }
  }, [])

  return null // This component doesn't render anything
}

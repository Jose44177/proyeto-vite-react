import React, { useEffect, useRef, ReactNode } from 'react'
import SplitType from 'split-type'

interface LineRevealProps {
  children: ReactNode
  stagger?: number
  rootMargin?: string
  className?: string
}

export function LineReveal({
  children,
  stagger = 80,
  rootMargin = '0px 0px -10% 0px',
  className = '',
}: LineRevealProps) {
  const rootRef = useRef<HTMLParagraphElement>(null)
  const splitInstanceRef = useRef<SplitType | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    let lines: HTMLElement[] = []
    let reducedMotion = false

    // respect prefers-reduced-motion
    try {
      reducedMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    } catch (e) {
      reducedMotion = false
    }

    // helper: add base styles to lines (but don't start animation yet)
    const prepareLines = (nodeList: NodeListOf<HTMLElement> | HTMLElement[]) => {
      lines = Array.from(nodeList)
      lines.forEach((ln) => {
        // ensure block display so lines stack vertically
        ln.classList.add('block')
        // start hidden (avoid FOUC)
        ln.classList.add('opacity-0')
        // ensure transform compositing class exists if animation runs later
        ln.classList.add('transform-gpu')
      })
    }

    let didSplitWithLib = false
    try {
      // Como estamos enviando import estático directamente a react, se usará el bundle de 'split-type' 
      splitInstanceRef.current = new SplitType(el, { types: 'lines', tagName: 'span' })
      const nodeList = el.querySelectorAll<HTMLElement>('.line')
      prepareLines(nodeList)
      didSplitWithLib = true
    } catch (err) {
      didSplitWithLib = false
    }

    if (!didSplitWithLib) {
      // fallback: split by newline \n
      const raw = typeof children === 'string' ? children : el.innerText || ''
      const arr = raw.split('\n').map((s) => s.trim()).filter(Boolean)
      el.innerHTML = ''
      arr.forEach((lineText) => {
        const span = document.createElement('span')
        span.className = 'block opacity-0 transform-gpu'
        span.textContent = lineText
        el.appendChild(span)
      })
      prepareLines(el.querySelectorAll<HTMLElement>('span'))
    }

    const animateLines = () => {
      if (reducedMotion) {
        lines.forEach((ln) => {
          ln.style.opacity = '1'
          ln.style.transform = 'none'
          ln.style.filter = 'none'
        })
      } else {
        lines.forEach((ln, i) => {
          ln.style.willChange = 'transform, opacity, filter'
          ln.classList.add('animate-fade-up-blur')
          ln.style.animationDelay = `${i * stagger}ms`

          const handleAnimEnd = () => {
            ln.style.willChange = 'auto'
            // ln.removeEventListener('animationend', handleAnimEnd)
          }
          ln.addEventListener('animationend', handleAnimEnd, { once: true})
        })
      }
    }

    // Set up IntersectionObserver to trigger animation when visible
    if ('IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateLines()
              if (observerRef.current) {
                observerRef.current.disconnect()
              }
            }
          })
        },
        { root: null, rootMargin, threshold: 0.12 }
      )

      observerRef.current.observe(el)
    } else {
      animateLines()
    }

    // cleanup on unmount
    return () => {
      try {
        if (splitInstanceRef.current && typeof splitInstanceRef.current.revert === 'function') {
          splitInstanceRef.current.revert()
        }
      } catch (e) {
        // ignore
      }
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [children, stagger, rootMargin])

  return (
    <p ref={rootRef} className={`leading-relaxed ${className}`}>
      {children}
    </p>
  )
}
import { useCallback, useEffect, useRef, useState } from "react"

export function useCarouselNavigation(genresLength: number) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [stableActiveIndex, setStableActiveIndex] = useState(0)
  const [mountedIndices, setMountedIndices] = useState<Set<number>>(new Set([0]))
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Debounce the active index so left-panel animations only fire when the user settles on a genre
  useEffect(() => {
    const timeout = setTimeout(() => {
      setStableActiveIndex(activeIndex)
    }, 150)
    return () => clearTimeout(timeout)
  }, [activeIndex])

  // Track mounted indices for background image transitions
  useEffect(() => {
    setMountedIndices(prev => {
      const next = new Set(prev)
      next.add(activeIndex)
      return next
    })

    const timeout = setTimeout(() => {
      setMountedIndices(prev => {
        const next = new Set(prev)
        for (const idx of next) {
          if (idx !== activeIndex && Math.abs(idx - activeIndex) > 1) {
            next.delete(idx)
          }
        }
        return next
      })
    }, 1500) // 1.5s matches the transition duration

    return () => clearTimeout(timeout)
  }, [activeIndex])

  const handleNavigate = useCallback(
    (direction: "up" | "down") => {
      setActiveIndex((prev) => {
        if (direction === "up") return prev > 0 ? prev - 1 : prev
        return prev < genresLength - 1 ? prev + 1 : prev
      })
    },
    [genresLength]
  )

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault()
        handleNavigate("up")
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault()
        handleNavigate("down")
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleNavigate])

  // Wheel and Touch navigation
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let accumulatedDelta = 0
    let isWheeling = false

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (isWheeling) return

      accumulatedDelta += e.deltaY
      if (Math.abs(accumulatedDelta) > 50) {
        handleNavigate(accumulatedDelta > 0 ? "down" : "up")
        accumulatedDelta = 0
        isWheeling = true
        setTimeout(() => {
          isWheeling = false
        }, 400)
      }
    }

    let touchStartY = 0
    let touchStartT = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      touchStartT = Date.now()
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY
      const deltaY = touchStartY - touchEndY
      const deltaT = Date.now() - touchStartT

      if (Math.abs(deltaY) > 40 && deltaT < 500) {
        handleNavigate(deltaY > 0 ? "down" : "up")
      }
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    container.addEventListener("touchstart", handleTouchStart, { passive: true })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })
    container.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      container.removeEventListener("wheel", handleWheel)
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("touchend", handleTouchEnd)
    }
  }, [handleNavigate])

  // Smoothly track and center active item
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let frameId: number
    const startTime = performance.now()

    const trackCenter = () => {
      const cards = container.children
      if (cards[activeIndex]) {
        const card = cards[activeIndex] as HTMLElement
        const containerRect = container.getBoundingClientRect()
        const cardRect = card.getBoundingClientRect()

        const offset = cardRect.top - containerRect.top - containerRect.height / 2 + cardRect.height / 2

        if (Math.abs(offset) > 0.5) {
          container.scrollTop += offset * 0.15
        }
      }

      if (performance.now() - startTime < 1200) {
        frameId = requestAnimationFrame(trackCenter)
      }
    }

    frameId = requestAnimationFrame(trackCenter)

    return () => cancelAnimationFrame(frameId)
  }, [activeIndex])

  return {
    activeIndex,
    stableActiveIndex,
    mountedIndices,
    handleNavigate,
    setActiveIndex,
    scrollContainerRef,
  }
}

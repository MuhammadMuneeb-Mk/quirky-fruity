import { useEffect } from 'react'

// Adds .is-visible to [data-reveal] elements when they scroll into view (see index.css).
export function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]:not(.is-visible)')
    const showAll = () => items.forEach((el) => el.classList.add('is-visible'))

    if (!('IntersectionObserver' in window)) {
      showAll()
      return
    }

    // the observer always reports once right away; if it never does, show everything
    let reported = false
    const observer = new IntersectionObserver(
      (entries) => {
        reported = true
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    items.forEach((el) => observer.observe(el))
    const fallback = setTimeout(() => !reported && showAll(), 1500)

    return () => {
      clearTimeout(fallback)
      observer.disconnect()
    }
  }, [])
}

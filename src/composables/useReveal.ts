import { animate } from 'animejs'

export function useReveal() {
  const observeElements = (className: string) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger the Anime.js Reveal
            animate(entry.target, {
              translateY: [60, 0], // Starts 60px down
              opacity: [0, 1], // Fades in
              duration: 2000,
              easing: 'easeOutQuart',
              delay: 200, // Slight delay for smoothness
            })

            // Stop watching once animated (Samsung style)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.15, // Triggers when 15% of the element is visible
      }
    )

    // Find all elements and start observing
    document.querySelectorAll(`.${className}`).forEach((el) => {
      // Set initial state via JS to avoid "flicker" before script loads
      ;(el as HTMLElement).style.opacity = '0'
      observer.observe(el)
    })
  }

  return { observeElements }
}

import { animate } from 'animejs'

const PENDING_CLASS = 'reveal-pending'

/**
 * Reveal-on-scroll. Content is rendered visible by the server; only elements that are
 * still below the fold when this runs are hidden and then animated in as they scroll
 * into view. Anything already on screen (and everything, without JS) stays visible.
 */
export function useReveal() {
  const observeElements = (className: string) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger the Anime.js Reveal
            animate(entry.target, {
              translateY: [30, 0], // Starts 30px down
              opacity: [0, 1], // Fades in
              duration: 500,
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

    // Safe to call repeatedly: elements that were already handled are skipped
    document.querySelectorAll<HTMLElement>(`.${className}:not([data-reveal])`).forEach((el) => {
      el.dataset.reveal = ''
      if (el.getBoundingClientRect().top < window.innerHeight) {
        return
      }
      el.classList.add(PENDING_CLASS)
      observer.observe(el)
    })
  }

  return { observeElements }
}

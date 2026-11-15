/** Counteracts iOS Safari (and others) restoring scroll position after reload. */
export function forceDocumentScrollTop(): void {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

/** Run as early as possible; Safari may re-apply saved scroll after `load`. */
export function initScrollToTopOnHardLoad(): void {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }
  forceDocumentScrollTop()

  window.addEventListener('load', () => {
    forceDocumentScrollTop()
    window.setTimeout(forceDocumentScrollTop, 100)
    window.setTimeout(forceDocumentScrollTop, 300)
  })
}

const findNextPage = () => {
  const sections = document.querySelectorAll('.Page')
  let currentIndex = 0
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect()
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      currentIndex = index
    }
  })
  const nextIndex = (currentIndex + 1) % sections.length
  return sections[nextIndex]
}

export const scrollToPage = (element?: HTMLElement) => {
  if (element) {
    const top = element.getBoundingClientRect().top + documentScrollY() - 78
    window.scrollTo({
      top: Math.max(0, top),
      behavior: 'smooth',
    })
  }
}

export const scrollToNextPage = () => {
  const nextPage = findNextPage()
  scrollToPage(nextPage as HTMLElement)
}

const CONTACT_PAGE_ID = 'contact-page'

function documentScrollY(): number {
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
}

function navOffsetPx(): number {
  const nav = document.querySelector('nav.NavBar') as HTMLElement | null
  const h = nav?.getBoundingClientRect().height
  return Math.ceil(h ?? 78) + 48
}

/**
 * Scrolls to the contact section. Uses window.scrollTo because iOS Safari often
 * ignores or mis-handles scrollIntoView({ behavior: 'smooth' }) on the document.
 */
export function scrollToContactPage(): void {
  const el = document.getElementById(CONTACT_PAGE_ID)
  if (!el) {
    return
  }
  const offset = navOffsetPx()
  const top = el.getBoundingClientRect().top + documentScrollY() - offset
  window.scrollTo({
    top: Math.max(0, top),
    behavior: 'auto',
  })
}
export function scrollToContactPageAfterLayout(): void {
  scrollToContactPage()
  window.setTimeout(() => {
    const el = document.getElementById(CONTACT_PAGE_ID)
    if (!el) {
      return
    }
    const offset = navOffsetPx()
    const visibleTop = el.getBoundingClientRect().top
    if (visibleTop > offset + 48) {
      scrollToContactPage()
    }
  }, 280)
}

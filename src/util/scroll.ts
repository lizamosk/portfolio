const findNextPage = () => {
    const sections = document.querySelectorAll('.Page');
    let currentIndex = 0;
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        // Check if the section is mostly in the viewport
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            currentIndex = index;
        }
    });
    const nextIndex = (currentIndex + 1) % sections.length;
    return sections[nextIndex];
}

export const scrollToPage = (element?: HTMLElement) => {
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

export const scrollToNextPage = () => {
  const nextPage = findNextPage();
  scrollToPage(nextPage as HTMLElement);
};

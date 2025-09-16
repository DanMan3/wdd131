document.addEventListener('DOMContentLoaded', () => {
    const imgs = document.querySelectorAll('.lazy-img');
    imgs.forEach(img => {
        if (img.complete && img.naturalWidth !== 0) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            }, { once: true });
            img.addEventListener('error', () => {
                img.classList.add('loaded');
            }, { once: true });
        }
    });

    const last = document.getElementById('last-modified');
    if (last) {
        last.textContent = document.lastModified || 'Unknown';
    }
});
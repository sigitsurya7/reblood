const rootElement = document.getElementById('theme')

export function theme({ theme }) {
    if (rootElement) {
        rootElement.setAttribute('data-theme', theme)
    }
}
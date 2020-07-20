export function debounceEvent(handleFunction, timeInterval = 1000, timeout) {
    // Como timeout não é passado nada, ele inicia como null
    return function (...args) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            handleFunction(...args)
        }, timeInterval)
    }
}

export const formatSearch = search => search.replace(' ', '+')

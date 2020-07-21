export function debounceEvent(handleFunction, timeInterval = 1000, timeout) {
    // Como timeout não é passado nada, ele inicia como null
    const clear = () => clearTimeout(timeout)
    
    const debouceFunction = (...args) => {
        clear()
        timeout = setTimeout(() => {
            handleFunction(...args)
        }, timeInterval)
    }

    return [debouceFunction, clear]
}

export const formatSearch = search => search.replace(' ', '+')

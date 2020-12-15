// Search box

import { getMovies } from './api.js'
import { debounceEvent, formatSearch } from './helpers.js'
import {
    renderMovies,
    createLoaderWithContainer,
    createInfoDiv,
    createNotFoundInfo,
    clearFilteredMovies,
    createInitialMessage
} from './dom.js'

export default function movieSearch() {
    const container = document.querySelector('#filter-movies')
    const filteredContainer = document.querySelector('#filtered-movies')

    const filterForm = document.querySelector('#filter-form')
    const inputElement = filterForm.querySelector('input')

    const loader = createLoaderWithContainer()
    const intialInfo = createInitialMessage()

    const cachedSearchs = []

    createInfoDiv(container, intialInfo)

    const handleSearch = filter => {
        const search = `&s=${filter}`
        console.log('executed with ', filter)
        clearFilteredMovies()
        getMovies(search)
            .then(movies => {
                renderMovies(movies, filteredContainer)
            })
            .catch(error => {
                createInfoDiv(container, createNotFoundInfo())
            })
            .finally(() => {
                if (document.contains(loader)) loader.remove()
            })
    }

    const [debounceSearch, clearSearchDebounce] = debounceEvent(handleSearch, 1000)

    function isRepeatedSearch(value) {
        const lastSearch = cachedSearchs.slice(-1)[0]
        if (value === lastSearch) return true
        return false
    }

    function start() {
        filterForm.addEventListener('submit', e => {
            e.preventDefault()
            const value = inputElement.value

            if (isRepeatedSearch(value)) return

            clearSearchDebounce()
            clearFilteredMovies()
            container.append(loader)
            handleSearch(formatSearch(value))
            cachedSearchs.push(value)
        })

        inputElement.addEventListener('keyup', e => {
            const value = e.target.value

            if (isRepeatedSearch(value)) return

            clearFilteredMovies()

            if (value.length === 0) {
                clearSearchDebounce()
                loader.remove()
                createInfoDiv(container, intialInfo)
                return
            }

            container.append(loader)
            cachedSearchs.push(e.target.value)

            debounceSearch(formatSearch(value))

        })
    }

    return { start }
}

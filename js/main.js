import { getMovies } from './api.js'
import { debounceEvent, formatSearch } from './helpers.js'
import {
    SPOTLIGHT_TITLES,
    RECOMENDED_TITLES
} from './settings.js'
import { renderCarrouselMovies } from './carrousel.js'
import {
    renderMovies,
    createLoaderWithContainer,
    createInfoDiv,
    createNotFoundInfo,
    clearFilteredMovies,
    createInitialMessage
} from './dom.js'

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

filterForm.addEventListener('submit', e => {
    e.preventDefault()
    container.append(loader)
    handleSearch(formatSearch(inputElement.value))
    clearFilteredMovies()
})

inputElement.addEventListener('keyup', e => {
    const value = e.target.value
    const lastSearch = cachedSearchs.slice(-1)[0]

    if (value === lastSearch) return

    clearFilteredMovies()

    if (value.length === 0) {
        clearSearchDebounce()
        createInfoDiv(container, intialInfo)
        return
    }

    container.append(loader)
    cachedSearchs.push(e.target.value)

    debounceSearch(formatSearch(value))

})

const recommendedCarrousel = document.getElementById('recommended-container')
const spotlightCarrousel = document.getElementById('spotlight-container')

renderCarrouselMovies(spotlightCarrousel, SPOTLIGHT_TITLES)
renderCarrouselMovies(recommendedCarrousel, RECOMENDED_TITLES)
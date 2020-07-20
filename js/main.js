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


const container = document.querySelector('#filter-movies')
const filteredContainer = document.querySelector('#filtered-movies')

const filterForm = document.querySelector('#filter-form')
const inputElement = filterForm.querySelector('input')

const loader = createLoaderWithContainer()
const intialInfo = createInitialMessage()

const cachedSearchs = []


createInfoDiv(container, intialInfo)

const handleSearch = filter => {

    clearFilteredMovies()
    const search = `&s=${filter}`
    container.append(loader)
    getMovies(search)
        .then(movies => {
            renderMovies(movies, filteredContainer)
        })
        .catch(error => {
            createInfoDiv(container, createNotFoundInfo())
        })
        .finally(() => {
            loader.remove()
        })
}

const debounceSearch = debounceEvent(handleSearch, 1000)

filterForm.addEventListener('submit', e => {
    e.preventDefault()
    handleSearch(formatSearch(inputElement.value))
})

inputElement.addEventListener('keyup', e => {
    const value = e.target.value
    const lastSearch = cachedSearchs.slice(-1)[0]

    if (value === lastSearch) return
    if (document.querySelector('.loader-container')) return

    if (value.length === 0) {
        clearFilteredMovies()
        createInfoDiv(container, intialInfo)
        return
    }

    cachedSearchs.push(e.target.value)

    debounceSearch(formatSearch(value))

})

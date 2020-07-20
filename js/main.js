import { getMovies } from './api.js'
import {
    renderMovies,
    createLoaderWithContainer,
    createInfoDiv,
    createNotFoundInfo,
    clearFilteredMovies,
    createInitialMessage
} from './dom.js'

const container = document.querySelector('#filter-movies')

const filterForm = document.querySelector('#filter-form')
const inputElement = filterForm.querySelector('input')

const filteredContainer = document.querySelector('#filtered-movies')
const loader = createLoaderWithContainer()

const intialInfo = createInitialMessage()

createInfoDiv(container, intialInfo)

const handleSearch = filter => {

    const search = `&s=${filter}`
    container.append(loader)
    getMovies(search)
        .then(movies => {
            renderMovies(movies, filteredContainer)
            loader.remove()
        })
        .catch(error => {
            createInfoDiv(container, createNotFoundInfo())
            loader.remove()
        })
    clearFilteredMovies()
}

filterForm.addEventListener('submit', e => {
    e.preventDefault()
    const filter = inputElement.value.replace(' ', '+')
    handleSearch(filter)
})

inputElement.addEventListener('keyup', e => {
    const value = e.target.value
    if (value.length === 0) {
        clearFilteredMovies()
        createInfoDiv(container, intialInfo)
        return
    }
    const filter = value.replace(' ', '+')

    handleSearch(filter)

})

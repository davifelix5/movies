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

filterForm.addEventListener('submit', e => {
    e.preventDefault()
    const filter = inputElement.value.replace(' ', '+')
    handleSearch(filter)
})

let time = null
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
    const filter = value.replace(' ', '+')

    cachedSearchs.push(e.target.value)
    
    clearTimeout(time)

    time = setTimeout(() => {
        handleSearch(filter)
    }, 1000)

})

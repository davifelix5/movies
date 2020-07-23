import { getDetailMovieByTitle } from './api.js'
import { renderMovies, createLoaderWithContainer } from './dom.js'
import { SPOTLIGHT_TITLES, RECOMENDED_TITLES, SCROLL_RANGE } from './settings.js'

export async function renderCarrouselMovies(container, titles) {

    const listContainer = container.querySelector('.list-container')
    const movies = []
    const loaderElement = createLoaderWithContainer()

    function getMovieInfo(movie) {
        const { Title: title, Year: year, Poster: poster, Genre: genre } = movie
        return { title, year, poster, genre }
    }

    listContainer.append(loaderElement)
    for (const title of titles) {
        const data = await getDetailMovieByTitle(title)
        movies.push(getMovieInfo(data))
    }
    loaderElement.remove()

    renderMovies(movies, listContainer)

    const arrowNext = container.querySelector('.fa-angle-right')
    const arrowBack = container.querySelector('.fa-angle-left')
    const carrousel = listContainer.querySelector('ul')
    arrowBack.addEventListener('click', () => {
        carrousel.scrollLeft -= SCROLL_RANGE
    })
    arrowNext.addEventListener('click', () => {
        carrousel.scrollLeft += SCROLL_RANGE
    })

}

const spotlightContainer = document.querySelector('.spotlight .carrousel')
const recommendedContainer = document.querySelector('.recommended .carrousel')

renderCarrouselMovies(spotlightContainer, SPOTLIGHT_TITLES)
renderCarrouselMovies(recommendedContainer, RECOMENDED_TITLES)
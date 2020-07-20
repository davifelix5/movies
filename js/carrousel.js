import { getDetailMovieByTitle } from './api.js'
import { renderMovies, createLoaderWithContainer } from './dom.js'

export async function renderCarrouselMovies(container, titles) {

    const movies = []
    const loaderElement = createLoaderWithContainer()

    function getMovieInfo(movie) {
        const { Title: title, Year: year, Poster: poster, Genre: genre } = movie
        return { title, year, poster, genre }
    }

    container.append(loaderElement)
    for (const title of titles) {
        const data = await getDetailMovieByTitle(title)
        movies.push(getMovieInfo(data))
    }
    loaderElement.remove()

    renderMovies(movies, container)
}
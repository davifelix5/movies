import { BASE_URL } from './settings.js'
import { formatSearch } from './helpers.js'

export async function getMovies(search) {

    const url = BASE_URL + search
    const response = await fetch(url)

    const { Search: data } = await response.json()
    if (!data) throw new Error('Não foi encontado nenhum filme')

    const movies = []
    for (const movie of data) {
        const {
            Title: title,
            Year: year,
            imdbID: id
        } = movie

        const data = await getDetailMovieById(id)
        const { Genre: genre } = data

        const placeholder = `https://via.placeholder.com/300x445/FFF/?text=${title}`
        const poster = movie.Poster === "N/A" ? placeholder : movie.Poster

        movies.push({ title, poster, year, genre })
    }

    return movies.filter(Boolean)

}

export async function getDetailMovieById(id) {
    return await getDetailMovie(`&i=${id}`)
}

export async function getDetailMovieByTitle(title) {
    const formatedTitle = formatSearch(title)
    const filter = `&t=${formatedTitle}`
    return await getDetailMovie(filter)

}

async function getDetailMovie(filter) {
    return fetch(BASE_URL + filter).then(response => response.json())
}
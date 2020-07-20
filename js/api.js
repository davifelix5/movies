import { BASE_URL } from './settings.js'

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

        const detail = await fetch(BASE_URL + `&i=${id}`)
        const data = await detail.json()
        const { Genre: genre } = data

        const placeholder = `https://via.placeholder.com/300x445/FFF/?text=${title}`
        const poster = movie.Poster === "N/A" ? placeholder : movie.Poster

        movies.push({ title, poster, year, genre })
    }

    return movies.filter(Boolean)

}

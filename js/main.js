const baseUrl = 'http://www.omdbapi.com/?apikey=699ac45b&s=Star+Wars'
const filteredMovies = document.querySelector('#filtered-movies ul')

getMovies()

async function getMovies() {
    const response = await fetch(baseUrl)
    const { Search: data } = await response.json()

    data.forEach(movie => {
        const { Title: title, Poster: poster } = movie

        const movieElement = renderMovie(title, poster, title)
        filteredMovies.append(movieElement)
    })
}

function renderMovie(title, poster, desctiption) {
    const li = document.createElement('li')
    const figure = document.createElement('figure')
    const image = document.createElement('img')
    image.src = poster
    image.alt = title
    const figcaption = document.createElement('figcaption')
    figcaption.classList = 'description'
    const paragraph = document.createElement('p')
    paragraph.innerHTML = desctiption


    figcaption.append(paragraph)
    figure.append(image)
    figure.append(figcaption)
    li.append(figure)

    return li

}



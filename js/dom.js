function removeExisting(className) {
    const existing = document.querySelector(`.${className}`)
    if (existing) {
        existing.remove()
    }
}

export function renderMovies(movies, container) {
    const list = document.createElement('ul')
    list.classList = 'movie-list'
    movies.forEach(movie => {
        const { title, year, poster, genre } = movie
        const movieElement = renderMovie(title, poster, year, genre)
        list.append(movieElement)
    })
    container.append(list)
}

export function clearFilteredMovies() {
    const list = document.querySelector('#filtered-movies ul')
    const info = document.querySelector('#filter-movies .info')
    if (list) list.remove()
    if (info) info.remove()
}

export function createInfoDiv(container, messageElement) {
    const errorDiv = document.createElement('div')
    errorDiv.classList = 'info'
    errorDiv.append(messageElement)
    container.append(errorDiv)
}

export function createNotFoundInfo() {
    const errorParagraph = document.createElement('p')
    const iconElement = createIcon('fa fa-frown-o')
    errorParagraph.innerHTML = 'Não foi encontrado nenhum filme '
    errorParagraph.append(iconElement)
    return errorParagraph
}

export function createInitialMessage() {
    const initialParagraph = document.createElement('p')
    const iconElement = createIcon('fa fa-arrow-up')
    initialParagraph.innerHTML = 'Pesquise para encontrar filmes '
    initialParagraph.append(iconElement)
    return initialParagraph
}

export function createIcon(classes) {
    const iconElement = document.createElement('i')
    iconElement.setAttribute('aria-hidden', 'true')
    iconElement.classList = classes
    return iconElement
}

export function createLoader() {
    const loader = document.createElement('div')
    loader.classList = 'loader'
    return loader
}

export function createLoaderContainer() {
    const loaderContainer = document.createElement('div')
    loaderContainer.classList = 'loader-container'
    return loaderContainer
}

export function createLoaderWithContainer() {
    const loaderContainer = createLoaderContainer()
    const loader = createLoader()
    loaderContainer.append(loader)
    return loaderContainer
}

export function renderMovie(title, poster, year, genre) {

    const li = document.createElement('li')
    const figure = document.createElement('figure')
    const image = document.createElement('img')
    image.src = poster || `https://via.placeholder.com/300x445/FFF/?text=?`
    image.alt = title || ''
    const figcaption = document.createElement('figcaption')
    figcaption.classList = 'description'
    const titleParagraph = document.createElement('p')
    const genreParagrash = document.createElement('p')
    const yearParagragh = document.createElement('p')
    titleParagraph.innerHTML = title || ''
    genreParagrash.innerHTML = genre || ''
    yearParagragh.innerHTML = year || ''


    figcaption.append(titleParagraph)
    figcaption.append(genreParagrash)
    figcaption.append(yearParagragh)
    figure.append(image)
    figure.append(figcaption)
    li.append(figure)

    return li

}
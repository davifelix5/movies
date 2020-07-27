import { SPOTLIGHT_TITLES, RECOMENDED_TITLES } from './settings.js'
import { startMovieCarrousel } from './carrousel.js'
import movieSearch from './search.js'

(function () {

    const search = movieSearch()
    search.start()

    startMovieCarrousel(
        RECOMENDED_TITLES,
        document.querySelector('.recommended')
    )

    startMovieCarrousel(
        SPOTLIGHT_TITLES,
        document.querySelector('.spotlight')
    )

})()

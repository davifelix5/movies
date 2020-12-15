import createCarrousel from './carrousel';
import { createActorsList } from './dom'

const actors = [
    {
        name: "João Lucas",
        image: "./img/download.jpg"
    },
    {
        name: "João Lucas",
        image: "./img/download.jpg"
    }
]

const carrousel = createCarrousel(
    actors,
    document.querySelector('#actors'),
    createActorsList,
    1
)
carrousel.start()
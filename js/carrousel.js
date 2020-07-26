import { createMovieList } from './dom.js'
import { getMovieListByTitles } from './api.js'

export default function createCarrousel(moviesList, container, amount = 3) {
    const movies = moviesList.slice();
    const listContainer = container.querySelector(".list-container");
    const groups = createMovieGroups(movies);
    const nextBtn = container.querySelector(".angle-container-next");
    const backBtn = container.querySelector(".angle-container-back");
    const progressBar = container.querySelector(".progress-bar");
    const progressCircles = createProgressCircles(groups);
    progressCircles.forEach(circle => progressBar.append(circle));
    const classes = ["hidden-left", "selected", "hidden-right"];
    const getSelected = () => container.querySelector(".selected");
    const getRenderedElementsByClass = () => {
        const hiddenRight = listContainer.querySelector(".hidden-right");
        const AllHiddenLeft = listContainer.querySelectorAll(".hidden-left");
        const [hiddenLeft] = Array.from(AllHiddenLeft).slice(-1);
        const selected = listContainer.querySelector(".selected");
        return [hiddenRight, hiddenLeft, selected];
    };
    const getRenderedElements = () => Array.from(listContainer.children);
    const isLastChild = (el, parent) => el === parent.lastChild
    const isFirstChild = (el, parent) => el === parent.children[0]

    initCarrousel();

    function initCarrousel() {
        const [firstGroup] = groups
        for (const gp of groups) {
            gp.classList = 'hidden-right'
            listContainer.append(gp)
        }
        firstGroup.classList = 'selected'
        container.querySelector(".carrousel").append(progressBar);
        handleCirclesChange();
    }

    function handlePass(getNextIndex) {
        getRenderedElementsByClass().forEach(group => {
            if (!group) return;
            const { 0: className } = group.classList;
            const classIndex = classes.indexOf(className);
            const newIndex = getNextIndex(classIndex);
            const newClass = classes[newIndex];
            if (!newClass) return;
            group.classList = newClass;
        });
        handleCirclesChange();
    }

    function clickBack() {
        if (isFirstChild(getSelected(), listContainer)) {
            fetchBackGroup();
            return;
        }
        handlePass(classIndex => classIndex + 1);
    }

    function clickNext() {
        if (isLastChild(getSelected(), listContainer)) {
            fetchNextGroup();
            return;
        }
        handlePass(classIndex => classIndex - 1);
    }

    function fetchNextGroup() {
        const elements = getRenderedElements()
        const selected = getSelected()
        elements.slice(0, 1).forEach(el => {
            el.remove()
            el.classList = 'hidden-right'
            listContainer.append(el)
        })
        selected.classList = 'hidden-left'
        const pass = () => {
            selected.removeEventListener('transitionstart', pass)
            handlePass(index => index - 1)
        }
        selected.addEventListener('transitionstart', pass)
    }

    function fetchBackGroup() {
        const elements = getRenderedElements()
        const selected = getSelected()
        elements.slice(-1).reverse().forEach(el => {
            el.remove()
            el.classList = 'hidden-left'
            listContainer.prepend(el)
        })
        selected.classList = 'hidden-right'
        const back = () => {
            selected.removeEventListener('transitionstart', back)
            handlePass(index => index + 1)
        }
        selected.addEventListener('transitionstart', back)
    }


    function createProgressCircles(movieGrops) {
        const progressCircles = [];
        movieGrops.forEach((group, index) => {
            const circle = document.createElement("i");
            circle.classList = "fa fa-circle-o";
            circle.setAttribute("key", index);
            progressCircles.push(circle);
        });
        return progressCircles;
    }

    function handleCirclesChange() {
        const key = getSelected().getAttribute("key");
        progressCircles.forEach(circle => {
            circle.classList = "fa fa-circle-o";
        });
        progressCircles[key].classList = "fa fa-circle";
    }

    function passByCircles(selectedKey, destinationKey) {
        const variation = destinationKey - selectedKey;
        const difference = variation;
        console.log(difference)
        const offset = Math.abs(difference);
        for (let i = 0; i < offset; i++) {
            setTimeout(() => {
                difference > 0 ? nextBtn.click() : backBtn.click();
            }, 100 * i);
        }
    }

    function createMovieGroups(movies) {
        const movieLists = [];
        while (movies.length) {
            const movieGroup = movies.splice(0, amount);
            movieLists.push(createMovieList(movieGroup));
        }
        return movieLists.map((movieList, index) => {
            const group = document.createElement("div");
            group.append(movieList);
            group.setAttribute("key", index);
            return group;
        });
    }

    function start() {
        nextBtn.addEventListener("click", () => {
            clearInterval(interval);
            clickNext();
        });

        backBtn.addEventListener("click", () => {
            clearInterval(interval);
            clickBack();
        });

        progressBar.addEventListener("click", e => {
            const destinationKey = e.target.getAttribute("key");
            if (!destinationKey) return;
            const selected = progressCircles.find(circle => {
                return circle.classList.contains("fa-circle");
            });
            const selectedKey = selected.getAttribute("key");
            passByCircles(selectedKey, destinationKey);
        });

        let interval = setInterval(() => {
            clickNext();
        }, 5000);
    }

    return { start };
}

export function startMovieCarrousel(titles, container, movieAmount = 3) {
    getMovieListByTitles(titles)
        .then(movies => {
            const carrousel = createCarrousel(
                movies,
                container,
                movieAmount
            )
            carrousel.start()
        })
        .finally(() => {
            container.querySelector('.loader-container').remove()
        })
}
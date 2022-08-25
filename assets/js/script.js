// declaring variables
// jquery
var row2 = $("#row2")
var btnProfile1 = $("#btnProfile1")
var btnReset = $("#Reset")
// vanilla
var moviePoster = document.getElementById("moviePoster")
var foodPoster = document.getElementById("foodPoster")
var row1Vanilla = document.getElementById("row1")
var row2Vanilla = document.getElementById("row2")
// numbers and objects
var slideShowCounter = 0
var movieSlideCounter = 0
var counter = 0
var movieInfo
var foodInfo = []
var cuisine = [
    {
        category: "American",
        image: "./assets/images/American.jpg",
        isChosen: false,
    },
    {
        category: "Italian",
        image: "./assets/images/Italian.jpg",
        isChosen: false,
    },
    {
        category: "Sushi",
        image: "./assets/images/Sushi.jpg",
        isChosen: false,
    },
    {
        category: "Chinese",
        image: "./assets/images/Chinese.jpg",
        isChosen: false,
    },
    {
        category: "Latin",
        image: "./assets/images/Mexican.jpg",
        isChosen: false,
    }]

// options for the foodAPI fetch
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'd0fd3366f2msh29853210c764e81p1e3a72jsna93a667889f4',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
};


// removing stuff in the DOM first and second row
function removeSplash() {
    while (row1Vanilla.firstChild) {
        row1Vanilla.removeChild(row1Vanilla.firstChild)
    }
    while (row2Vanilla.firstChild) {
        row2Vanilla.removeChild(row2Vanilla.firstChild)
    }
}

// fetching IMDB API
function initFetches() {
    fetch("https://imdb-api.com/en/API/MostPopularMovies/k_4qxspps7")
        .then(function (response) {
            return response.json();
        })
        // use this format to load data in from the food api through a function
        .then(data => loadMovies(data))
}


// fetching the food API
function foodFetch() {
    row2Vanilla.removeEventListener('click', decisionMadeMovie)
    counter = 0
    navigator.geolocation.getCurrentPosition((success) => {


        let { latitude, longitude } = success.coords;
        fetch('https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=' + latitude + '&longitude=' + longitude + '&limit=20&currency=USD&distance=10&open_now=false&lunit=mi&lang=en_US', options)
            .then(function (response) {
                return response.json();
            })
            .then(data => loadRestaurants(data))
        // .then(displayRestaurantPictures)

    })
}

// loads up the movies into a global array
function loadMovies(data) {
    console.log(data)
    movieInfo = []
    for (let i = 0; i < 9; i++) {
        var thisMovie = {
            position: i,
            image: data.items[i].image,
            title: data.items[i].fullTitle,
            isChosen: false,
        }
        movieInfo.push(thisMovie)
    }
    $("#btnProfile1").css("display", "inline")
}

// loads restaurants from the food API fetch
function loadRestaurants(data) {
    var finalPickedFood = JSON.parse(localStorage.getItem('picked-food'))
    var finalPickedMovie = JSON.parse(localStorage.getItem('picked-movie'))
    console.log(data)
    restaurantInfo = []
    // searches for the category. we had to do this because the API doesn't support search queries beyond latitude and longitude for local options.
    for (i = 0; i < data.data.length; i++) {
        if (data.data[i].cuisine) {
            for (z = 0; z < data.data[i].cuisine.length; z++) {
                if (data.data[i].cuisine[z]) {
                    if (data.data[i].cuisine[z].name === finalPickedFood.category) {
                        console.log(finalPickedFood.category)
                        console.log(data.data[i].name)
                        row2Vanilla.innerHTML = "<h2>Your nearby " + finalPickedFood.category + " restaurant: " + data.data[i].name + "</h2><h2>Your movie: " + finalPickedMovie.title + "</h2>"
                        return
                    } else {
                        row2Vanilla.innerHTML = "<h2>No nearby " + finalPickedFood.category + " restaurants available!</h2><h2> But you can still watch " + finalPickedMovie.title + "</h2>"
                    }
                } else {
                    row2Vanilla.innerHTML = "<h2>No nearby " + finalPickedFood.category + " restaurants available!</h2><h2> But you can still watch " + finalPickedMovie.title + "</h2>"
                }
            }
        }
    }
}

// displays the current movie. Should fine for the first one but we need to change the variable for which numbered thing in the array we want
function displayMoviePosters() {
    while (row1Vanilla.firstChild) {
        row1Vanilla.removeChild(row1Vanilla.firstChild)
    }
    var movieDisplay = document.createElement("img")
    movieDisplay.setAttribute('src', movieInfo[counter].image)
    movieDisplay.classList.add('posters')
    movieDisplay.setAttribute('alt', movieInfo[counter].title)
    row1Vanilla.appendChild(movieDisplay)
    var movieTitle = document.createElement("h2")
    movieTitle.textContent = movieInfo[counter].title
    row1Vanilla.appendChild(movieTitle)
    row2Vanilla.innerHTML = '<button data-decision="dislike" class="waves-effect waves-light orange darken-2 btn" ><i data-decision="dislike"class="material-icons right">thumb_down</i>Dislike</button><button data-decision="like" class="waves-effect waves-light orange darken-2 btn"><i data-decision="like" class="material-icons right">thumb_up</i>Like</button>'
}

// we did this 4 times... couldn't think of a way otherwise 1/4
function decisionMadeFood(event) {
    if (event.target.getAttribute('data-decision') === "like") {
        counter++
    }
    if (event.target.getAttribute('data-decision') === "dislike") {
        cuisine.splice(counter, 1)
    }
    console.log(event.target.getAttribute('data-decision'))
    if (counter < cuisine.length) {
        displayRestaurantPictures()
    } else {
        counter = 0
        initProfile2();
    }
}

function displayRestaurantPictures() {
    while (row1Vanilla.firstChild) {
        row1Vanilla.removeChild(row1Vanilla.firstChild)
    }
    var restaurantDisplay = document.createElement("img")
    restaurantDisplay.setAttribute('src', cuisine[counter].image)
    restaurantDisplay.classList.add('posters')
    restaurantDisplay.setAttribute('alt', cuisine[counter].category)
    row1Vanilla.appendChild(restaurantDisplay)
    var restaurantTitle = document.createElement("h2")
    restaurantTitle.textContent = cuisine[counter].category
    row1Vanilla.appendChild(restaurantTitle)
    row2Vanilla.innerHTML = '<button data-decision="dislike" class="waves-effect waves-light orange darken-2 btn" ><i data-decision="dislike"class="material-icons right">thumb_down</i>Dislike</button><button data-decision="like" class="waves-effect waves-light orange darken-2 btn"><i data-decision="like" class="material-icons right">thumb_up</i>Like</button>'
    // counter++
}


// the initial call for profile 1
function goProfile1() {
    // clearInterval(slideshow)
    removeSplash();
    displayMoviePosters()
}

// click event listener
btnProfile1.on('click', goProfile1)

// see line 154 2/4
function decisionMadeMovie(event) {
    if (event.target.getAttribute('data-decision') === "like") {
        counter++
    }
    if (event.target.getAttribute('data-decision') === "dislike") {
        movieInfo.splice(counter, 1)
    }
    console.log(event.target.getAttribute('data-decision'))
    if (counter < movieInfo.length) {
        displayMoviePosters()
    } else {
        counter = 0
        row2Vanilla.removeEventListener('click', decisionMadeMovie)
        row2Vanilla.addEventListener('click', decisionMadeFood)
        displayRestaurantPictures();
    }
}

row2Vanilla.addEventListener('click', decisionMadeMovie)

// once everything is done, we take away the buttons and put in the pictures for the movie and food category
function finalDecision() {
    row2Vanilla.removeEventListener('click', decisionMadeFood2)
    while (row2Vanilla.firstChild) {
        row2Vanilla.removeChild(row2Vanilla.firstChild)
    }
    while (row1Vanilla.firstChild) {
        row1Vanilla.removeChild(row1Vanilla.firstChild)
    }
    console.log("display the two decisions here")
    var finalPickedFood = JSON.parse(localStorage.getItem('picked-food'))
    var finalPickedMovie = JSON.parse(localStorage.getItem('picked-movie'))
    // also, fetch the food API
    foodFetch();
    var finalMoviePoster = document.createElement('img')
    finalMoviePoster.setAttribute('src', finalPickedMovie.image)
    finalMoviePoster.classList.add('posters')
    var finalFoodPoster = document.createElement('img')
    finalFoodPoster.setAttribute('src', finalPickedFood.image)
    finalFoodPoster.classList.add('posters')
    row1Vanilla.appendChild(finalFoodPoster)
    row1Vanilla.appendChild(finalMoviePoster)
}
// see line 154 3/4
function decisionMadeFood2(event) {
    console.log("youre on the food part now")
    if (event.target.getAttribute('data-decision') === "like") {
        console.log("you picked a food you both like")
        const pickedFood = cuisine[counter]
        localStorage.setItem('picked-food', JSON.stringify(pickedFood))
        finalDecision()
    }
    if (event.target.getAttribute('data-decision') === "dislike") {
        cuisine.splice(counter, 1)
        displayRestaurantPictures();
    }
}

// resets the global counter
function movieDecided() {
    console.log("You picked a movie you both liked")
    counter = 0
    displayRestaurantPictures()
    row2Vanilla.removeEventListener('click', decisionMadeMovie2)
    row2Vanilla.addEventListener('click', decisionMadeFood2)

}

// see line 154 4/4
function decisionMadeMovie2(event) {
    if (event.target.getAttribute('data-decision') === "like") {
        console.log("You picked a movie you both liked")
        const pickedMovie = movieInfo[counter]
        localStorage.setItem('picked-movie', JSON.stringify(pickedMovie))
        counter = 0
        displayRestaurantPictures()
        row2Vanilla.removeEventListener('click', decisionMadeMovie2)
        row2Vanilla.addEventListener('click', decisionMadeFood2)
    }
    if (event.target.getAttribute('data-decision') === "dislike") {
        movieInfo.splice(counter, 1)
        displayMoviePosters()
    }
    if (counter >= movieInfo.length) {
        counter = 0
        console.log("you lose :(")
    }
}

function initProfile2() {
    console.log("profile 2")
    row2Vanilla.removeEventListener('click', decisionMadeFood)
    row2Vanilla.addEventListener('click', decisionMadeMovie2)
    displayMoviePosters()
}

// initiates the fetches.
initFetches()

// it's possible to click the button before the IMDB API fetches, so we hide it for a moment. It also draws the eye to the button popping in as a nice side effect.

var instance = M.Carousel.init({
    fullWidth: true,
    indicators: true
});

$(document).ready(function () {

    $('.carousel.carousel-slider').carousel();

    setInterval(function () {

        $('.carousel.carousel-slider').carousel('next');

    }, 3500);



});
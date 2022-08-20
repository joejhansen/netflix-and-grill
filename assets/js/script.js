// declaring variables
var row1Vanilla = $("#row1")
var row2 = $("#row2")
var btnProfile1 = $("#btnProfile1")
var btnProfile2 = $("btnProfile2")
var row1Vanilla = document.getElementById("row1")
var row2Vanilla = document.getElementById("row2")
var counter = 0
var movieInfo
var foodInfo = []
var cuisine = [
    {
        category: "American",
        image: "https://placehold.jp/343x508.png",
        isChosen: false,
    },
    {
        category: "Italian",
        image: "https://placehold.jp/343x508.png",
        isChosen: false,
    },
    {
        category: "Sushi",
        image: "https://placehold.jp/343x508.png",
        isChosen: false,
    },
    {
        category: "Chinese",
        image: "https://placehold.jp/343x508.png",
        isChosen: false,
    },
    {
        category: "Mexican",
        image: "https://placehold.jp/343x508.png",
        isChosen: false,
    }]

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

// fetching APIS [DO MOVIES THEN FOOD]
function initFetches() {
    fetch("https://imdb-api.com/en/API/MostPopularMovies/k_8wpck7yy")
        .then(function (response) {
            return response.json();
        })
        // use this format to load data in from the food api through a function
        .then(data => loadMovies(data))
        // has to be done strictly after the data has loaded or else we get an error
        .then(displayMoviePosters)
}
function foodFetch() {
    // make logic that turns off the event listener for the first decisionMade
    row2Vanilla.removeEventListener('click', decisionMadeMovie)
    counter = 0
    navigator.geolocation.getCurrentPosition((success) => {


        let { latitude, longitude } = success.coords;
        fetch('https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=' + latitude + '&longitude=' + longitude + '&limit=9&currency=USD&distance=7&open_now=false&lunit=km&lang=en_US', options)
            .then(function (response) {
                return response.json();
            })
            .then(data => loadRestaurants(data))
            .then(displayRestaurantPictures)

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
}
function loadRestaurants(data) {
    console.log(data)
    restaurantInfo = []
    for (let i = 0; i < 9; i++) {
        if (data.data[i].photo === undefined) {
            var displayRestaurant = {
                position: i,
                photo: "https://placehold.jp/343x508.png",
                name: data.data[i].name,
                ifChosen: false,
            }
        } else {
            var displayRestaurant = {
                position: i,
                photo: data.data[i].photo.images.medium.url,
                name: data.data[i].name,
                ifChosen: false,
            }
        }
        restaurantInfo.push(displayRestaurant)

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
    row2Vanilla.innerHTML = '<button data-decision="dislike" class="waves-effect waves-light btn" ><i data-decision="dislike"class="material-icons right">thumb_down</i>Dislike</button><button data-decision="like" class="waves-effect waves-light btn"><i data-decision="like" class="material-icons right">thumb_up</i>Like</button>'
}

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
    } else{
        counter=0
        initProfile2();
    }
}

function displayRestaurantPictures() {
    row2Vanilla.removeEventListener('click', decisionMadeMovie)
    row2Vanilla.addEventListener('click', decisionMadeFood)
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
    row2Vanilla.innerHTML = '<button data-decision="dislike" class="waves-effect waves-light btn" ><i data-decision="dislike"class="material-icons right">thumb_down</i>Dislike</button><button data-decision="like" class="waves-effect waves-light btn"><i data-decision="like" class="material-icons right">thumb_up</i>Like</button>'
    // counter++
}


// the initial call for profile 1
function goProfile1() {
    removeSplash();
    initFetches()
}

// click event listener
btnProfile1.on('click', goProfile1)

// functionality for the like and dislike buttons
function decisionMadeMovie(event){ 
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
        counter=0
        displayRestaurantPictures();
    }
}

row2Vanilla.addEventListener('click', decisionMadeMovie)

function decisionMadeFood2(){
    console.log("youre on the food part now")
}

function movieDecided(){
    console.log("You picked a movie you both liked")
    const pickedMovie = movieInfo[counter]
    row2Vanilla.removeEventListener('click',decisionMadeMovie2)
    row2Vanilla.addEventListener('click', decisionMadeFood2)
    displayRestaurantPictures()
}

function decisionMadeMovie2(event){
    if (event.target.getAttribute('data-decision') === "like") {
        movieDecided();
    }
    if (event.target.getAttribute('data-decision') === "dislike") {
        movieInfo.splice(counter, 1)
    }
    if (counter <movieInfo.length){
    displayMoviePosters()
    } else{
        counter =0
        console.log("you lose :(")
    }
}

function initProfile2(){
    console.log("profile 2")
    row2Vanilla.removeEventListener('click',decisionMadeFood)
    row2Vanilla.addEventListener('click',decisionMadeMovie2)
    displayMoviePosters()
}

// make two onclick functions in the javascript, one for decisionMadeMovie and one for decisionMadeFood, based off of the linear nature of the logic
// initFetches -> movie fetches -> movie into array -> display the first image -> onclick seperate functionality of decisionMadeMovie to display the next image until the array is done
// once the array is done -> move onto foodFetch -> food info into array -> onclick functionality of seperate decisionMadeFood

// splice the array so that we can just use the modified ones for profile 2
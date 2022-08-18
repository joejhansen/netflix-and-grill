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
function foodfetch(){
    navigator.geolocation.getCurrentPosition((success) =>{ 

        let {latitude,longitude} = success.coords;
        fetch('https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?'+latitude+'&'+longitude+'&limit=9&currency=USD&distance=7&open_now=false&lunit=km&lang=en_US', options)
        .then(function (response) {
            return response.json();
        })
        .then(data => loadRestaurants(data))

       
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
function loadRestaurants(data){
    console.log(data)
    restaurantInfo = []
    for (let i = 0; i < 9; i++) {
        var displayRestaurant = {
            position: i,
            photo: data.items[i].photo.images.medium,
            name: data.items[i].name,
            ifChosen: false,
        }
        restaurantInfo.push(displayRestaurant)
    
    }
}

// displays the current movie. Should fine for the first one but we need to change the variable for which numbered thing in the array we want
function displayMoviePosters() {
    console.log(movieInfo)
    var movieDisplay = document.createElement("img")
    movieDisplay.setAttribute('src', movieInfo[0].image)
    movieDisplay.classList.add('posters')
    movieDisplay.setAttribute('alt', movieInfo[0].fullTitle)
    row1Vanilla.appendChild(movieDisplay)
    // console.log(data.items[0].image)
    row2Vanilla.innerHTML = '<button data-decision="dislike" onClick="displayMoviePosters()" class="waves-effect waves-light btn" ><i data-decision="dislike"class="material-icons right">thumb_down</i>Dislike</button><button data-decision="like" onClick="displayMoviePosters()" class="waves-effect waves-light btn"><i data-decision="like" class="material-icons right">thumb_up</i>Like</button>'
}



// the initial call for profile 1
function goProfile1() {
    removeSplash();
    initFetches()
}

// click event listener
btnProfile1.on('click', goProfile1)

// functionality for the like and dislike buttons
function decisionMadeMovie(event) {
    console.log(event.target)
    if (event.target.getAttribute('data-decision') === "like") {
        counter++
        console.log(counter)
    }
    if (event.target.getAttribute('data-decision') === "dislike") {
        counter--
        console.log(counter)
    }
    console.log(event.target.getAttribute('data-decision'))
}

row2.on('click', decisionMadeMovie)



var row1Vanilla = $("#row1")
var row2 = $("#row2")
var btnProfile1 = $("#btnProfile1")
var btnProfile2 = $("btnProfile2")
var row1Vanilla = document.getElementById("row1")
var row2Vanilla = document.getElementById("row2")
var counter = 0
var movieInfo = []
var foodInfo = []

function goProfile1() {
    console.log(row1Vanilla.firstChild)
    while (row1Vanilla.firstChild) {
        row1Vanilla.removeChild(row1Vanilla.firstChild)
    }
    while (row2Vanilla.firstChild) {
        row2Vanilla.removeChild(row2Vanilla.firstChild)
    }
    fetch("https://imdb-api.com/en/API/MostPopularMovies/k_8wpck7yy")
        .then(function (response) {
            return response.json();
        })
        .then(data => changeImageMovie(data))
}
btnProfile1.on('click', goProfile1)

function changeImageMovie(data) {
    // console.log(data)
    for (let i=0; i < 9; i++) {
        var thisMovie = {
            position: i,
            image: data.items[i].image,
            title: data.items[i].fullTitle,
            isChosen: false,
        }
        movieInfo.push(thisMovie)
    }
    console.log(movieInfo)
    var movieDisplay = document.createElement("img")
    movieDisplay.setAttribute('src', movieInfo[0].image)
    movieDisplay.classList.add('posters')
    movieDisplay.setAttribute('alt', movieInfo[0].fullTitle)
    row1Vanilla.appendChild(movieDisplay)
    // console.log(data.items[0].image)
    row2Vanilla.innerHTML = '<a data-decision="dislike" class="waves-effect waves-light btn"><i data-decision="dislike" class="material-icons right">thumb_down</i>Dislike</a><a data-decision="like" class="waves-effect waves-light btn"><i data-decision="like" class="material-icons right">thumb_up</i>Like</a>'
}

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

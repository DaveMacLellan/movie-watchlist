const searchText = document.getElementById("search-text")
const results = document.getElementById("results")

let watchBtns = ""
let watchlist = []
let currentWatchlist = JSON.parse(localStorage.getItem("allMovies"));

document.getElementById("findMovie").addEventListener("click", getMovieList)

function getMovieList() {    
    results.innerHTML = ``
    fetch(`https://www.omdbapi.com/?apikey=7bb14cc&s=${searchText.value}`)
    .then(res => res.json())
    .then(data => {
        if(data.Response === "True"){
            for(let movie of data.Search){
                fetch(`https://www.omdbapi.com/?apikey=7bb14cc&i=${movie.imdbID}`)
                .then(res => res.json())
                .then(data => {
                    const {imdbID, Poster} = data
                    if(currentWatchlist === null){
                        if(Poster !== "N/A"){
                            results.innerHTML += addHtml(data)
                            console.log(Poster)
                        }                        
                    }
                    else {
                        if(!currentWatchlist.includes(imdbID)){
                            if(Poster !== "N/A"){
                                results.innerHTML += addHtml(data)
                                console.log("no id")
                            }
                        }                     
                    }                    
                    
                    watchBtns = document.querySelectorAll(".addMovie")
                    watchBtns.forEach(button => {
                        button.addEventListener("click", ()=> {
                            fetch(`https://www.omdbapi.com/?apikey=7bb14cc&i=${button.id}`)
                                    .then(res => res.json())
                                    .then(data => {
                                        const {imdbID} = data
                                        if(currentWatchlist === null){
                                            currentWatchlist = []
                                            pushData(imdbID, button)
                                        }
                                        else {
                                            if(!currentWatchlist.includes(imdbID)){
                                                pushData(imdbID, button)                                                
                                            }          
                                        }  
                            })
                        })
                    })
                    watchBtns.forEach(button => {
                        button.addEventListener("keypress", (event)=> {
                            if(event.keyCode === 13){
                                fetch(`https://www.omdbapi.com/?apikey=7bb14cc&i=${button.id}`)
                                    .then(res => res.json())
                                    .then(data => {
                                        const {imdbID} = data
                                        if(currentWatchlist === null){
                                            currentWatchlist = []
                                            pushData(imdbID, button)
                                        }
                                        else {
                                            if(!currentWatchlist.includes(imdbID)){
                                                pushData(imdbID, button)                                                
                                            }          
                                        }  
                            })
                            }
                        })
                    })

                })
            }      
        }
        else {
            results.innerHTML += `
                <div class="default-page">
                        <p>No Match</p>
                </div>  
            `
        }
    })    
}

function addHtml(movie) {
    return `
        <div class="movie">
            <div class="movie-poster">
                <img class="poster" src="${movie.Poster}">
            </div>
            <div class="movie-main">
                <h3 class="movie-title">${movie.Title}</h3>
                <div class="movie-info">
                    <p class="runtime-text">${movie.Runtime}</p>
                    <p class="genre-text">${movie.Genre}</p>
                    <button class="addMovie" id="${movie.imdbID}">+</button>
                </div>
                <div class="movie-plot">
                    <p class="plot-text">${movie.Plot}</p>
                </div>
            </div>
        </div> 
    `
}

function pushData(id, btn){
    currentWatchlist.push(id);
    localStorage.setItem("allMovies", JSON.stringify(currentWatchlist));
    btn.style.display = "none"
}
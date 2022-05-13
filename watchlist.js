const results = document.getElementById("results")
let currentWatchlist = JSON.parse(localStorage.getItem("allMovies"));

function loopLocal(){ 
    results.innerHTML = ``  
    if(typeof currentWatchlist !== 'undefined' && currentWatchlist !== null && currentWatchlist.length > 0){
        for (var i = 0; i < currentWatchlist.length; i++) {
            fetch(`https://www.omdbapi.com/?apikey=7bb14cc&i=${currentWatchlist[i]}`)
            .then(res => res.json())
            .then(data => {
                results.innerHTML += addHtml(data)                
                watchBtns = document.querySelectorAll(".removeMovie")
                watchBtns.forEach(button => {
                    button.addEventListener("click", ()=> {
                        let id = button.id
                        for (var i = 0; i < currentWatchlist.length; i++){
                            if(id === currentWatchlist[i]){
                                removeData(id, i)                               
                            }
                        }
                        
                    })
                })
            })
        }
    }
    else {
        results.innerHTML += `
                <div class="default-page">
                        <p>Add Movies</p>
                </div>  
        `
    }
}
loopLocal()

function addHtml(movie) {
    return  `
                <div class="movie" id="${movie.imdbID}">
                    <div class="movie-poster">
                        <img class="poster" src="${movie.Poster}">
                    </div>
                    <div class="movie-main">
                        <h3 class="movie-title">${movie.Title}</h3>
                        <div class="movie-info">
                            <p class="runtime-text">${movie.Runtime}</p>
                            <p class="genre-text">${movie.Genre}</p>
                            <button class="removeMovie" id="${movie.imdbID}">Remove from Watchlist</button>
                        </div>
                        <div class="movie-plot">
                            <p class="plot-text">${movie.Plot}</p>
                        </div>
                    </div>
                </div> 
            `
}

function removeData(id, index){
    currentWatchlist.splice(index, 1)
    localStorage.setItem("allMovies", JSON.stringify(currentWatchlist));
    const div = document.getElementById(id)
    div.style.border = "none"                                
    div.style.padding = "0"                               
    div.innerHTML = ""     
}


const searchText = document.getElementById("search-text")
const results = document.getElementById("results")

document.getElementById("findMovie").addEventListener("click", getMovieList)

function getMovieList() {
    results.innerHTML = ``
    fetch(`https://www.omdbapi.com/?apikey=7bb14cc&s=${searchText.value}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        for(let i = 0; i < data.Search.length; i++){
            fetch(`https://www.omdbapi.com/?apikey=7bb14cc&i=${data.Search[i].imdbID}`)
            .then(res => res.json())
            .then(data => {
                //console.log(data)
                results.innerHTML += `
                    <div class="movie">
                        <div class="movie-poster">
                            <img class="poster" src="${data.Poster}">
                        </div>
                        <div class="movie-main">
                            <h3 class="movie-title">${data.Title}</h3>
                            <div class="movie-info">
                                <p>${data.Runtime}</p>
                                <p>${data.Genre}</p>
                                <button>Watchlist</button>
                            </div>
                            <div class="movie-plot">
                                <p>${data.Plot}</p>
                            </div>
                        </div>
                    </div> 
                `
            })
        }        
    })
}
const results = document.getElementById("results")

function loopLocal(){
    let currentWatchlist = JSON.parse(localStorage.getItem("allMovies"));
    results.innerHTML = ``
    if(typeof currentWatchlist !== 'undefined' && currentWatchlist !== null){
        for (var i = 0; i < currentWatchlist.length; i++) {
            fetch(`https://www.omdbapi.com/?apikey=7bb14cc&i=${currentWatchlist[i]}`)
            .then(res => res.json())
            .then(data => {
                const {Title, Runtime, Plot, Poster, Genre, imdbID} = data
    
                results.innerHTML += `
                <div class="movie">
                    <div class="movie-poster">
                        <img class="poster" src="${Poster}">
                    </div>
                    <div class="movie-main">
                        <h3 class="movie-title">${Title}</h3>
                        <div class="movie-info">
                            <p>${Runtime}</p>
                            <p>${Genre}</p>
                            <button class="removeMovie" id="${imdbID}">Remove</button>
                        </div>
                        <div class="movie-plot">
                            <p>${Plot}</p>
                        </div>
                    </div>
                </div> 
            `
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
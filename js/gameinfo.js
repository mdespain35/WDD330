const baseURL = "https://free-to-play-games-database.p.rapidapi.com/api/games";
const container = document.querySelector('#game-info');
const page = document.querySelector('#page-type');
const abcBtn = document.querySelector('#alphabetical');
const popularBtn = document.querySelector('#popularity');
const recentBtn = document.querySelector('#release-date');

if (page.value === 'home') {
    getGameInfo(baseURL);
    
} else {
    let url = baseURL + '?category=' + page.value;
    getGameInfo(url);
}


abcBtn.addEventListener("click", () => {
    reorganizeGames(abcBtn);
});

popularBtn.addEventListener("click", () => {
    reorganizeGames(popularBtn);
});

recentBtn.addEventListener("click", () => {
    reorganizeGames(recentBtn);
});

function getGameInfo(url) {
    fetch(url, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
		"x-rapidapi-key": "a9550da423msh820fb8198aa287bp1abe4djsn86fbf71fd2a6"
	}
})
.then(response => response.json()).then(jsObject => {
	renderGameInfo(jsObject);
})
.catch(err => {
	console.error(err);
});
}

function renderGameInfo(games) {
    html = '';
    games.forEach(game => {
        let gameCard = `<div class="game-card"><img src=${game.thumbnail} alt="Image for ${game.title}"><h3>${game.title}</h3>`;
        gameCard += `<p>${game.short_description}</p><p class="genre">${game.genre}</p><a href="${game.game_url}">Learn More</a>`;
        gameCard += `<input type=hidden value=${game.id}></div>`;
        html += gameCard;
    });
    container.innerHTML = html;
}

function reorganizeGames(btn) {
    let url = baseURL;
    if (page.value === 'home') {
        url += `?sort-by=${btn.value}`;
    } else {
        url += `?category=${page.value}&sort-by=${btn.value}`;
    }
    getGameInfo(url);
}

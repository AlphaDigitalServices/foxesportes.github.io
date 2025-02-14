async function fetchPlayers() {
    const apiUrl = "https://api.brawlstars.com/v1/clubs/%232V2JQR82Y/members";
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjljNDg3OGJkLTBiZTYtNDk5NC05ZDlkLTc0NjdlZjQyOTIzZSIsImlhdCI6MTczOTUzODc1OSwic3ViIjoiZGV2ZWxvcGVyLzM1YjYwZjAwLTgxNzItZTZmMi0wNDgwLTNkMmU3NWIyMjA4ZiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMzQuMjM0LjEwNi44MCIsIjEwMC4yOC4yMDEuMTU1IiwiMTcwLjIzMy4yMjkuNTUiLCIyMDEuNDguNDkuOTkiXSwidHlwZSI6ImNsaWVudCJ9XX0.4emqXgVEmyVVesYU4xVvE6KYsf15oebY1unsRz99358XHWJGvG8NiP16CHp1icDqYjr3ehPC3wEcd7j7oaJ2vg";

    try {
        const response = await fetch(apiUrl, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar dados: " + response.statusText);
        }

        const data = await response.json();
        renderPlayers(data.items);
    } catch (error) {
        document.getElementById("player-list").innerHTML = `<p>Erro ao carregar jogadores.</p>`;
        console.error(error);
    }
}

function renderPlayers(players) {
    const playerList = document.getElementById("player-list");
    playerList.innerHTML = ""; // Limpa o conteúdo antes de renderizar

    players.forEach(player => {
        const playerCard = document.createElement("div");
        playerCard.classList.add("player-card");

        playerCard.innerHTML = `
            <p class="player-name" style="color: ${player.nameColor ? player.nameColor.replace("0xff", "#") : "#fff"}">
                ${player.name}
            </p>
            <p class="player-role">Função: ${player.role || "Membro"}</p>
            <p class="player-trophies">Troféus: ${player.trophies}</p>
        `;

        playerList.appendChild(playerCard);
    });
}

fetchPlayers();

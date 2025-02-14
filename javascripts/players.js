async function fetchPlayers() {
    const apiUrl = "https://api.brawlstars.com/v1/clubs/%232V2JQR82Y/members";
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjI4YzgzZWRiLTg5YzctNGYxMy1iODQzLWIyNDcyODk0ZGI5ZiIsImlhdCI6MTczOTQ5NTM5OCwic3ViIjoiZGV2ZWxvcGVyLzM1YjYwZjAwLTgxNzItZTZmMi0wNDgwLTNkMmU3NWIyMjA4ZiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTAwLjI4LjIwMS4xNTUiXSwidHlwZSI6ImNsaWVudCJ9XX0.I37c3WOBx1RMI0XDOr7eTJ0fpNf_DaB-SXdAvwbyp69SePZq36rGr_Qimcyo-9jZDB3jUBK7x_H7B9QKltnL0Q";

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

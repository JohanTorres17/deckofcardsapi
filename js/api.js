// api.js

async function fetchDeck() {
    console.log("Cargando deck desde la API...");
    return fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(response => response.json())
        .then(data => {
            console.log("Deck cargado:", data.deck_id);
            return data.deck_id;
        })
        .catch(error => {
            console.error("Error al cargar el deck:", error);
        });
}

// Función para obtener una carta del deck
async function drawCard(deckId) {
    console.log(`Obteniendo carta del deck ID: ${deckId}`);
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    const data = await response.json();
    return data.cards[0];
}
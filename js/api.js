let deckId = null;

export async function fetchDeck() {
    try {
        const res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        const data = await res.json();
        return data.deck_id;
    } catch (error) {
        console.error('Error en fetchDeck:', error);
        alert('No se pudo conectar con la API. Inténtalo más tarde.');
    }
    }

    export async function drawCard(deckId) {
    try {
        const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        const data = await res.json();
        return data.cards[0];
    } catch (error) {
        console.error('Error en drawCard:', error);
        return null;
    }
}
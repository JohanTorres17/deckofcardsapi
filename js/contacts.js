export async function renderContactInfo() {
    const logoImage = document.getElementById('logo-contacto');
    
        // Simula una llamada a tu API para obtener una carta aleatoria
        try {
        const res = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
        const data = await res.json();
        const card = data.cards[0];
    
        if (card) {
            console.log(`Carta obtenida: ${card.image}`);
            // Aquí puedes usar la carta aleatoria para otro propósito, pero no sobrescribes el logo
        } else {
            console.error('No se pudo obtener la carta de la API.');
        }
        } catch (error) {
        console.error('Error al cargar la carta:', error);
        }
    }
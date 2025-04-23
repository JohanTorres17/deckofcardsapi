import { challengesData } from './challenges.js'; // Importa challengesData

export function loadFavorites() {
    renderFavorites();
    }

    export function renderFavorites() {
    const favs = JSON.parse(localStorage.getItem('favs') || '[]');
    const container = document.getElementById('favorites');
    container.innerHTML = '';

    favs.forEach(code => {
        const entry = challengesData.find(c => c.code === code);
        if (entry) {
        const item = document.createElement('div');
        item.className = 'challenge-item';
        item.innerHTML = `
            <img src="${entry.card.image}" width="50">
            <span>${entry.text}</span>
            <button data-code="${code}">-</button>
        `;
        container.appendChild(item);
        }
    });

    container.querySelectorAll('button').forEach(btn => btn.onclick = toggleFavorite);
    }

    function toggleFavorite(e) {
    const code = e.target.dataset.code;
    let favs = JSON.parse(localStorage.getItem('favs') || '[]');

    if (favs.includes(code)) {
        favs = favs.filter(fav => fav !== code);
    } else {
        favs.push(code);
    }

    localStorage.setItem('favs', JSON.stringify(favs));
    renderFavorites(); // Actualiza los favoritos después de cambiarlos
}
// favoritos.js

// Función para cargar los favoritos al iniciar la aplicación
function loadFavorites() {
    renderFavorites();
}

// Función para renderizar los favoritos
function renderFavorites() {
    const favs = JSON.parse(localStorage.getItem('favs') || '[]');
    const container = document.getElementById('favorites');
    container.innerHTML = '';

    // Usa la variable global challengesData definida en challenges.js
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

    // Asigna eventos a los botones de eliminar favoritos
    container.querySelectorAll('button').forEach(btn => btn.onclick = toggleFavorite);
}

// Función para alternar un reto entre favoritos y no favoritos
function toggleFavorite(e) {
    const code = e.target.dataset.code;
    let favs = JSON.parse(localStorage.getItem('favs') || '[]');

    if (favs.includes(code)) {
        favs = favs.filter(fav => fav !== code); // Elimina el código si ya está en favoritos
    } else {
        favs.push(code); // Agrega el código si no está en favoritos
    }

    localStorage.setItem('favs', JSON.stringify(favs));
    renderFavorites(); // Actualiza la lista de favoritos después de cambiarlos
}
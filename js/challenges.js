import { drawCard } from './api.js';

export let challengesData = []; // Exporta challengesData para ser usada en otros módulos

const challengesMap = {
    'AS': { text: 'Haz algo amable por un extraño hoy.', category: 'mentales' },
    '2S': { text: 'Escribe un agradecimiento a alguien importante en tu vida.', category: 'mentales' },
    '3S': { text: 'Realiza 15 minutos de meditación.', category: 'mentales' },
    '4S': { text: 'Lee un artículo o capítulo de un libro.', category: 'mentales' },
    '5S': { text: 'Camina 10 minutos al aire libre.', category: 'fisicos' },
    '6S': { text: 'Bebe 2 litros de agua hoy.', category: 'fisicos' },
    '7S': { text: 'Prueba una receta nueva para cocinar.', category: 'fisicos' },
    '8S': { text: 'Haz 20 minutos de ejercicio.', category: 'fisicos' },
    '9S': { text: 'Aprende una palabra nueva en otro idioma.', category: 'mentales' },
    '0S': { text: 'Dedica 10 minutos a dibujar o colorear.', category: 'mentales' },
    'JS': { text: 'Escribe un pequeño diario de tus pensamientos.', category: 'mentales' },
    'QS': { text: 'Organiza tu espacio de trabajo.', category: 'fisicos' },
    'KS': { text: 'Llama a un amigo o familiar y saluda.', category: 'mentales' },
    'AH': { text: 'Escribe una carta de amor o gratitud.', category: 'mentales' },
    '2H': { text: 'Haz una lista de 5 cosas que amas de ti mismo.', category: 'mentales' },
    '3H': { text: 'Escucha tu canción favorita y baila.', category: 'fisicos' },
    '4H': { text: 'Dedica tiempo a un hobby que te apasione.', category: 'mentales' },
    '5H': { text: 'Ayuda a alguien sin esperar nada a cambio.', category: 'mentales' },
    '6H': { text: 'Prepara tu bebida favorita y relájate.', category: 'fisicos' },
    '7H': { text: 'Escribe tus metas para la semana.', category: 'mentales' },
    '8H': { text: 'Haz un pequeño acto de auto-cuidado.', category: 'fisicos' },
    '9H': { text: 'Comparte una foto feliz en redes sociales.', category: 'mentales' },
    '0H': { text: 'Haz una pausa de 5 minutos y respira profundo.', category: 'mentales' },
    'JH': { text: 'Escribe un poema o verso breve.', category: 'mentales' },
    'QH': { text: 'Haz un cumplido sincero a alguien.', category: 'mentales' },
    'KH': { text: 'Planea una actividad divertida para el fin de semana.', category: 'mentales' },
    'AD': { text: 'Planta una semilla o cuida una planta.', category: 'fisicos' },
    '2D': { text: 'Recoge basura en tu entorno cercano.', category: 'fisicos' },
    '3D': { text: 'Investiga algo nuevo online durante 10 min.', category: 'mentales' },
    '4D': { text: 'Ordena un cajón o armario pequeño.', category: 'fisicos' },
    '5D': { text: 'Desconéctate de las pantallas 30 min.', category: 'mentales' },
    '6D': { text: 'Haz una lista de compras saludable.', category: 'fisicos' },
    '7D': { text: 'Revisa tu correo y responde lo importante.', category: 'mentales' },
    '8D': { text: 'Escribe tu presupuesto para hoy.', category: 'mentales' },
    '9D': { text: 'Planifica tu menú para la semana.', category: 'fisicos' },
    '0D': { text: 'Escucha un podcast educativo.', category: 'mentales' },
    'JD': { text: 'Actualiza tu lista de tareas.', category: 'mentales' },
    'QD': { text: 'Haz un backup de tus archivos importantes.', category: 'mentales' },
    'KD': { text: 'Aprende un atajo de teclado nuevo.', category: 'mentales' },
    'AC': { text: 'Planta una semilla o cuida una planta.', category: 'fisicos' },
    '2C': { text: 'Recoge basura en tu entorno cercano.', category: 'fisicos' },
    '3C': { text: 'Investiga un tema ambiental.', category: 'mentales' },
    '4C': { text: 'Usa transporte sostenible hoy.', category: 'fisicos' },
    '5C': { text: 'Reduce tu consumo de plástico.', category: 'fisicos' },
    '6C': { text: 'Camina o usa bicicleta 15 min.', category: 'fisicos' },
    '7C': { text: 'Recicla correctamente algo en casa.', category: 'fisicos' },
    '8C': { text: 'Ahorra energía apagando luces innecesarias.', category: 'fisicos' },
    '9C': { text: 'Comparte un dato ecológico con alguien.', category: 'mentales' },
    '0C': { text: 'Lee sobre cambio climático 10 min.', category: 'mentales' },
    'JC': { text: 'Haz compost o revisa tu compost.', category: 'fisicos' },
    'QC': { text: 'Investiga alternativas sostenibles.', category: 'mentales' },
    'KC': { text: 'Planifica una compra ecológica.', category: 'fisicos' }
  };

export async function renderChallenges(deckId) {
  const container = document.getElementById('challenges');
  container.innerHTML = '';

  for (let i = 0; i < 6; i++) {
    const card = await drawCard(deckId);
    if (!card) {
      const errorItem = document.createElement('div');
      errorItem.className = 'challenge-item';
      errorItem.innerHTML = `<span>No se pudo cargar el reto.</span>`;
      container.appendChild(errorItem);
      continue;
    }

    const code = (card.value === '10' ? '0' : card.value.charAt(0)) + card.suit.charAt(0);
    const challenge = challengesMap[code] || { text: '¡Intenta algo nuevo hoy!', category: 'otros' };
    challengesData.push({ code, card, text: challenge.text, category: challenge.category });

    const item = document.createElement('div');
    item.className = 'challenge-item';
    item.setAttribute('data-category', challenge.category); // Asignar la categoría
    item.innerHTML = `
      <img src="${card.image}" width="50">
      <span>${challenge.text}</span>
      <button data-code="${code}">+</button>
    `;
    container.appendChild(item);
  }

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

// Importa renderFavorites desde favoritos.js
import { renderFavorites } from './favoritos.js';

function renderFavoritesWrapper() {
  renderFavorites();
}
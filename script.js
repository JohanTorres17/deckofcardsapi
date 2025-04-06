const challengesMap = {
    'AS': 'Haz algo amable por un extraño hoy.',
    '2S': 'Escribe un agradecimiento a alguien importante en tu vida.',
    '3S': 'Realiza 15 minutos de meditación.',
    '4S': 'Lee un artículo o capítulo de un libro.',
    '5S': 'Camina 10 minutos al aire libre.',
    '6S': 'Bebe 2 litros de agua hoy.',
    '7S': 'Prueba una receta nueva para cocinar.',
    '8S': 'Haz 20 minutos de ejercicio.',
    '9S': 'Aprende una palabra nueva en otro idioma.',
    '0S': 'Dedica 10 minutos a dibujar o colorear.',
    'JS': 'Escribe un pequeño diario de tus pensamientos.',
    'QS': 'Organiza tu espacio de trabajo.',
    'KS': 'Llama a un amigo o familiar y saluda.',
    'AH': 'Escribe una carta de amor o gratitud.',
    '2H': 'Haz una lista de 5 cosas que amas de ti mismo.',
    '3H': 'Escucha tu canción favorita y baila.',
    '4H': 'Dedica tiempo a un hobby que te apasione.',
    '5H': 'Ayuda a alguien sin esperar nada a cambio.',
    '6H': 'Prepara tu bebida favorita y relájate.',
    '7H': 'Escribe tus metas para la semana.',
    '8H': 'Haz un pequeño acto de auto-cuidado.',
    '9H': 'Comparte una foto feliz en redes sociales.',
    '0H': 'Haz una pausa de 5 minutos y respira profundo.',
    'JH': 'Escribe un poema o verso breve.',
    'QH': 'Haz un cumplido sincero a alguien.',
    'KH': 'Planea una actividad divertida para el fin de semana.',
    'AD': 'Haz 10 flexiones o sentadillas.',
    '2D': 'Revisa y organiza tus finanzas rápidas.',
    '3D': 'Investiga algo nuevo online durante 10 min.',
    '4D': 'Ordena un cajón o armario pequeño.',
    '5D': 'Desconéctate de las pantallas 30 min.',
    '6D': 'Haz una lista de compras saludable.',
    '7D': 'Revisa tu correo y responde lo importante.',
    '8D': 'Escribe tu presupuesto para hoy.',
    '9D': 'Planifica tu menú para la semana.',
    '0D': 'Escucha un podcast educativo.',
    'JD': 'Actualiza tu lista de tareas.',
    'QD': 'Haz un backup de tus archivos importantes.',
    'KD': 'Aprende un atajo de teclado nuevo.',
    'AC': 'Planta una semilla o cuida una planta.',
    '2C': 'Recoge basura en tu entorno cercano.',
    '3C': 'Investiga un tema ambiental.',
    '4C': 'Usa transporte sostenible hoy.',
    '5C': 'Reduce tu consumo de plástico.',
    '6C': 'Camina o usa bicicleta 15 min.',
    '7C': 'Recicla correctamente algo en casa.',
    '8C': 'Ahorra energía apagando luces innecesarias.',
    '9C': 'Comparte un dato ecológico con alguien.',
    '0C': 'Lee sobre cambio climático 10 min.',
    'JC': 'Haz compost o revisa tu compost.',
    'QC': 'Investiga alternativas sostenibles.',
    'KC': 'Planifica una compra ecológica.'
  };
  
  const challengesData = [];
  let deckId = null;
  
  async function init() {
    await fetchDeck();
    loadFavorites();
    bindTabs();
    bindSearchFilter();
    renderChallenges();
  }
  
  async function fetchDeck() {
    try {
      const res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      const data = await res.json();
      deckId = data.deck_id;
    } catch (error) {
      console.error('Error en fetchDeck:', error);
      alert('No se pudo conectar con la API. Inténtalo más tarde.');
    }
  }
  
  async function drawCard() {
    try {
      const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
      const data = await res.json();
      return data.cards[0];
    } catch (error) {
      console.error('Error en drawCard:', error);
      return null;
    }
  }
  
  async function renderChallenges() {
    const container = document.getElementById('challenges');
    container.innerHTML = '';
  
    for (let i = 0; i < 6; i++) {
      const card = await drawCard();
      if (!card) {
        const errorItem = document.createElement('div');
        errorItem.className = 'challenge-item';
        errorItem.innerHTML = `<span>No se pudo cargar el reto.</span>`;
        container.appendChild(errorItem);
        continue;
      }
  
      const code = (card.value === '10' ? '0' : card.value.charAt(0)) + card.suit.charAt(0);
      const text = challengesMap[code] || '¡Intenta algo nuevo hoy!';
      challengesData.push({ code, card, text });
  
      const item = document.createElement('div');
      item.className = 'challenge-item';
      item.innerHTML = `
        <img src="${card.image}" width="50">
        <span>${text}</span>
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
    renderFavorites();
  }
  
  function loadFavorites() {
    renderFavorites();
  }
  
  function renderFavorites() {
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
  
  function bindTabs() {
    document.querySelectorAll('[data-tab]').forEach(btn => btn.onclick = () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('[data-tab]').forEach(b => {
        if (b.dataset.tab === tab) b.classList.add('active');
      });
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      document.getElementById(tab).classList.add('active');
    });
  }
  
  function bindSearchFilter() {
    document.getElementById('search').oninput = filterRender;
    document.getElementById('filter').onchange = filterRender;
  }
  
  function filterRender() {
    const text = document.getElementById('search').value.toLowerCase();
    document.querySelectorAll('#challenges .challenge-item').forEach(item => {
      const content = item.querySelector('span').innerText.toLowerCase();
      item.style.display = content.includes(text) ? 'flex' : 'none';
    });
  }
  
  document.getElementById('registerForm').onsubmit = e => {
    e.preventDefault();
    alert('¡Registrado!');
  };
  
  init();
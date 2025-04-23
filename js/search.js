// Función para vincular la búsqueda y el filtro
function bindSearchFilter() {
  document.getElementById('search').oninput = filterRender;
  document.getElementById('filter').onchange = filterRender;
}

// Función para filtrar y renderizar los retos según la búsqueda y el filtro
function filterRender() {
  const text = document.getElementById('search').value.toLowerCase();
  const category = document.getElementById('filter').value;

  document.querySelectorAll('#challenges .challenge-item').forEach(item => {
      const content = item.querySelector('span').innerText.toLowerCase();
      const itemCategory = item.dataset.category; // Obtener la categoría del reto

      const matchesText = !text || content.includes(text);
      const matchesCategory = !category || itemCategory === category;

      item.style.display = matchesText && matchesCategory ? 'flex' : 'none';
  });
}
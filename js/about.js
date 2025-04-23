// Función para renderizar la sección "Acerca de"
function renderAbout() {
    const aboutSection = document.getElementById('acerca');
    aboutSection.innerHTML = `
        <div id="about">
            <h3>Acerca de esta App</h3>
            <p><strong>Reto Diario</strong> es una aplicación para motivarte a realizar pequeños desafíos cada día.</p>
            <ul>
                <li>Retos diarios motivacionales</li>
                <li>Registro de progreso personal</li>
                <li>Favoritos para retomar cuando quieras</li>
            </ul>
            <p>¡Empieza hoy mismo!</p>
        </div>
    `;
}
// Función para renderizar la sección de "Contactos"
function renderContactInfo() {
    const contactSection = document.getElementById('contactos');
    contactSection.innerHTML = `
        <div id="contact-info">
            <h1>Carta API</h1>
            <p>Johan Torres</p>
            <img src="img/logo.jpg" alt="Logo Personalizado" id="logo-contacto">
            <div class="info-box">
                <p>Api con información de 52 cartas</p>
            </div>
            <p><a href="https://github.com/JohanTorres17">github.com/JohanTorres17</a></p>
            <p>v 1.0.1</p>
        </div>
    `;
}
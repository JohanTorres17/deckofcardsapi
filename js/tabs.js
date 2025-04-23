export function bindTabs() {
    document.querySelectorAll('[data-tab]').forEach(tab => {
        tab.addEventListener('click', () => {
            // Remover la clase 'active' de todas las pestañas
            document.querySelectorAll('[data-tab]').forEach(t => t.classList.remove('active'));
            // Agregar la clase 'active' a la pestaña seleccionada
            tab.classList.add('active');
    
            // Ocultar todos los contenidos de las pestañas
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            // Mostrar el contenido correspondiente a la pestaña seleccionada
            const tabContentId = tab.dataset.tab;
            document.getElementById(tabContentId).classList.add('active');
        });
        });
    }
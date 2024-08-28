document.getElementById('searchProduct').addEventListener('click', function() {
    window.location.href = '/pages/view_productos.html'; // Ajusta esta ruta según la ubicación de tu página de administración
});

document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('#tabs a');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            event.preventDefault();
            const target = document.querySelector(tab.getAttribute('href'));

            // Ocultar todos los contenidos de las tabs
            tabContents.forEach(content => content.classList.add('hidden'));

            // Mostrar el contenido relacionado con la tab seleccionada
            target.classList.remove('hidden');

            // Cambiar la apariencia de la tab seleccionada
            tabs.forEach(t => t.classList.remove('border-l', 'border-t', 'border-r', 'rounded-t', 'text-blue-700'));
            tab.classList.add('border-l', 'border-t', 'border-r', 'rounded-t', 'text-blue-700');
        });
    });
});



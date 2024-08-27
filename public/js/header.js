document.addEventListener('DOMContentLoaded', function() {
    const menu = document.getElementById('menu');

    function createMenuItem(item) {
        if (item.submenu && item.submenu.length > 0) {
            const dropdown = document.createElement('div');
            dropdown.classList.add('relative', 'inline-block', 'text-left');
            
            dropdown.innerHTML = `
                <button class="text-white hover:text-red-200">${item.name}</button>
                <div class="dropdown-menu hidden absolute z-10 w-48 bg-white rounded-md shadow-lg">
                    ${item.submenu.map(sub => `
                        <a href="${sub.url || '#'}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-red-100">
                            ${sub.name}
                        </a>
                    `).join('')}
                </div>
            `;

            dropdown.addEventListener('mouseenter', function() {
                dropdown.querySelector('.dropdown-menu').classList.remove('hidden');
            });
            dropdown.addEventListener('mouseleave', function() {
                dropdown.querySelector('.dropdown-menu').classList.add('hidden');
            });

            return dropdown;
        } else {
            const link = document.createElement('a');
            link.href = item.url || '#';
            link.textContent = item.name;
            link.classList.add('text-white', 'hover:text-red-200');
            return link;
        }
    }

    fetch('../js/menu.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al leer el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            //alert('JSON cargado exitosamente');
            console.log('Datos del menú:', data);
            data.forEach(item => {
                const menuItem = createMenuItem(item);
                menu.appendChild(menuItem);
            });
        })
        .catch(error => {
            //alert('Error al cargar el menú');
            console.error('Error cargando el menú:', error);
        });
});

document.addEventListener('DOMContentLoaded', function () {
    const apiEndpoint = '/api/listProduct'; // Endpoint para listar productos
    let currentPage = 1;
    const itemsPerPage = 10;
    let totalPages = 1;

    const searchInput = document.getElementById('searchInput');
    const productTableBody = document.getElementById('productTableBody');
    const pagination = document.getElementById('pagination');

    async function loadProducts() {
        try {
            const response = await fetch(apiEndpoint);
            const data = await response.json();
            console.log('Datos cargados desde la API:', data); // Agrega este console.log para ver lo que está devolviendo la API

            // Verifica si la API devuelve datos válidos
            if (Array.isArray(data)) {
                products = data;
            } else {
                console.error('Error: La API no devolvió un array como se esperaba.', data);
                alert('Error cargando productos. La API no devolvió los datos correctamente.');
            }

            displayProducts(products);
        } catch (error) {
            console.error('Error cargando productos:', error);
            alert('Error cargando productos. Verifica la consola para más detalles.');
        }
    }

    // Mostrar productos en la tabla
    function displayProducts(products) {
        productTableBody.innerHTML = ''; // Limpiar la tabla

        products.forEach((product, index) => {
            const row = document.createElement('tr');
            // Aplicar estilo zebra
            row.className = index % 2 === 0 ? 'bg-gray-100' : 'bg-white';
            row.innerHTML = `
                <td class="py-2 px-4 border-b">${product.productId}</td>
                <td class="py-2 px-4 border-b">${product.sku}</td>
                <td class="py-2 px-4 border-b">${product.name}</td>
                <td class="py-2 px-4 border-b">${product.category.name}</td>
                <td class="py-2 px-4 border-b">${product.brand}</td>
                <td class="py-2 px-4 border-b flex space-x-2">
                    <button class="text-blue-600 hover:text-blue-800" onclick="editProduct('${product.productId}')">
                        🖉 Editar
                    </button>
                    <button class="text-red-600 hover:text-red-800" onclick="deleteProduct('${product.productId}')">
                        🗑️ Borrar
                    </button>
                </td>
            `;
            productTableBody.appendChild(row);
        });
    }

    // Actualizar botones de paginación
    function updatePagination() {
        pagination.innerHTML = '';

        // Botón para página anterior
        if (currentPage > 1) {
            const prevButton = document.createElement('button');
            prevButton.textContent = 'Anterior';
            prevButton.className = 'bg-gray-100 hover:bg-gray-200 px-3 py-1 mx-1 rounded';
            prevButton.addEventListener('click', () => {
                currentPage--;
                loadProducts();
            });
            pagination.appendChild(prevButton);
        }

        // Botones de páginas
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.className = i === currentPage
                ? 'bg-gray-300 px-3 py-1 mx-1 rounded'
                : 'bg-gray-100 hover:bg-gray-200 px-3 py-1 mx-1 rounded';
            pageButton.addEventListener('click', () => {
                currentPage = i;
                loadProducts();
            });
            pagination.appendChild(pageButton);
        }

        // Botón para página siguiente
        if (currentPage < totalPages) {
            const nextButton = document.createElement('button');
            nextButton.textContent = 'Siguiente';
            nextButton.className = 'bg-gray-100 hover:bg-gray-200 px-3 py-1 mx-1 rounded';
            nextButton.addEventListener('click', () => {
                currentPage++;
                loadProducts();
            });
            pagination.appendChild(nextButton);
        }
    }

    // Función para Editar Producto
    window.editProduct = function (productId) {
        window.location.href = `/pages/edit_productos.html?productId=${productId}`;
    }

    // Función para Borrar Producto
    async function deleteProduct(productId) {
        if (confirm('¿Estás seguro de que deseas borrar este producto?')) {
            try {
                const response = await fetch(`/api/productos/${productId}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    alert('Producto borrado con éxito');
                    loadProducts(); // Recargar la tabla después de borrar
                } else {
                    const errorData = await response.json();
                    alert(`Error al borrar el producto: ${errorData.error || 'Problema desconocido'}`);
                }
            } catch (error) {
                console.error('Error al borrar el producto:', error);
                alert('Error al borrar el producto. Verifica la consola para más detalles.');
            }
        }
    }

    // Escuchar el evento de búsqueda con un retraso para evitar demasiadas solicitudes
    let debounceTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            currentPage = 1; // Reiniciar a la primera página al buscar
            loadProducts();
        }, 300); // Esperar 300ms después de que el usuario deja de escribir
    });

    // Ir a la página de creación de producto
    document.getElementById('createProductBtn').addEventListener('click', () => {
        window.location.href = '/pages/productos.html';
    });

    // Cargar productos inicialmente
    loadProducts();
});

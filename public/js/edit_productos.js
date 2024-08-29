document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');

    if (!productId) {
        alert('No se proporcionó un ID de producto válido.');
        return;
    }

    // URL de la API para obtener un producto por su ID
    const apiEndpoint = `/api/findProduct/${productId}`;

    // Obtener elementos del formulario
    const productIdInput = document.getElementById('productId');
    const skuInput = document.getElementById('sku');
    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');
    const categoryIdInput = document.getElementById('categoryId');
    const categoryNameInput = document.getElementById('categoryName');
    const categoryDescriptionInput = document.getElementById('categoryDescription');
    const unitOfMeasurePurchaseIdInput = document.getElementById('unitOfMeasurePurchaseId');
    const unitOfMeasurePurchaseNameInput = document.getElementById('unitOfMeasurePurchaseName');
    const unitOfMeasurePurchaseSymbolInput = document.getElementById('unitOfMeasurePurchaseSymbol');
    const unitOfMeasurePurchaseConversionFactorInput = document.getElementById('unitOfMeasurePurchaseConversionFactor');
    const unitOfMeasureSaleIdInput = document.getElementById('unitOfMeasureSaleId');
    const unitOfMeasureSaleNameInput = document.getElementById('unitOfMeasureSaleName');
    const unitOfMeasureSaleSymbolInput = document.getElementById('unitOfMeasureSaleSymbol');
    const unitOfMeasureSaleConversionFactorInput = document.getElementById('unitOfMeasureSaleConversionFactor');
    const pricePurchaseInput = document.getElementById('pricePurchase');
    const priceSaleInput = document.getElementById('priceSale');
    const inventoryQuantityInput = document.getElementById('inventoryQuantity');
    const reorderPointInput = document.getElementById('reorderPoint');
    const averageWeightedCostInput = document.getElementById('averageWeightedCost');
    const lastMovementDateInput = document.getElementById('lastMovementDate');
    const productStatusInput = document.getElementById('productStatus');
    const productImageInput = document.getElementById('productImage');
    const notesInput = document.getElementById('notes');

    // Función para cargar los datos del producto y llenar el formulario
    async function loadProduct() {
        try {
            const response = await fetch(apiEndpoint);
            const product = await response.json();

            if (response.ok) {
                // Llenar el formulario con los datos del producto
                productIdInput.value = product.productId;
                skuInput.value = product.sku;
                nameInput.value = product.name;
                descriptionInput.value = product.description;
                categoryIdInput.value = product.category.categoryId;
                categoryNameInput.value = product.category.name;
                categoryDescriptionInput.value = product.category.description;
                unitOfMeasurePurchaseIdInput.value = product.unitOfMeasurePurchase.unitId;
                unitOfMeasurePurchaseNameInput.value = product.unitOfMeasurePurchase.name;
                unitOfMeasurePurchaseSymbolInput.value = product.unitOfMeasurePurchase.symbol;
                unitOfMeasurePurchaseConversionFactorInput.value = product.unitOfMeasurePurchase.conversionFactor;
                unitOfMeasureSaleIdInput.value = product.unitOfMeasureSale.unitId;
                unitOfMeasureSaleNameInput.value = product.unitOfMeasureSale.name;
                unitOfMeasureSaleSymbolInput.value = product.unitOfMeasureSale.symbol;
                unitOfMeasureSaleConversionFactorInput.value = product.unitOfMeasureSale.conversionFactor;
                pricePurchaseInput.value = product.pricePurchase;
                priceSaleInput.value = product.priceSale;
                inventoryQuantityInput.value = product.inventoryQuantity;
                reorderPointInput.value = product.reorderPoint;
                averageWeightedCostInput.value = product.averageWeightedCost;
                lastMovementDateInput.value = new Date(product.lastMovementDate).toISOString().split('T')[0];
                productStatusInput.value = product.productStatus;
                productImageInput.value = product.productImage;
                notesInput.value = product.notes;
            } else {
                alert(`Error: ${product.error || 'No se pudo cargar el producto'}`);
            }
        } catch (error) {
            console.error('Error cargando producto:', error);
            alert('Error cargando producto. Verifica la consola para más detalles.');
        }
    }

    document.getElementById('saveProduct').addEventListener('click', async function (event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del botón

        // URL de la API para actualizar un producto por su ID
        const apiEndpoint = `/api/updateProduct/${productId}`;  // Asegúrate de que productId está correctamente definido

        // Crear el objeto con los datos del formulario
        const updatedProduct = {
            productId: document.getElementById('productId').value,
            sku: document.getElementById('sku').value,
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            category: {
                categoryId: document.getElementById('categoryId').value,
                name: document.getElementById('categoryName').value,
                description: document.getElementById('categoryDescription').value
            },
            unitOfMeasurePurchase: {
                unitId: document.getElementById('unitOfMeasurePurchaseId').value,
                name: document.getElementById('unitOfMeasurePurchaseName').value,
                symbol: document.getElementById('unitOfMeasurePurchaseSymbol').value,
                conversionFactor: parseFloat(document.getElementById('unitOfMeasurePurchaseConversionFactor').value)
            },
            unitOfMeasureSale: {
                unitId: document.getElementById('unitOfMeasureSaleId').value,
                name: document.getElementById('unitOfMeasureSaleName').value,
                symbol: document.getElementById('unitOfMeasureSaleSymbol').value,
                conversionFactor: parseFloat(document.getElementById('unitOfMeasureSaleConversionFactor').value)
            },
            pricePurchase: parseFloat(document.getElementById('pricePurchase').value),
            priceSale: parseFloat(document.getElementById('priceSale').value),
            inventoryQuantity: parseInt(document.getElementById('inventoryQuantity').value, 10),
            reorderPoint: parseInt(document.getElementById('reorderPoint').value, 10),
            averageWeightedCost: parseFloat(document.getElementById('averageWeightedCost').value),
            lastMovementDate: document.getElementById('lastMovementDate').value,
            productStatus: document.getElementById('productStatus').value,
            productImage: document.getElementById('productImage').value,
            notes: document.getElementById('notes').value
        };

        try {
            const response = await fetch(apiEndpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            if (response.ok) {
                alert('Producto actualizado con éxito');
                // Redirigir al usuario a otra página si es necesario
                // window.location.href = '/pages/productos.html';
            } else {
                alert('Error al actualizar el producto');
            }
        } catch (error) {
            console.error('Error actualizando el producto:', error);
            alert('Error al actualizar el producto. Verifica la consola para más detalles.');
        }
    });


    // Cargar los datos del producto al cargar la página
    loadProduct();
});

document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('#tabs a');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function (event) {
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
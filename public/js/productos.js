document.getElementById('searchProduct').addEventListener('click', function () {
    window.location.href = '/pages/view_productos.html'; // Ajusta esta ruta según la ubicación de tu página de administración
});

function limpiarFormulario() {
    const form = document.getElementById('product-form');
    form.reset(); // Esto restablece todos los campos a sus valores predeterminados
}

async function guardarProducto() {
    const form = document.getElementById('product-form');

    // Capturar los datos del formulario
    const producto = {
        productId: form.productId.value,
        sku: form.sku.value,
        name: form.name.value,
        description: form.description.value,
        category: {
            categoryId: form.categoryId.value,
            name: form.categoryName.value,
            description: form.categoryDescription.value,
        },
        brand: form.brand?.value || '',
        origin: form.origin?.value || '',
        unitOfMeasurePurchase: {
            unitId: form.unitOfMeasurePurchaseId.value,
            name: form.unitOfMeasurePurchaseName.value,
            symbol: form.unitOfMeasurePurchaseSymbol.value,
            conversionFactor: parseFloat(form.unitOfMeasurePurchaseConversionFactor.value),
        },
        unitOfMeasureSale: {
            unitId: form.unitOfMeasureSaleId.value,
            name: form.unitOfMeasureSaleName.value,
            symbol: form.unitOfMeasureSaleSymbol.value,
            conversionFactor: parseFloat(form.unitOfMeasureSaleConversionFactor.value),
        },
        pricePurchase: parseFloat(form.pricePurchase.value),
        priceSale: parseFloat(form.priceSale.value),
        inventoryQuantity: parseInt(form.inventoryQuantity.value, 10),
        reorderPoint: parseInt(form.reorderPoint?.value, 10) || 0,
        averageWeightedCost: parseFloat(form.averageWeightedCost?.value) || 0,
        lastMovementDate: form.lastMovementDate?.value || null,
        productStatus: form.productStatus.value,
        productImage: form.productImage.value,
        notes: form.notes?.value || '',
    };

    try {
        const response = await fetch('/api/newProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto),
        });

        const responseData = await response.json();

        if (response.ok) {
            alert('Producto guardado con éxito');
            limpiarFormulario(); // Limpiar el formulario después de guardar
        } else {
            //console.error('Error en la respuesta del servidor:', responseData);
            alert(`Error al guardar el producto: ${responseData.error || 'Problema desconocido'}`);
        }
    } catch (error) {
        //console.error('Error en la solicitud:', error);
        alert('Error al guardar el producto. Verifique la consola para más detalles.');
    }
}


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



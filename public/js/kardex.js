

document.getElementById('searchForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const sku = document.getElementById('searchSKU').value;
    const name = document.getElementById('searchName').value;
    const nrecords = document.getElementById('searchQuantity').value

    try {
        // Hacer la solicitud POST a la API con los parámetros de búsqueda
        const response = await fetch('/api/kardex', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sku, name, nrecords })
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const kardexData = await response.json();

        
        // Mostrar detalles del producto seleccionado
        if (kardexData.length > 0) {
            document.getElementById('detailSKU').textContent = kardexData[0].Product.productSKU;
            document.getElementById('detailProduct').textContent = kardexData[0].Product.productName;
            document.getElementById('supplier').textContent = kardexData[0].supplierOrClient;
            document.getElementById('uom').textContent = kardexData[0].unitOfMeasure;
            //document.getElementById('diferencia').textContent = dato["promedioDiferencia"];
            document.getElementById('productDetails').classList.remove('hidden'); // Mostrar la fila de detalles
            document.getElementById('tableContainer').classList.remove('hidden');
        } else {
            document.getElementById('detailSKU').textContent = 'N/A';
            document.getElementById('detailProduct').textContent = 'N/A';
            document.getElementById('supplier').textContent = 'N/A';
            document.getElementById('uom').textContent = 'N/A';
            document.getElementById('productDetails').classList.add('hidden'); // Ocultar si no hay datos
            document.getElementById('tableContainer').classList.remove('hidden');
        }

        const kardexTable = document.getElementById('kardexTable');
        kardexTable.innerHTML = ''; // Limpiar la tabla
        kardexData.forEach(entry => {
            // Convertir la fecha al formato deseado (día/mes/año)
            const formattedDate = new Date(entry.date).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            const row = `
            <tr class="border-b">
                <td class="p-3 text-right">${entry.contador}</td>    
                <td class="p-3">${formattedDate}</td>
                <td class="p-3">${entry.documentMaterial}</td>
                <td class="p-3">${entry.type}</td>
                <td class="p-3">${entry.warehouseOrigin.name}</td>
                    
                    
                <td class="p-3" style="text-align: right;">${entry.quantity_d}</td>
                <td class="p-3" style="text-align: right;">${entry.quantity_h}</td>
                <td class="p-3" style="text-align: right;">${entry.totalQTY}</td>
                <td class="p-3" style="text-align: right;">${entry.predictedQTY.toFixed(2)}</td>
                <td class="p-3" style="text-align: right;">${entry.totalCost.toFixed(2)}</td>

                <td class="p-3">${entry.movementStatus}</td>
            </tr>`;
            kardexTable.insertAdjacentHTML('beforeend', row);
        });
    } catch (error) {
        console.error('Error al obtener datos del kardex:', error);
        //alert('Hubo un error al cargar los datos del kardex. Por favor, intente de nuevo.');
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const ctx1 = document.getElementById('smallChart1').getContext('2d');
    const smallChart1 = new Chart(ctx1, {
        type: 'bar', // Cambia a 'line', 'pie', etc., según tu necesidad
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
            datasets: [{
                data: [300, 325, 361, 380, 388, 400, 425],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { display: false }, // Ocultar ejes para un gráfico más simple
                y: { display: false }
            },
            plugins: {
                legend: { display: false }, // Ocultar la leyenda
            }
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const ctx1 = document.getElementById('smallChart2').getContext('2d');
    const smallChart1 = new Chart(ctx1, {
        type: 'line', // Cambia a 'line', 'pie', etc., según tu necesidad
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
            datasets: [{
                data: [120, 110, 109, 109, 100, 80, 76],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { display: false }, // Ocultar ejes para un gráfico más simple
                y: { display: false }
            },
            plugins: {
                legend: { display: false }, // Ocultar la leyenda
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const ctx1 = document.getElementById('smallChart3').getContext('2d');
    const smallChart1 = new Chart(ctx1, {
        type: 'doughnut', // Cambia a 'line', 'pie', etc., según tu necesidad
        data: {
            labels: [],
            datasets: [{
                data: [95, 5],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', '#e0e0e0'], // ['#36a2eb', '#e0e0e0'], // Colores para el progreso y el faltante
                hoverBackgroundColor: ['#36a2eb', '#e0e0e0'],
                borderColor: 'rgba(255, 99, 132, 10)',
                borderWidth: 1,
                barPercentage: 3.0, // Barra más ancha
                categoryPercentage: 1.0 // Reducir el espacio entre categorías
            }]
        },
        options: {
            rotation: -90, // Rotar el inicio para que quede en la base
            circumference: 180, // Mostrar solo la mitad para efecto de odómetro
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: { display: false }, // Ocultar ejes para un gráfico más simple
                y: { display: false }
            },
            plugins: {
                legend: { display: false }, // Ocultar la leyenda
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const ctx1 = document.getElementById('smallChart4').getContext('2d');
    const smallChart1 = new Chart(ctx1, {
        type: 'doughnut', // Cambia a 'line', 'pie', etc., según tu necesidad
        data: {
            labels: [],
            datasets: [{
                data: [95, 5],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', '#e0e0e0'], // ['#36a2eb', '#e0e0e0'], // Colores para el progreso y el faltante
                hoverBackgroundColor: ['#36a2eb', '#e0e0e0'],
                borderColor: 'rgba(255, 99, 132, 10)',
                borderWidth: 1,
                barPercentage: 3.0, // Barra más ancha
                categoryPercentage: 1.0 // Reducir el espacio entre categorías
            }]
        },
        options: {
            rotation: -90, // Rotar el inicio para que quede en la base
            circumference: 180, // Mostrar solo la mitad para efecto de odómetro
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: { display: false }, // Ocultar ejes para un gráfico más simple
                y: { display: false }
            },
            plugins: {
                legend: { display: false }, // Ocultar la leyenda
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const ctx1 = document.getElementById('smallChart5').getContext('2d');
    const smallChart1 = new Chart(ctx1, {
        type: 'line', // Cambia a 'line', 'pie', etc., según tu necesidad
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
            datasets: [{
                data: [5, 11, 14, 16, 16, 20, 19, 25],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { display: false }, // Ocultar ejes para un gráfico más simple
                y: { display: false }
            },
            plugins: {
                legend: { display: false }, // Ocultar la leyenda
            }
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('smallChart6').getContext('2d');
    const percentageChart = new Chart(ctx, {
        type: 'doughnut', // Tipo de gráfico donut
        data: {
            labels: ['Progreso', 'Faltante'],
            datasets: [{
                data: [10, 90], // 75% de progreso
                backgroundColor: ['rgba(255, 99, 132, 0.2)', '#e0e0e0'], // ['#36a2eb', '#e0e0e0'], // Colores para el progreso y el faltante
                hoverBackgroundColor: ['#36a2eb', '#e0e0e0'],
                borderColor: 'rgba(255, 99, 132, 10)'
            }]
        },
        options: {
            rotation: -90, // Rotar el inicio para que quede en la base
            circumference: 180, // Mostrar solo la mitad para efecto de odómetro
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }, // Ocultar la leyenda
                tooltip: { enabled: false }, // Ocultar el tooltip
            },
            cutout: '50%', // Tamaño del agujero en el centro
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('smallChart8').getContext('2d');
    const percentageChart = new Chart(ctx, {
        type: 'doughnut', // Tipo de gráfico donut
        data: {
            labels: ['Progreso', 'Faltante'],
            datasets: [{
                data: [5, 95], // 75% de progreso
                backgroundColor: ['rgba(255, 99, 132, 0.2)', '#e0e0e0'], // ['#36a2eb', '#e0e0e0'], // Colores para el progreso y el faltante
                hoverBackgroundColor: ['#36a2eb', , '#e0e0e0'],
                borderColor: 'rgba(255, 99, 132, 10)'
            }]
        },
        options: {
            rotation: -90, // Rotar el inicio para que quede en la base
            circumference: 180, // Mostrar solo la mitad para efecto de odómetro
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }, // Ocultar la leyenda
                tooltip: { enabled: false }, // Ocultar el tooltip
            },
            cutout: '50%', // Tamaño del agujero en el centro
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const ctx1 = document.getElementById('smallChart9').getContext('2d');
    const smallChart1 = new Chart(ctx1, {
        type: 'bar', // Cambia a 'line', 'pie', etc., según tu necesidad
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
            datasets: [{
                data: [8, 9, 5, 3, 2.8, 2.5, 2.1],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { display: false }, // Ocultar ejes para un gráfico más simple
                y: { display: false }
            },
            plugins: {
                legend: { display: false }, // Ocultar la leyenda
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('smallChart10').getContext('2d');
    const percentageChart = new Chart(ctx, {
        type: 'doughnut', // Tipo de gráfico donut
        data: {
            labels: ['Progreso', 'Faltante'],
            datasets: [{
                data: [7, 93], // 75% de progreso
                backgroundColor: ['rgba(255, 99, 132, 0.2)', '#e0e0e0'], // ['#36a2eb', '#e0e0e0'], // Colores para el progreso y el faltante
                hoverBackgroundColor: ['#36a2eb', , '#e0e0e0'],
                borderColor: 'rgba(255, 99, 132, 10)'
            }]
        },
        options: {
            rotation: -90, // Rotar el inicio para que quede en la base
            circumference: 180, // Mostrar solo la mitad para efecto de odómetro
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }, // Ocultar la leyenda
                tooltip: { enabled: false }, // Ocultar el tooltip
            },
            cutout: '50%', // Tamaño del agujero en el centro
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const ctx1 = document.getElementById('smallChart11').getContext('2d');
    const smallChart1 = new Chart(ctx1, {
        type: 'bar', // Cambia a 'line', 'pie', etc., según tu necesidad
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
            datasets: [{
                data: [25000, 23245, 20100, 18000, 15600, 12400, 12215],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { display: false }, // Ocultar ejes para un gráfico más simple
                y: { display: false }
            },
            plugins: {
                legend: { display: false }, // Ocultar la leyenda
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const ctx1 = document.getElementById('smallChart13').getContext('2d');
    const smallChart1 = new Chart(ctx1, {
        type: 'bar', // Cambia a 'line', 'pie', etc., según tu necesidad
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
            datasets: [{
                data: [800, 780, 541, 231, 600, 100, 421],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { display: false }, // Ocultar ejes para un gráfico más simple
                y: { display: false }
            },
            plugins: {
                legend: { display: false }, // Ocultar la leyenda
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const ctx1 = document.getElementById('smallChart14').getContext('2d');
    const smallChart1 = new Chart(ctx1, {
        type: 'bar', // Cambia a 'line', 'pie', etc., según tu necesidad
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
            datasets: [{
                data: [400, 10, 7, 10, 5, 1, 1, 2],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { display: false }, // Ocultar ejes para un gráfico más simple
                y: { display: false }
            },
            plugins: {
                legend: { display: false }, // Ocultar la leyenda
            }
        }
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const tableRows = document.querySelectorAll('tbody tr');

    tableRows.forEach(row => {
        const stockQty = parseFloat(row.cells[4].textContent);
        const predStockQty = parseFloat(row.cells[5].textContent);
        const stockUSD = parseFloat(row.cells[6].textContent.replace('$', '').replace(',', ''));
        const ventaUSD = parseFloat(row.cells[8].textContent.replace('$', '').replace(',', ''));
        const precisionStock = ((stockQty - predStockQty) / predStockQty * 100).toFixed(2);
        const rotacion = (ventaUSD / stockUSD).toFixed(2);

        // Asignar valores calculados a las celdas
        row.cells[9].textContent = rotacion;
        row.cells[10].textContent = `${precisionStock}%`;

        // Determinar la eficiencia y aplicar el icono correspondiente
        if (rotacion >= 0.5) {
            row.cells[11].innerHTML = '<span class="eficiencia-alta">✔️</span>';
        } else if (rotacion >= 0.45) {
            row.cells[11].innerHTML = '<span class="eficiencia-media">⚠️</span>';
        } else {
            row.cells[11].innerHTML = '<span class="eficiencia-baja">❌</span>';
        }
    });
});


document.addEventListener('DOMContentLoaded', async function () {
    try {
        // Hacer la solicitud al API para obtener los entrenamientos
        const response = await fetch('/api/listTrainings');

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        // Convertir la respuesta a JSON
        const trainings = await response.json();

        // Limpiar la tabla antes de agregar los datos
        const trainingTable = document.getElementById('trainingTable');
        trainingTable.innerHTML = ''; // Limpiar contenido previo

        // Iterar sobre los datos obtenidos y generar las filas
        trainings.forEach(async (training) => {
            try {
                // Hacer la solicitud al API para obtener el nombre del producto
                const productResponse = await fetch(`/api/getProductName?sku=${training.productSKU}`);

                // Verificar si la respuesta es exitosa
                if (!productResponse.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }

                // Convertir la respuesta a JSON
                const productData = await productResponse.json();

                // Crear la fila para la tabla con los datos obtenidos
                const row = `
                <tr>
                    <td class="p-3 text-left">${new Date(training.fecha_quiebre).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) || 'N/A'}</td>
                    <td class="p-3 text-left">${training.productSKU}</td>
                    <td class="p-3 text-left">${productData.productName || 'N/A'}</td>
                    <td class="p-3 text-left">${training.mae.toFixed(4) || 'N/A'}</td>
                    <td class="p-3 text-left">${training.rmse.toFixed(4) || 'N/A'}</td>
                    <td class="p-3 text-left">${training.rs.toFixed(4) || 'N/A'}</td>
                    <td class="p-3 text-left">${training.Duration?.duration.toFixed(4) || 'N/A'}</td>
                    
                    <td class="p-3 text-left">${training.prediccion.toFixed(4) || 'N/A'}</td>

                    <td><span class="eficiencia-media">⚠️</span></td>
                    
                    <td><button class="btn-train" data-sku="${training.productSKU}">Entrenar</button></td>
                </tr>
                `;

                // Insertar la fila generada en el tbody     -----    <td><button class="btn-train">Entrenar</button></td>
                trainingTable.insertAdjacentHTML('beforeend', row);
            } catch (error) {
                console.error('Error al obtener el nombre del producto:', error);
            }
        });
    } catch (error) {
        console.error('Error al obtener los datos del entrenamiento:', error);
        alert('Hubo un error al cargar los datos del entrenamiento. Por favor, intente de nuevo.');
    }
});

// Delegación de eventos para los botones "Entrenar"
document.getElementById('trainingTable').addEventListener('click', async function (event) {
    // Verificar si el elemento clicado es un botón con la clase 'btn-train'
    if (event.target.classList.contains('btn-train')) {
        const sku = event.target.getAttribute('data-sku');
        console.log('se puede entrar');
        try {
            const response = await fetch(`/api/entrenar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sku }), // Enviar el SKU en el cuerpo de la petición
            });

            if (response.ok) {
                alert(`Entrenamiento iniciado para el producto con SKU: ${sku}`);
            } else {
                alert(`Error iniciando el entrenamiento para el SKU: ${sku}`);
            }
        } catch (error) {
            console.error('Error en la llamada a la API de entrenar:', error);
            alert('Hubo un error al intentar iniciar el entrenamiento.');
        }
    }
});

// Agregar manejador de eventos para los botones de entrenar
document.querySelectorAll('.btn-train').forEach(button => {
    button.addEventListener('click', async (event) => {
        const sku = event.target.getAttribute('data-sku');
        console.log('se puede entrar')
        try {
            const response = await fetch(`/api/entrenar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sku }), // Enviar el SKU en el cuerpo de la petición
            });

            if (response.ok) {
                alert(`Entrenamiento iniciado para el producto con SKU: ${sku}`);
            } else {
                alert(`Error iniciando el entrenamiento para el SKU: ${sku}`);
            }
        } catch (error) {
            console.error('Error en la llamada a la API de entrenar:', error);
            alert('Hubo un error al intentar iniciar el entrenamiento.');
        }
    });
});
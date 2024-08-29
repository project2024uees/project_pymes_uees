document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('saveUser').addEventListener('click', async function (event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del botón

        const apiEndpoint = '/api/createUser';

        const newUser = {
            userId: document.getElementById('userId').value,
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            password: document.getElementById('password').value,
            userStatus: document.getElementById('userStatus').value,
            roles: [{
                roleId: document.getElementById('roleId').value,
                name: document.getElementById('roleName').value,
                description: document.getElementById('roleDescription').value
            }],
            notes: document.getElementById('notes').value
        };

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            const responseData = await response.json();
            //alert(responseData)
            if (response.ok) {
                alert('Usuario creado con éxito');
                // Redirigir al usuario o limpiar el formulario si es necesario
            } else {
                alert('Error al crear el usuario');
            }
        } catch (error) {
            console.error('Error creando el usuario:', error);
            alert('Error creando el usuario. Verifica la consola para más detalles.');
        }
    });
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

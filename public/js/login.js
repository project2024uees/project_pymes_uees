
function handleSubmit(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del submit

    // Simular manejo de la sesión
    sessionStorage.setItem('authorized', 'true');

    // Mostrar los valores de la sesión en un alert
    const sessionData = {
        authorized: sessionStorage.getItem('authorized'),
        // Puedes agregar más valores de la sesión aquí
    };
    

    // Redirigir al usuario (opcional)
    window.location.href = '/pages/main.html';
    return false; // Prevenir la redirección por defecto del formulario
}


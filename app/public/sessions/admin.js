document.getElementsByClassName("btn")[0].addEventListener('click', async (event) => {
    event.preventDefault();
    try {
        const response = await fetch('/api/logout', {
            method: 'POST',
            credentials: 'same-origin'
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'No se pudo cerrar sesión');
        document.location.href = result.redirect || '/login';
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
});

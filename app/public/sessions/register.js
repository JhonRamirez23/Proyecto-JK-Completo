const errorUsuario = document.getElementsByClassName('error')[0];
const exitoUsuario = document.getElementsByClassName('success')[0];

document.getElementById('form-container').addEventListener('submit', async (e) => {
    e.preventDefault();
    const resp = await fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuario: e.target.children.user.value,
            documento: e.target.children.documento.value,
            email: e.target.children.email.value,
            password: e.target.children.password.value,
        })
    });

    const result = await resp.json();
    if (!resp.ok) {
        errorUsuario.textContent = result.message || 'No fue posible completar el registro.';
        errorUsuario.classList.remove('hide-text');
        return;
    }

    errorUsuario.classList.add('hide-text');
    exitoUsuario.textContent = `${result.message}. Redirigiendo al inicio de sesión...`;
    exitoUsuario.classList.remove('hide-text');
    window.setTimeout(() => {
        window.location.href = result.redirect || '/login';
    }, 1200);

});

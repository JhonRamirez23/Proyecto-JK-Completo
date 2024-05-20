const mensajeError = document.getElementsByClassName('error')[0];

document.getElementById('formulario-login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const documento = e.target.children.documento.value;
    const password = e.target.children.password.value;
    const res = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            documento, password
        })
    });

    if(!res.ok) return mensajeError.classList.toggle('hide-text', false);
    
    const resJson = await res.json();
    if (resJson.redirect) {
        window.location.href = resJson.redirect;
    }
})
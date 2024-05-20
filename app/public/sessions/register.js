const errorUsuario = document.getElementsByClassName('error')[0];

document.getElementById('form-container').addEventListener('submit', async (e) => {
    e.preventDefault();
    const resp = await fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: e.target.children.user.value,
            documento: e.target.children.documento.value,
            email: e.target.children.email.value,
            password: e.target.children.password.value,
        })
    });

    if(!resp.ok) {

        //Muestra el error en formato HTML
        const errorHTML = await resp.text();
        console.error(errorHTML); //Muestra el mensaje de error en la consola
        return errorUsuario.classList.toggle('hide-text', false);
    } else {
        window.location.href = '/login';
    }

});
document.getElementById('uploadForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const fileInput = document.getElementById('fileInput');
  const formData = new FormData();
  formData.append('file', fileInput.files[0]);
  
  try {
      const response = await fetch('http://localhost:4000/update-images', {
          method: 'POST',
          body: formData
      });
      
      if (response.ok) {
        const result = await response.text();
        showAlert("Imagen cargada correctamente", 'success');
        displayUploadedImages(); // Actualizar lista de imágenes subidas

      } else {
          throw new Error('Error en la subida de archivos');
      }
  } catch (error) {
      showAlert(error.message, 'error');
  }
});

function showAlert(message, type) {
  const alertContainer = document.getElementById('alertContainer');
  const alert = document.createElement('div');
  alert.className = `alert alert-${type} show`;
  alert.innerHTML = `
      ${message}
      <span class="alert-close">&times;</span>
  `;
  
  alertContainer.appendChild(alert);
  
  // Añadir funcionalidad de cierre
  alert.querySelector('.alert-close').addEventListener('click', () => {
      alert.classList.remove('show');
      setTimeout(() => alert.remove(), 500); // Esperar a que la transición termine antes de eliminar
  });

  // Eliminar la alerta después de 5 segundos
  setTimeout(() => {
      alert.classList.remove('show');
      setTimeout(() => alert.remove(), 500);
  }, 5000);
}

async function displayUploadedImages() {
    try {
        const response = await fetch('http://localhost:4000/uploaded-images');
        if (!response.ok) {
            throw new Error('Error al obtener las imágenes.');
        }
        const images = await response.json();
        
        const imagesContainer = document.getElementById('imagesContainer');
        imagesContainer.innerHTML = '';
        
        images.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = `http://localhost:4000/uploads/${image}`;
            imagesContainer.appendChild(imgElement);
        });
    } catch (error) {
        showAlert(error.message, 'error');
    }
}

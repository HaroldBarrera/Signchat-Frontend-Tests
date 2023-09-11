// index_TypeScript_pr2.ts

function cargarContenido() {
    // Realizar una solicitud HTTP GET a la URL deseada
    fetch('http://localhost:8080/keyboard')
    .then(response => response.text())
    .then(data => {
        document.getElementById('keyboard-container')!.innerHTML = data;
    })
    .catch(error => console.error('Error:', error));
}

function LscKeyPressed(button: HTMLElement) {
    var dataKey = button.getAttribute('data-key');
    var messageInput = document.getElementById('message-input') as HTMLInputElement;

    // Verificar si dataKey es "del" y eliminar el último carácter
    if (dataKey === "del") {
        var inputValue = messageInput.value;
        if (inputValue.length > 0) {
            // Eliminar el último carácter
            messageInput.value = inputValue.slice(0, -1);
        }
    } else {
        // Agregar el valor de dataKey al input-field
        messageInput.value += dataKey || '';
    }
}

// Manejador de eventos onload
window.onload = cargarContenido;

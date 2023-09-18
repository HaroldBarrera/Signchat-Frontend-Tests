// Importa Axios para realizar solicitudes HTTP
import axios from 'axios';

// Define la variable stompClient
let stompClient: any = null;

// Función para conectar al servidor WebSocket
function connect() {
    var socket = new SockJS('http://localhost:8080/ws-chat'); // Conecta al endpoint WebSocket
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Conectado: ' + frame);
    });

    // Suscribirse al canal después de la conexión exitosa
    stompClient.subscribe('/topic/message', function (response) {
        var message = JSON.parse(response.body);
        // Manejar el mensaje recibido y mostrarlo en el chat-container
        var chatContainer = document.getElementById('chat-container');
        chatContainer.innerHTML += '<p>' + message.message + '</p>';
    });
}

// Función para enviar un mensaje
function sendMessage() {
    publicarTexto();
    var messageInput = document.getElementById('message-input') as HTMLInputElement;
    var message = messageInput.value;
    stompClient.send("/app/sendMessage", {}, JSON.stringify({ message: message }));
    messageInput.value = '';
}

// Función para cargar contenido al cargar la página
function cargarContenido() {
    // Realizar una solicitud HTTP GET a la URL deseada
    axios.get('http://localhost:8080/keyboard')
    .then(response => {
        document.getElementById('keyboard-container')!.innerHTML = response.data;
        connect();
    })
    .catch(error => console.error('Error:', error));
}

// Función para manejar la pulsación de teclas en el teclado virtual
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
        messageInput.value += dataKey;
    }
}

// Función para publicar texto
function publicarTexto() {
    // Obtén el texto del campo de entrada
    const texto = (document.getElementById("message-input") as HTMLInputElement).value;
    // Obtén el div de salida
    const resultadoDiv = document.getElementById("chat-container") as HTMLDivElement;

    // Publica el texto en el div de salida
    resultadoDiv.textContent = texto;
}

// Suscripción al canal '/topic/public'
stompClient.subscribe('/topic/public', function (response: any) {
    var message = JSON.parse(response.body);
    // Manejar el mensaje recibido y mostrarlo en el chat-container
    var chatContainer = document.getElementById('chat-container');
    chatContainer.innerHTML += '<p>' + message.message + '</p>';
});

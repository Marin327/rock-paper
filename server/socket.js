import io from 'socket.io-client';

// Свързване към сървъра на localhost:5000
const socket = io('http://localhost:5000');

// Когато се свърже успешно към сървъра
socket.on('connect', () => {
  console.log('Connected to server');
});

// Връщаме socket, за да може да бъде използван в други файлове
export default socket;

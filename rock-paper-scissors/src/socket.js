// socket.js
import io from 'socket.io-client';

const socket = io('http://localhost:5000');  // Увери се, че имаш правилния път към сървъра
socket.on('connect', () => {
  console.log('Connected to server');
});
// Увери се, че имаш правилния URL за свързване към сървъра
const socket = io('http://localhost:5000');

export default socket;
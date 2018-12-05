const socket = io();

socket.on('connect', () => {
  console.log('connect to server');
});

socket.on('disconnect', () => {
  console.log('disconnect to server');
});

socket.on('newMessage', message => {
  console.log('new message', message);
});

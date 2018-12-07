// eslint-disable-next-line no-undef
const socket = io();

socket.on('connect', () => {
  console.log('connect to server');
});

socket.on('disconnect', () => {
  console.log('disconnect to server');
});

socket.on('newMessage', message => {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const li = jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', e => {
  e.preventDefault();
  const messageTxetbot = jQuery('#message');
  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: messageTxetbot.val(),
    },
    () => {
      messageTxetbot.val('');
    }
  );
});

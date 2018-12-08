/* eslint no-use-before-define: 0 */

const socket = io();
let timeout = false;

function scrollToBottom() {
  const messages = jQuery('#messages');
  const newMessage = messages.children('li:last-child');
  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', () => {
  const params = jQuery.deparam(window.location.search);

  socket.emit('join', params, err => {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  });
});

socket.on('disconnect', () => {
  console.log('disconnect to server');
});

socket.on('updateUserList', users => {
  const ul = jQuery('<ul></ul>');

  users.forEach(user => {
    ul.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ul);
});

socket.on('newMessage', message => {
  const formattedTime = moment(message.createdAt).format('HH:mm');
  const template = jQuery('#message-template').html();
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime,
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});

function timeoutFunction() {
  const typing = false;
  socket.emit('typing', false);
}

socket.on('typing', message => {
  if (message) {
    $('#isTyping').html(message);
  } else {
    $('#isTyping').html('');
  }
});

jQuery('#message').keyup(() => {
  const typing = true;
  socket.emit('typing', 'typing...');
  clearTimeout(timeout);
  timeout = setTimeout(timeoutFunction, 2000);
});

jQuery('#message-form').on('submit', e => {
  e.preventDefault();
  const messageTextbox = jQuery('#message');

  socket.emit(
    'createMessage',
    {
      text: messageTextbox.val(),
    },
    () => {
      messageTextbox.val('');
    }
  );
});

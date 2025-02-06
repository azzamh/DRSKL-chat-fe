<template>
  <div class="chat-container">
    <h1>1-on-1 Chat</h1>
    <!-- Login / Join Section -->
    <div v-if="!joined" class="join-section">
      <input v-model="username" placeholder="Enter your username" />
      <button @click="joinChat">Join Chat</button>
    </div>

    <!-- Chat Section -->
    <div v-else>
      <p>You are logged in as: <strong>{{ username }}</strong></p>
      <div class="message-form">
        <input v-model="target" placeholder="Target username" />
        <input
          v-model="message"
          placeholder="Enter your message"
          @keyup.enter="sendMessage"
        />
        <button @click="sendMessage">Send</button>
      </div>
      <div class="chat-window">
        <ul>
          <li v-for="(msg, index) in messages" :key="index">
            <strong>{{ msg.from }}</strong>: {{ msg.content }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const { $socket } = useNuxtApp()

interface PrivateMessage {
  from: string;
  to: string;
  content: string;
}
const username = ref<string>('');
const target = ref<string>('');
const message = ref<string>('');
const messages = ref<PrivateMessage[]>([]);
const joined = ref(false);


// Join the chat by emitting a "join" event with the username
const joinChat = () => {
  const trimmedUsername = username.value.trim();
  if (trimmedUsername !== '') {
    $socket.emit('join', trimmedUsername);
    joined.value = true;
  }
};

// Send a private message to the target user
const sendMessage = () => {
  const trimmedMessage = message.value.trim();
  const trimmedTarget = target.value.trim();
  if (trimmedMessage !== '' && trimmedTarget !== '') {
    const payload: PrivateMessage = {
      from: username.value,
      to: trimmedTarget,
      content: trimmedMessage,
    };
    $socket.emit('private message', payload);
    // Optionally, display the sent message in your own chat window
    messages.value.push({ from: `You (to ${trimmedTarget})`, content: trimmedMessage });
    message.value = '';
  }
};

// Listen for incoming private messages from the server
onMounted(() => {
  $socket.on('private message', (payload: PrivateMessage) => {
    messages.value.push(payload);
  });
});

</script>
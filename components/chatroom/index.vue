<template>
  <div class="chat-container">
    <h1>Simple Chat App</h1>
    <div class="chat-window">
      <ul>
        <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
      </ul>
    </div>
    <div class="chat-input">
      <input
        v-model="message"
        @keyup.enter="sendMessage"
        placeholder="Type your message..."
      />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script setup lang="ts">

const { $socket } = useNuxtApp()
const messages = ref<string[]>([]);
const message = ref<string>('');

onMounted(() => {
  $socket.on('chat message', (msg: string) => {
      messages.value.push(msg);
  });
});

const sendMessage = () => {
  const trimmedMsg = message.value.trim();
  if (trimmedMsg) {
    // Emit the chat message to the server
    console.log(trimmedMsg);
    $socket.emit('chat message', trimmedMsg);
    message.value = '';
  }
};

</script>
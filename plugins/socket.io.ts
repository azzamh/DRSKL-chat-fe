import { defineNuxtPlugin } from '#app';
import { io, Socket } from 'socket.io-client';

export default defineNuxtPlugin((nuxtApp) => {
  // Connect to the Socket.IO server (adjust the URL if needed)
  const socket: Socket = io('http://localhost:3001');

  // Optionally, add any additional event listeners or logic here

  // Inject the socket instance into the Nuxt context as $socket
  // nuxtApp.provide('socket', socket);
  return {
    provide: {
      socket: socket
    }
  }
});
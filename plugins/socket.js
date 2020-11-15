import Vue from 'vue'
import VueNativeWebSocket from 'vue-native-websocket'

Vue.use(VueNativeWebSocket, process.env.SOCKET_URL, {
  format: 'json',
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
})

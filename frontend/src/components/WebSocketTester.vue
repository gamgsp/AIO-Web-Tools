<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">WebSocket Tester</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The WebSocket Tester helps you connect to and interact with WebSocket servers.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example WebSocket URL:</h4>
        <pre class="bg-gray-100 p-2 rounded">
wss://echo.websocket.org
        </pre>
        <p class="text-lg mb-6">Enter a WebSocket URL to connect.</p>
      </div>
    </div>
    <div class="tool-form">
      <div class="form-group mb-4">
        <label for="wsUrl" class="block text-gray-700 text-sm font-bold mb-2">WebSocket URL:</label>
        <input id="wsUrl" v-model="wsUrl" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter WebSocket URL..."/>
      </div>
      <div class="tool-actions mb-6">
        <button @click="connect" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Connect</button>
        <button @click="disconnect" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2">Disconnect</button>
      </div>
      <div v-if="isConnected" class="form-group mb-4">
        <label for="message" class="block text-gray-700 text-sm font-bold mb-2">Message:</label>
        <input id="message" v-model="message" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter message..."/>
        <button @click="sendMessage" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">Send</button>
      </div>
    </div>
    <div>
      <h4>Connection Status: {{ connectionStatus }}</h4>
    </div>
    <div>
      <h4>Received Messages:</h4>
      <ul class="list-disc pl-6">
        <li v-for="(msg, index) in messages" :key="index" class="break-words">{{ msg }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WebSocketTester',
  data() {
    return {
      wsUrl: '',
      ws: null,
      isConnected: false,
      connectionStatus: 'Disconnected',
      message: '',
      messages: [],
    };
  },
  methods: {
    connect() {
      if (this.wsUrl) {
        this.ws = new WebSocket(this.wsUrl);
        this.ws.onopen = () => {
          this.isConnected = true;
          this.connectionStatus = 'Connected';
        };
        this.ws.onmessage = (event) => {
          this.messages.push(event.data);
        };
        this.ws.onclose = () => {
          this.isConnected = false;
          this.connectionStatus = 'Disconnected';
        };
        this.ws.onerror = (error) => {
          this.connectionStatus = `Error: ${error.message}`;
        };
      }
    },
    disconnect() {
      if (this.ws) {
        this.ws.close();
      }
    },
    sendMessage() {
      if (this.ws && this.isConnected) {
        this.ws.send(this.message);
        this.message = '';
      }
    },
  },
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';

.input {
  margin: 10px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.tool-actions button {
  margin-right: 10px;
}
.break-words {
  word-break: break-word;
}
</style>

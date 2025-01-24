<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Public Key/Private Key Generator</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: This tool helps you generate cryptographic key pairs used in secure communication.
    </p>
    <div class="tool-actions mb-6">
      <button @click="generateKeys" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="loading">
        <span v-if="loading" class="spinner-border"></span>
        <span v-else>Generate Keys</span>
      </button>
    </div>
    <div v-if="publicKey || privateKey || error" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Generated Keys</h3>
      <div v-if="publicKey" class="result">
        <p class="font-bold">Public Key:</p>
        <pre class="break-words bg-gray-100 p-2 rounded">{{ publicKey }}</pre>
      </div>
      <div v-if="privateKey" class="result mt-4">
        <p class="font-bold">Private Key:</p>
        <pre class="break-words bg-gray-100 p-2 rounded">{{ privateKey }}</pre>
      </div>
      <p v-if="error" class="error text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'KeyPairGenerator',
  data() {
    return {
      publicKey: '',
      privateKey: '',
      error: '',
      loading: false,
    };
  },
  methods: {
    async generateKeys() {
      this.loading = true;
      this.error = '';
      this.publicKey = '';
      this.privateKey = '';
      try {
        const response = await axios.post('http://localhost:5000/api/generate-keys');
        console.log('Response data:', response.data); // Log response data
        this.publicKey = response.data.publicKey;
        this.privateKey = response.data.privateKey;
      } catch (error) {
        console.error('Error generating keys:', error); // Log error
        this.error = `Error: ${error.response ? error.response.data.message : error.message}`;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';

.break-words {
  word-break: break-word;
}
</style>

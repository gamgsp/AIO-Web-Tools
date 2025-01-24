<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Secure Token Generator</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Secure Token Generator helps you create strong, random tokens for security purposes.
    </p>
    <div class="tool-form mb-6">
      <form @submit.prevent="generateToken">
        <div class="form-group mb-4">
          <label for="length" class="block text-gray-700 text-sm font-bold mb-2">Token Length:</label>
          <input id="length" v-model="length" type="number" min="1" max="64" placeholder="Enter token length" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="loading">
            <span v-if="loading" class="spinner-border"></span>
            <span v-else>Generate Token</span>
          </button>
        </div>
      </form>
    </div>
    <div v-if="token || error" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Generated Token</h3>
      <div v-if="token" class="result">
        <pre class="break-words bg-gray-100 p-2 rounded">{{ token }}</pre>
      </div>
      <p v-if="error" class="error text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SecureTokenGenerator',
  data() {
    return {
      length: 32,
      token: '',
      error: '',
      loading: false,
    };
  },
  methods: {
    async generateToken() {
      this.loading = true;
      this.error = '';
      this.token = '';
      try {
        const response = await axios.post('http://localhost:5000/api/generate-token', { length: this.length });
        this.token = response.data.token;
      } catch (error) {
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

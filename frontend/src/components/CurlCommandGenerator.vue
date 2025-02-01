<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Curl Command Generator</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Curl Command Generator helps you generate `curl` commands based on provided HTTP request details.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example Request:</h4>
        <pre class="bg-gray-100 p-2 rounded">
Request URL: https://jsonplaceholder.typicode.com/todos/1
Method: GET
Generated Curl Command: curl -X GET "https://jsonplaceholder.typicode.com/todos/1"
        </pre>
      </div>
    </div>
    <div class="tool-form mb-6">
      <form @submit.prevent="generateCurlCommand">
        <div class="form-group mb-4">
          <label for="url" class="block text-gray-700 text-sm font-bold mb-2">Request URL:</label>
          <input id="url" v-model="url" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div class="form-group mb-4">
          <label for="method" class="block text-gray-700 text-sm font-bold mb-2">Method:</label>
          <select id="method" v-model="method" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
        <div v-if="method !== 'GET'" class="form-group mb-4">
          <label for="body" class="block text-gray-700 text-sm font-bold mb-2">Request Body (JSON):</label>
          <textarea id="body" v-model="body" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="4"></textarea>
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="loading">
            <span v-if="loading" class="spinner-border"></span>
            <span v-else>Generate Curl Command</span>
          </button>
        </div>
      </form>
    </div>
    <div v-if="result" class="mt-4">
      <h4 class="text-lg font-bold">Generated Curl Command:</h4>
      <pre class="bg-gray-100 p-2 rounded">{{ result }}</pre>
    </div>
    <p v-if="error" class="error text-red-500">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CurlCommandGenerator',
  data() {
    return {
      url: '',
      method: 'GET',
      body: '',
      result: null,
      error: '',
      loading: false,
    };
  },
  methods: {
    async generateCurlCommand() {
      this.loading = true;
      this.error = '';
      this.result = null;

      try {
        // Detect current protocol and host
        const protocol = window.location.protocol;
        const host = window.location.hostname;
        const port = 5000;

        // Construct the API URL with the correct port
        const apiUrl = `${protocol}//${host}:${port}/api/generate-curl-command`;

        const response = await axios.post(apiUrl, {
          url: this.url,
          method: this.method,
          body: this.body,
        });
        this.result = response.data;
      } catch (error) {
        this.error = `Error: ${error.response ? error.response.data.message : error.message}`;
        console.error('Curl command generation error:', this.error);
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

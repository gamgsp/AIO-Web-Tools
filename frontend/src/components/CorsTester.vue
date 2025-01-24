<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Cross-Origin Resource Sharing (CORS) Tester</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The CORS Tester helps you test and troubleshoot cross-origin resource sharing (CORS) issues.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example Request:</h4>
        <pre class="bg-gray-100 p-2 rounded">
GET https://example.com/api
        </pre>
        <p class="text-lg mb-6">This request tests CORS headers and responses from the target API.</p>
      </div>
    </div>
    <div class="tool-form">
      <div class="form-group mb-4">
        <label for="requestMethod" class="block text-gray-700 text-sm font-bold mb-2">Request Method:</label>
        <select id="requestMethod" v-model="requestMethod" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <div class="form-group mb-4">
        <label for="requestUrl" class="block text-gray-700 text-sm font-bold mb-2">Request URL:</label>
        <input id="requestUrl" v-model="requestUrl" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="https://example.com/api"/>
      </div>
      <div class="form-group mb-4">
        <label for="requestHeaders" class="block text-gray-700 text-sm font-bold mb-2">Request Headers (JSON format):</label>
        <textarea id="requestHeaders" v-model="requestHeaders" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="4" placeholder='{"Content-Type": "application/json"}'></textarea>
      </div>
      <div v-if="requestMethod === 'POST' || requestMethod === 'PUT'" class="form-group mb-4">
        <label for="requestBody" class="block text-gray-700 text-sm font-bold mb-2">Request Body (JSON format):</label>
        <textarea id="requestBody" v-model="requestBody" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="4" placeholder='{"key": "value"}'></textarea>
      </div>
      <div class="tool-actions">
        <button @click="sendRequest" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="loading">
          <span v-if="loading" class="spinner-border"></span>
          <span v-else>Send Request</span>
        </button>
      </div>
    </div>
    <div v-if="responseHeaders" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Response Headers</h3>
      <pre class="bg-gray-100 p-2 rounded break-words">{{ responseHeaders }}</pre>
    </div>
    <div v-if="error" class="generated-info mt-4 text-red-500">
      <h3 class="text-2xl font-bold mb-2">Error</h3>
      <pre class="bg-gray-100 p-2 rounded break-words">{{ error }}</pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CorsTester',
  data() {
    return {
      requestMethod: 'GET',
      requestUrl: '',
      requestHeaders: '{}',
      requestBody: '{}',
      responseHeaders: '',
      error: '',
      loading: false,
    };
  },
  methods: {
    async sendRequest() {
      this.loading = true;
      this.responseHeaders = '';
      this.error = '';
      try {
        const config = {
          method: this.requestMethod,
          url: this.requestUrl,
          headers: JSON.parse(this.requestHeaders),
          withCredentials: true,
        };
        if (this.requestMethod === 'POST' || this.requestMethod === 'PUT') {
          config.data = JSON.parse(this.requestBody);
        }
        const res = await axios(config);
        this.responseHeaders = JSON.stringify(res.headers, null, 2);
      } catch (err) {
        this.error = err.response ? JSON.stringify(err.response.data, null, 2) : err.message;
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

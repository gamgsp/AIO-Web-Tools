<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">API Request Builder</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The API Request Builder helps you construct and send HTTP requests to APIs.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example API Request:</h4>
        <pre class="bg-gray-100 p-2 rounded">
GET https://jsonplaceholder.typicode.com/posts
        </pre>
        <p class="text-lg mb-6">This request retrieves a list of posts from the example API.</p>
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
        <input id="requestUrl" v-model="requestUrl" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="http://example.com/api"/>
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
        <button @click="sendRequest" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Send Request</button>
      </div>
    </div>
    <div v-if="responseData" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Response</h3>
      <pre class="bg-gray-100 p-2 rounded break-words">
        <ul>
          <li v-for="(item, index) in responseData" :key="index">
            <p><strong>User ID:</strong> {{ item.userId }}</p>
            <p><strong>ID:</strong> {{ item.id }}</p>
            <p><strong>Title:</strong> {{ item.title }}</p>
            <p><strong>Body:</strong> {{ item.body }}</p>
          </li>
        </ul>
      </pre>
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
  name: 'ApiRequestBuilder',
  data() {
    return {
      requestMethod: 'GET',
      requestUrl: '',
      requestHeaders: '{}',
      requestBody: '{}',
      responseData: [],
      error: '',
    };
  },
  methods: {
    async sendRequest() {
      this.responseData = [];
      this.error = '';
      try {
        const config = {
          method: this.requestMethod,
          url: this.requestUrl,
          headers: JSON.parse(this.requestHeaders),
        };
        if (this.requestMethod === 'POST' || this.requestMethod === 'PUT') {
          config.data = JSON.parse(this.requestBody);
        }
        const res = await axios(config);
        this.responseData = res.data;
      } catch (err) {
        this.error = err.response ? JSON.stringify(err.response.data, null, 2) : err.message;
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

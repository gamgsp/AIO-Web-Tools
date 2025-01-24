<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">API Response Tester</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The API Response Tester allows you to test and evaluate API responses by sending requests and displaying the results.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example Request:</h4>
        <pre class="bg-gray-100 p-2 rounded">
Request URL: https://jsonplaceholder.typicode.com/todos/1
Method: GET
Result: 
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
        </pre>
      </div>
    </div>
    <div class="tool-form mb-6">
      <form @submit.prevent="testApiResponse">
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
            <span v-else>Test API</span>
          </button>
        </div>
      </form>
    </div>
    <div v-if="result" class="mt-4">
      <h4 class="text-lg font-bold">Result:</h4>
      <pre class="bg-gray-100 p-2 rounded">{{ formattedResult }}</pre>
    </div>
    <p v-if="error" class="error text-red-500">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ApiResponseTester',
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
  computed: {
    formattedResult() {
      return this.result ? JSON.stringify(JSON.parse(this.result), null, 2) : '';
    }
  },
  methods: {
    async testApiResponse() {
      this.loading = true;
      this.error = '';
      this.result = null;

      try {
        const config = {
          method: this.method,
          url: this.url,
        };
        if (this.method !== 'GET' && this.body) {
          config.data = JSON.parse(this.body);
        }

        const response = await axios(config);
        this.result = JSON.stringify(response.data);
      } catch (error) {
        this.error = `Error: ${error.response ? error.response.data.message : error.message}`;
        console.error('API response error:', this.error);
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

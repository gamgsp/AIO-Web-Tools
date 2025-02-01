<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">JSON Path Tester</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The JSON Path Tester allows you to test and evaluate JSONPath expressions against JSON data.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example JSON:</h4>
        <pre class="bg-gray-100 p-2 rounded">
{
  "store": {
    "book": [
      { "category": "fiction", "author": "J.K. Rowling", "title": "Harry Potter", "price": 8.95 },
      { "category": "fiction", "author": "George R.R. Martin", "title": "Game of Thrones", "price": 12.99 },
      { "category": "fiction", "author": "J.R.R. Tolkien", "title": "The Hobbit", "price": 10.29 }
    ],
    "bicycle": { "color": "red", "price": 19.95 }
  }
}
        </pre>
      </div>
    </div>
    <div class="tool-form mb-6">
      <form @submit.prevent="evaluateJSONPath">
        <div class="form-group mb-4">
          <label for="jsonData" class="block text-gray-700 text-sm font-bold mb-2">JSON Data:</label>
          <textarea id="jsonData" v-model="jsonData" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="10"></textarea>
        </div>
        <div class="form-group mb-4">
          <label for="jsonPath" class="block text-gray-700 text-sm font-bold mb-2">JSONPath Expression:</label>
          <input id="jsonPath" v-model="jsonPath" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="loading">
            <span v-if="loading" class="spinner-border"></span>
            <span v-else>Evaluate</span>
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
  name: 'JSONPathTester',
  data() {
    return {
      jsonData: '',
      jsonPath: '',
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
    async evaluateJSONPath() {
      this.loading = true;
      this.error = '';
      this.result = null;

      try {
        const protocol = window.location.protocol;
        const host = window.location.hostname;
        const port = 5000;

        // Construct the API URL with the correct port
        const apiUrl = `${protocol}//${host}:${port}/api/evaluate-jsonpath`;

        const response = await axios.post(apiUrl, {
          jsonData: this.jsonData,
          jsonPath: this.jsonPath,
        });
        this.result = JSON.stringify(response.data);
      } catch (error) {
        this.error = `Error: ${error.response ? error.response.data.message : error.message}`;
        console.error('Evaluation error:', this.error);
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

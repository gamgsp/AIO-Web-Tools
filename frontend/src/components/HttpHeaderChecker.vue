<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">HTTP Header Checker</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The HTTP Header Checker tool allows you to retrieve the HTTP headers for a given URL. This information includes various headers such as content-type, cache-control, and more.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Check HTTP Headers:</h4>
        <p class="text-lg mb-6">Enter the URL like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
https://example.com
        </pre>
        <p class="text-lg mb-6">Click "Check" to retrieve the HTTP headers:</p>
        <pre class="bg-gray-100 p-2 rounded">
Content-Type: text/html; charset=UTF-8
Cache-Control: max-age=3600
Server: Apache
        </pre>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="performCheck">
        <div class="form-group mb-4">
          <label for="url" class="block text-gray-700 text-sm font-bold mb-2">URL:</label>
          <input id="url" v-model="url" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter URL">
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span v-else>Check</span>
          </button>
        </div>
      </form>
    </div>
    <div v-if="result || error" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2 text-center">HTTP Headers</h3>
      <div v-if="result" class="table-wrapper">
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th class="px-4 py-2">Header</th>
              <th class="px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, key) in result" :key="key">
              <td class="border px-4 py-2 font-bold">{{ key }}</td>
              <td class="border px-4 py-2 break-words">{{ value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="error text-red-500" v-else>No headers found for this URL.</p>
    </div>
    <div v-if="error" class="error text-red-500 mt-4">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HttpHeaderChecker',
  data() {
    return {
      url: '',
      result: null,
      error: null,
      loading: false,
    };
  },
  methods: {
    async performCheck() {
      if (!this.url) {
        this.error = 'Please enter a valid URL.';
        return;
      }
      this.loading = true;
      this.error = null;
      this.result = null;
      try {
        const protocol = window.location.protocol;
        const host = window.location.hostname;
        const port = 5000;

        // Construct the API URL with the correct port
        const apiUrl = `${protocol}//${host}:${port}/httpheaders?url=${encodeURIComponent(this.url)}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.result = data;
        if (!this.result || Object.keys(this.result).length === 0) {
          this.error = 'No headers found for this URL.';
        }
      } catch (error) {
        this.error = 'Failed to perform header check';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>

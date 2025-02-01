<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Broken Link Checker</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Broken Link Checker tool helps you identify and fix broken links on your website.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example URL:</h4>
        <pre class="bg-gray-100 p-2 rounded">
https://www.example.com
        </pre>
        <p class="text-lg mb-6">Enter a URL to check for broken links.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="checkLinks">
        <div class="form-group mb-4">
          <label for="url" class="block text-gray-700 text-sm font-bold mb-2">URL:</label>
          <input id="url" v-model="url" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter URL..."/>
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="loading">
            <span v-if="loading" class="spinner-border"></span>
            <span v-else>Check Links</span>
          </button>
        </div>
      </form>
    </div>
    <div v-if="results || error" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Broken Links</h3>
      <ul v-if="results" class="list-disc pl-6">
        <li v-for="result in results" :key="result.url" class="text-red-500">
          <a :href="result.url" target="_blank">{{ result.url }}</a> - {{ result.status }}
        </li>
      </ul>
      <p v-if="error" class="error text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BrokenLinkChecker',
  data() {
    return {
      url: '',
      results: null,
      error: '',
      loading: false,
    };
  },
  methods: {
    async checkLinks() {
      this.loading = true;
      this.error = '';
      this.results = null;
      try {
        // Detect current protocol and host
        const protocol = window.location.protocol;
        const host = window.location.hostname;
        const port = 5000;

        // Construct the API URL with the correct port
        const apiUrl = `${protocol}//${host}:${port}/api/check-links`;
        const response = await axios.post(apiUrl, { url: this.url });

        this.results = response.data.brokenLinks;
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
</style>

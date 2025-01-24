<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Website Uptime Checker</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Website Uptime Checker helps you monitor the availability and performance of your website.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example URL:</h4>
        <pre class="bg-gray-100 p-2 rounded">
https://www.example.com
        </pre>
        <p class="text-lg mb-6">Enter a URL to check its uptime and response time.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="checkUptime">
        <div class="form-group mb-4">
          <label for="url" class="block text-gray-700 text-sm font-bold mb-2">URL:</label>
          <input id="url" v-model="url" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter URL..."/>
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="loading">
            <span v-if="loading" class="spinner-border"></span>
            <span v-else>Check Uptime</span>
          </button>
        </div>
      </form>
    </div>
    <div v-if="result || error" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Uptime Status</h3>
      <div v-if="result" class="result">
        <p><strong>Status:</strong> {{ result.status }}</p>
        <p><strong>Response Time:</strong> {{ result.responseTime }} ms</p>
      </div>
      <p v-if="error" class="error text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'WebsiteUptimeChecker',
  data() {
    return {
      url: '',
      result: null,
      error: '',
      loading: false,
    };
  },
  methods: {
    async checkUptime() {
      this.loading = true;
      this.error = '';
      this.result = null;
      try {
        const response = await axios.post('http://localhost:5000/api/check-uptime', { url: this.url });
        this.result = response.data;
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

<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">URL Validator</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The URL Validator tool helps you validate the syntax and format of URLs to ensure they are properly structured.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Validate URL:</h4>
        <p class="text-lg mb-6">Enter your URL like this:</p>
        <pre class="bg-gray-100 p-2 rounded">https://www.example.com</pre>
        <p class="text-lg mb-6">Click "Validate" to get the validation results.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="validateUrls">
        <div class="form-group mb-4">
          <label for="urls" class="block text-gray-700 text-sm font-bold mb-2">URLs:</label>
          <textarea id="urls" v-model="urls" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" placeholder="Enter URLs here (one per line)..."></textarea>
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span v-else>Validate</span>
          </button>
        </div>
      </form>
    </div>
    <div v-if="result || error" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Validation Results</h3>
      <pre class="bg-gray-100 p-2 rounded" v-if="result">{{ result }}</pre>
      <p class="error text-red-500" v-else>{{ error }}</p>
    </div>
  </div>
</template>

<script>
import validator from 'validator';

export default {
  name: 'UrlValidator',
  data() {
    return {
      urls: '',
      result: null,
      error: null,
      loading: false,
    };
  },
  methods: {
    validateUrls() {
      if (!this.urls) {
        this.error = 'Please enter at least one URL.';
        return;
      }
      this.loading = true;
      this.error = null;
      this.result = null;
      try {
        const urlList = this.urls.split('\n').map(url => url.trim()).filter(url => url.length > 0);
        const results = urlList.map(url => {
          return `${url}: ${validator.isURL(url) ? 'Valid' : 'Invalid'}`;
        });
        this.result = results.join('\n');
      } catch (error) {
        this.error = `Failed to validate URLs: ${error.message}`;
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

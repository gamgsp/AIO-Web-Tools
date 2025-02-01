<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Critical Path CSS Generator</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Critical Path CSS Generator helps you optimize the initial loading time of web pages by extracting the CSS required for rendering the above-the-fold content. Simply enter the URL and generate the critical CSS.
    </p>
    <div class="tool-example mb-6">
      <p class="text-lg mb-4"><strong>Usage Example:</strong></p>
      <div class="example-section mb-4">
        <h4 class="text-lg font-bold mb-2">Example 1:</h4>
        <p class="bg-gray-100 p-2 rounded">URL: http://example.com<br>Critical CSS: <code>/* CSS content */</code></p>
      </div>
    </div>
    <div class="tool-form">
      <div class="form-group mb-4">
        <label for="url" class="block text-gray-700 text-sm font-bold mb-2">URL:</label>
        <input id="url" v-model="url" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="http://example.com"/>
      </div>
      <div class="tool-actions">
        <button @click="generateCriticalCSS" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate Critical CSS</button>
      </div>
    </div>
    <div v-if="result" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Generated Critical CSS</h3>
      <pre class="bg-gray-100 p-2 rounded break-words">{{ result.criticalCSS }}</pre>
    </div>
    <div v-if="error" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Error</h3>
      <p class="bg-red-100 p-2 rounded text-red-700">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  name: 'CriticalPathCSSGenerator',
  setup() {
    const url = ref('');
    const result = ref(null);
    const error = ref(null);

    const generateCriticalCSS = async () => {
      try {
        // Detect current protocol and host
        const protocol = window.location.protocol;
        const host = window.location.hostname;
        const port = 5000;

        // Construct the API URL with the correct port
        const apiUrl = `${protocol}//${host}:${port}/generate-critical-css`;
        const response = await axios.post(apiUrl, { url: url.value });

        result.value = response.data;
        error.value = null;
      } catch (err) {
        error.value = err.response?.data?.error || 'An error occurred while generating the critical CSS.';
        result.value = null;
      }
    };

    return {
      url,
      result,
      error,
      generateCriticalCSS
    };
  }
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';

.bg-red-100 {
  background-color: #ffe6e6;
}

.text-red-700 {
  color: #d21c1c;
}
</style>

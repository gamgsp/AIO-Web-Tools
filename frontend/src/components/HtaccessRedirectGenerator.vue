<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">htaccess Redirect Generator</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The htaccess Redirect Generator helps you create redirect rules for your .htaccess file.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example Redirect Rule:</h4>
        <pre class="bg-gray-100 p-2 rounded">
Redirect 301 /old-page.html /new-page.html
        </pre>
        <p class="text-lg mb-6">This rule redirects requests from /old-page.html to /new-page.html with a 301 status code (permanent redirect).</p>
      </div>
    </div>
    <div class="tool-form">
      <div class="form-group mb-4">
        <label for="sourceUrl" class="block text-gray-700 text-sm font-bold mb-2">Source URL:</label>
        <input id="sourceUrl" v-model="sourceUrl" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="/old-page.html"/>
      </div>
      <div class="form-group mb-4">
        <label for="targetUrl" class="block text-gray-700 text-sm font-bold mb-2">Target URL:</label>
        <input id="targetUrl" v-model="targetUrl" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="/new-page.html"/>
      </div>
      <div class="form-group mb-4">
        <label for="redirectType" class="block text-gray-700 text-sm font-bold mb-2">Redirect Type:</label>
        <select id="redirectType" v-model="redirectType" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="301">301 (Permanent)</option>
          <option value="302">302 (Temporary)</option>
        </select>
      </div>
      <div class="tool-actions">
        <button @click="generateRedirect" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate Redirect Rule</button>
      </div>
    </div>
    <div v-if="redirectRule" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Generated Redirect Rule</h3>
      <pre class="bg-gray-100 p-2 rounded break-words">{{ redirectRule }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HtaccessRedirectGenerator',
  data() {
    return {
      sourceUrl: '',
      targetUrl: '',
      redirectType: '301',
      redirectRule: '',
    };
  },
  methods: {
    generateRedirect() {
      this.redirectRule = `Redirect ${this.redirectType} ${this.sourceUrl} ${this.targetUrl}`;
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

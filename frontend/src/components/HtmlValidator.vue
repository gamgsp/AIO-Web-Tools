<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">HTML Validator</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The HTML Validator tool helps you validate your HTML code to ensure it adheres to web standards and is free of errors.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Validate HTML:</h4>
        <p class="text-lg mb-6">Enter your HTML code like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Example&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Hello, World!&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;
        </pre>
        <p class="text-lg mb-6">Click "Validate" to get the validation results.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="validateHtml">
        <div class="form-group mb-4">
          <label for="htmlCode" class="block text-gray-700 text-sm font-bold mb-2">HTML Code:</label>
          <textarea id="htmlCode" v-model="htmlCode" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" placeholder="Enter HTML code here..."></textarea>
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
      <pre class="bg-gray-100 p-2 rounded" v-if="result"><code v-html="result"></code></pre>
      <p class="error text-red-500" v-else>{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HtmlValidator',
  data() {
    return {
      htmlCode: '',
      result: null,
      error: null,
      loading: false,
    };
  },
  methods: {
    async validateHtml() {
      if (!this.htmlCode) {
        this.error = 'Please enter some HTML code.';
        return;
      }
      this.loading = true;
      this.error = null;
      this.result = null;
      try {
        // Detect current protocol and host
        const protocol = window.location.protocol;
        const host = window.location.hostname;
        const port = 5000;

        // Construct the API URL with the correct port
        const apiUrl = `${protocol}//${host}:${port}/htmlvalidator`;

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ html: this.htmlCode }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.result = data.result;
      } catch (error) {
        this.error = 'Failed to validate HTML';
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

<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Accessibility Checker (WCAG Compliance)</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Accessibility Checker tool helps you ensure your web content adheres to the Web Content Accessibility Guidelines (WCAG) standards, making it accessible to people with disabilities.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Check Accessibility:</h4>
        <p class="text-lg mb-6">Enter your HTML content like this:</p>
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
    &lt;p&gt;This is a sample paragraph.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;
        </pre>
        <p class="text-lg mb-6">Click "Check" to get the accessibility check results.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="checkAccessibility">
        <div class="form-group mb-4">
          <label for="htmlContent" class="block text-gray-700 text-sm font-bold mb-2">HTML Content:</label>
          <textarea id="htmlContent" v-model="htmlContent" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" placeholder="Enter HTML content here..."></textarea>
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
      <h3 class="text-2xl font-bold mb-2">Accessibility Check Results</h3>
      <pre class="bg-gray-100 p-2 rounded" v-if="result">{{ result }}</pre>
      <p class="error text-red-500" v-else>{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axe from 'axe-core';

export default {
  name: 'AccessibilityChecker',
  data() {
    return {
      htmlContent: '',
      result: null,
      error: null,
      loading: false,
    };
  },
  methods: {
    checkAccessibility() {
      if (!this.htmlContent) {
        this.error = 'Please enter some HTML content.';
        return;
      }
      this.loading = true;
      this.error = null;
      this.result = null;
      try {
        const iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        iframe.contentDocument.open();
        iframe.contentDocument.write(this.htmlContent);
        iframe.contentDocument.close();

        axe.run(iframe.contentDocument, (err, results) => {
          if (err) {
            this.error = `Failed to check accessibility: ${err.message}`;
          } else {
            this.result = results.violations.map(violation => {
              return `${violation.help}: ${violation.description}\n${violation.nodes.map(node => `- ${node.target}`).join('\n')}`;
            }).join('\n\n');
          }
          document.body.removeChild(iframe);
          this.loading = false;
        });
      } catch (error) {
        this.error = `Failed to check accessibility: ${error.message}`;
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>

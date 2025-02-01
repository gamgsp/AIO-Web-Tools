<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">CSS Validator</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The CSS Validator tool helps you validate your CSS code to ensure it adheres to web standards and is free of errors.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Validate CSS:</h4>
        <p class="text-lg mb-6">Enter your CSS code like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
body {
  font-family: Arial, sans-serif;
  color: #333;
}
h1 {
  color: #007bff;
}
        </pre>
        <p class="text-lg mb-6">Click "Validate" to get the validation results.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="validateCss">
        <div class="form-group mb-4">
          <label for="cssCode" class="block text-gray-700 text-sm font-bold mb-2">CSS Code:</label>
          <textarea id="cssCode" v-model="cssCode" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" placeholder="Enter CSS code here..."></textarea>
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
      <pre class="bg-gray-100 p-2 rounded" v-if="result">{{ formattedResult }}</pre>
      <p class="error text-red-500" v-else>{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CssValidator',
  data() {
    return {
      cssCode: '',
      result: null,
      error: null,
      loading: false,
    };
  },
  computed: {
    formattedResult() {
      if (!this.result) return '';
      const validation = JSON.parse(this.result);
      let output = `Validity: ${validation.validity}\n`;
      if (validation.errors.length) {
        output += '\nErrors:\n';
        validation.errors.forEach((error, index) => {
          output += `\n${index + 1}. Line ${error.line}, Column ${error.col}: ${error.message}`;
        });
      }
      if (validation.warnings.length) {
        output += '\n\nWarnings:\n';
        validation.warnings.forEach((warning, index) => {
          output += `\n${index + 1}. Line ${warning.line}, Column ${warning.col}: ${warning.message}`;
        });
      }
      return output || 'No validation issues found.';
    },
  },
  methods: {
    async validateCss() {
      if (!this.cssCode) {
        this.error = 'Please enter some CSS code.';
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
        const apiUrl = `${protocol}//${host}:${port}/cssvalidator`;

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ css: this.cssCode }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.result = data.result;
      } catch (error) {
        this.error = 'Failed to validate CSS';
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

<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">JavaScript Code Validator</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The JavaScript Code Validator tool helps you validate your JavaScript code to ensure it adheres to correct syntax and best practices.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Validate JavaScript:</h4>
        <p class="text-lg mb-6">Enter your JavaScript code like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet('World'));
        </pre>
        <p class="text-lg mb-6">Click "Validate" to get the validation results.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="validateJavascript">
        <div class="form-group mb-4">
          <label for="javascriptCode" class="block text-gray-700 text-sm font-bold mb-2">JavaScript Code:</label>
          <textarea id="javascriptCode" v-model="javascriptCode" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" placeholder="Enter JavaScript code here..."></textarea>
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
import * as esprima from 'esprima';

export default {
  name: 'JavascriptValidator',
  data() {
    return {
      javascriptCode: '',
      result: null,
      error: null,
      loading: false,
    };
  },
  computed: {
    formattedResult() {
      if (!this.result) return '';
      const errors = this.result.errors;
      let output = `Validity: ${errors.length === 0}\n`;
      if (errors.length) {
        output += '\nErrors:\n';
        errors.forEach((error, index) => {
          if (error) {
            output += `\n${index + 1}. Line ${error.lineNumber}, Column ${error.index}: ${error.description}`;
          }
        });
      }
      return output || 'No validation issues found.';
    },
  },
  methods: {
    validateJavascript() {
      if (!this.javascriptCode) {
        this.error = 'Please enter some JavaScript code.';
        return;
      }
      this.loading = true;
      this.error = null;
      this.result = null;
      try {
        const lintResult = esprima.parseScript(this.javascriptCode, { tolerant: true });
        this.result = { errors: lintResult.errors || [] };
      } catch (error) {
        this.error = `Failed to validate JavaScript: ${error.message}`;
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

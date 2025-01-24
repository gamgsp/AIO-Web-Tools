<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">CSS Minifier/Unminifier</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The CSS Minifier/Unminifier tool helps you minify (compress) and unminify (expand) your CSS code.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Original CSS:</h4>
        <pre class="bg-gray-100 p-2 rounded">
body {
  font-size: 16px;
  background-color: #f0f0f0;
}
h1 {
  color: #333;
}
        </pre>
        <p class="text-lg mb-6">Click "Minify" to compress the CSS code, or "Beautify" to expand minified CSS code.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="processCss">
        <div class="form-group mb-4">
          <label for="cssCode" class="block text-gray-700 text-sm font-bold mb-2">CSS Code:</label>
          <textarea id="cssCode" v-model="cssCode" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" placeholder="Enter CSS code here..."></textarea>
        </div>
        <div class="tool-actions">
          <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="minifyCss" :disabled="loading">
            Minify
          </button>
          <button type="button" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2" @click="beautifyCss" :disabled="loading">
            Beautify
          </button>
        </div>
      </form>
    </div>
    <div v-if="result || error" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Processed CSS</h3>
      <pre v-if="result" class="bg-gray-100 p-2 rounded">{{ result }}</pre>
      <p v-if="error" class="error text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { css as beautifyCss } from 'js-beautify';

export default {
  name: 'CssMinifier',
  data() {
    return {
      cssCode: '',
      result: '',
      error: '',
      loading: false,
    };
  },
  methods: {
    minifyCss() {
      this.loading = true;
      this.error = '';
      try {
        // Simplified minify method for debugging
        this.result = this.cssCode
          .replace(/\s+/g, ' ')  // Remove extra whitespace
          .replace(/\/\*[\s\S]*?\*\//g, '')  // Remove comments
          .replace(/\s*([{}:;,])\s*/g, '$1');  // Remove spaces around {},:,;, etc.
      } catch (error) {
        this.error = `Error: ${error.message}`;
      } finally {
        this.loading = false;
      }
    },
    beautifyCss() {
      this.loading = true;
      this.error = '';
      try {
        this.result = beautifyCss(this.cssCode);
      } catch (error) {
        this.error = `Error: ${error.message}`;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
@import '@/assets/toolstyles.css'; /* This imports your default CSS */
</style>

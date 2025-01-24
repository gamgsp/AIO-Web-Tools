<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">JavaScript Formatter</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The JavaScript Formatter tool helps you format and beautify your JavaScript code.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Original JavaScript:</h4>
        <pre class="bg-gray-100 p-2 rounded">
function greet() {console.log('Hello, world!');}
greet();
        </pre>
        <p class="text-lg mb-6">Click "Beautify" to format the JavaScript code.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="processJs">
        <div class="form-group mb-4">
          <label for="jsCode" class="block text-gray-700 text-sm font-bold mb-2">JavaScript Code:</label>
          <textarea id="jsCode" v-model="jsCode" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" placeholder="Enter JavaScript code here..."></textarea>
        </div>
        <div class="tool-actions">
          <button type="button" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="beautifyJs" :disabled="loading">
            Beautify
          </button>
        </div>
      </form>
    </div>
    <div v-if="result || error" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Formatted JavaScript</h3>
      <pre v-if="result" class="bg-gray-100 p-2 rounded">{{ result }}</pre>
      <p v-if="error" class="error text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { js as beautifyJs } from 'js-beautify';

export default {
  name: 'JsFormatter',
  data() {
    return {
      jsCode: '',
      result: '',
      error: '',
      loading: false,
    };
  },
  methods: {
    beautifyJs() {
      this.loading = true;
      this.error = '';
      try {
        this.result = beautifyJs(this.jsCode);
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

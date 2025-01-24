<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">PHP Formatter</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The PHP Formatter tool helps you format and beautify your PHP code.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Original PHP:</h4>
        <pre class="bg-gray-100 p-2 rounded">
&lt;?php
echo 'Hello, world!';
?&gt;
        </pre>
        <p class="text-lg mb-6">Click "Beautify" to format the PHP code.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="processPhp">
        <div class="form-group mb-4">
          <label for="phpCode" class="block text-gray-700 text-sm font-bold mb-2">PHP Code:</label>
          <textarea id="phpCode" v-model="phpCode" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" placeholder="Enter PHP code here..."></textarea>
        </div>
        <div class="tool-actions">
          <button type="button" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="beautifyPhp" :disabled="loading">
            Beautify
          </button>
        </div>
      </form>
    </div>
    <div v-if="result || error" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Formatted PHP</h3>
      <pre v-if="result" class="bg-gray-100 p-2 rounded">{{ result }}</pre>
      <p v-if="error" class="error text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import prettier from 'prettier';
import phpPlugin from '@prettier/plugin-php';

export default {
  name: 'PhpFormatter',
  data() {
    return {
      phpCode: '',
      result: '',
      error: '',
      loading: false,
    };
  },
  methods: {
    async beautifyPhp() {
      this.loading = true;
      this.error = '';
      try {
        this.result = await prettier.format(this.phpCode, { plugins: [phpPlugin], parser: 'php' });
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

<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">SQL Formatter</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The SQL Formatter tool helps you format and beautify your SQL code.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Original SQL:</h4>
        <pre class="bg-gray-100 p-2 rounded">
SELECT * FROM users WHERE age &gt; 25 ORDER BY age DESC;
        </pre>
        <p class="text-lg mb-6">Click "Beautify" to format the SQL code.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="processSql">
        <div class="form-group mb-4">
          <label for="sqlCode" class="block text-gray-700 text-sm font-bold mb-2">SQL Code:</label>
          <textarea id="sqlCode" v-model="sqlCode" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" placeholder="Enter SQL code here..."></textarea>
        </div>
        <div class="tool-actions">
          <button type="button" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="beautifySql" :disabled="loading">
            Beautify
          </button>
        </div>
      </form>
    </div>
    <div v-if="result || error" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Formatted SQL</h3>
      <pre v-if="result" class="bg-gray-100 p-2 rounded">{{ result }}</pre>
      <p v-if="error" class="error text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { format } from 'sql-formatter';

export default {
  name: 'SqlFormatter',
  data() {
    return {
      sqlCode: '',
      result: '',
      error: '',
      loading: false,
    };
  },
  methods: {
    beautifySql() {
      this.loading = true;
      this.error = '';
      try {
        this.result = format(this.sqlCode);
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

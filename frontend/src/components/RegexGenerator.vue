<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Regular Expression (Regex) Generator</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Regular Expression (Regex) Generator helps you generate regular expressions based on given patterns and criteria.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example Criteria:</h4>
        <pre class="bg-gray-100 p-2 rounded">
Criteria: Match any email address
Result: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        </pre>
      </div>
    </div>
    <div class="tool-form mb-6">
      <form @submit.prevent="generateRegex">
        <div class="form-group mb-4">
          <label for="criteria" class="block text-gray-700 text-sm font-bold mb-2">Criteria:</label>
          <input id="criteria" v-model="criteria" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="loading">
            <span v-if="loading" class="spinner-border"></span>
            <span v-else>Generate Regex</span>
          </button>
        </div>
      </form>
    </div>
    <div v-if="result" class="mt-4">
      <h4 class="text-lg font-bold">Generated Regex:</h4>
      <pre class="bg-gray-100 p-2 rounded">{{ result }}</pre>
    </div>
    <p v-if="error" class="error text-red-500">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegexGenerator',
  data() {
    return {
      criteria: '',
      result: null,
      error: '',
      loading: false,
    };
  },
  methods: {
    async generateRegex() {
      this.loading = true;
      this.error = '';
      this.result = null;

      try {
        const response = await axios.post('http://localhost:5000/api/generate-regex', {
          criteria: this.criteria,
        });
        this.result = response.data;
      } catch (error) {
        this.error = `Error: ${error.response ? error.response.data.message : error.message}`;
        console.error('Generation error:', this.error);
      } finally {
        this.loading = false;
      }
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

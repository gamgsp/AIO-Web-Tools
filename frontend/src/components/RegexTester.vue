<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Regular Expression (Regex) Tester</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Regular Expression (Regex) Tester allows you to test and evaluate regular expressions against input strings.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example Input:</h4>
        <pre class="bg-gray-100 p-2 rounded">
Input String: "The quick brown fox jumps over the lazy dog"
Regular Expression: "\b\w{5}\b"
Result: ["quick", "brown", "jumps"]
        </pre>
      </div>
    </div>
    <div class="tool-form mb-6">
      <form @submit.prevent="testRegex">
        <div class="form-group mb-4">
          <label for="inputString" class="block text-gray-700 text-sm font-bold mb-2">Input String:</label>
          <textarea id="inputString" v-model="inputString" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="4"></textarea>
        </div>
        <div class="form-group mb-4">
          <label for="regex" class="block text-gray-700 text-sm font-bold mb-2">Regular Expression:</label>
          <input id="regex" v-model="regex" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="loading">
            <span v-if="loading" class="spinner-border"></span>
            <span v-else>Test Regex</span>
          </button>
        </div>
      </form>
    </div>
    <div v-if="result" class="mt-4">
      <h4 class="text-lg font-bold">Result:</h4>
      <pre class="bg-gray-100 p-2 rounded">{{ result }}</pre>
    </div>
    <p v-if="error" class="error text-red-500">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegexTester',
  data() {
    return {
      inputString: '',
      regex: '',
      result: null,
      error: '',
      loading: false,
    };
  },
  methods: {
    async testRegex() {
      this.loading = true;
      this.error = '';
      this.result = null;

      try {
        const response = await axios.post('http://localhost:5000/api/test-regex', {
          inputString: this.inputString,
          regex: this.regex,
        });
        this.result = JSON.stringify(response.data, null, 2);
      } catch (error) {
        this.error = `Error: ${error.response ? error.response.data.message : error.message}`;
        console.error('Evaluation error:', this.error);
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

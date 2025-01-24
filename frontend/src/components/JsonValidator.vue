<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">JSON Validator</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The JSON Validator tool helps you validate your JSON code to ensure it adheres to the correct syntax and structure.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Validate JSON:</h4>
        <p class="text-lg mb-6">Enter your JSON code like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
{
  "name": "John Doe",
  "age": 30,
  "city": "New York"
}
        </pre>
        <p class="text-lg mb-6">Click "Validate" to get the validation results.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="validateJson">
        <div class="form-group mb-4">
          <label for="jsonCode" class="block text-gray-700 text-sm font-bold mb-2">JSON Code:</label>
          <textarea id="jsonCode" v-model="jsonCode" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" placeholder="Enter JSON code here..."></textarea>
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
      <pre class="bg-gray-100 p-2 rounded" v-if="result">{{ result }}</pre>
      <p class="error text-red-500" v-else>{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JsonValidator',
  data() {
    return {
      jsonCode: '',
      result: null,
      error: null,
      loading: false,
    };
  },
  methods: {
    validateJson() {
      if (!this.jsonCode) {
        this.error = 'Please enter some JSON code.';
        return;
      }
      this.loading = true;
      this.error = null;
      this.result = null;
      try {
        JSON.parse(this.jsonCode);
        this.result = 'The JSON code is valid.';
      } catch (error) {
        this.result = null;
        this.error = `Invalid JSON: ${error.message}`;
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

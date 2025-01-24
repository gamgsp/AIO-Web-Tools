<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Schema Markup Validator</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Schema Markup Validator tool helps you validate your schema markup (structured data) to ensure it adheres to the correct syntax and structure.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Validate Schema Markup:</h4>
        <p class="text-lg mb-6">Enter your schema markup like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "John Doe",
  "jobTitle": "Software Engineer",
  "url": "http://www.example.com"
}
        </pre>
        <p class="text-lg mb-6">Click "Validate" to get the validation results.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="validateSchema">
        <div class="form-group mb-4">
          <label for="schema" class="block text-gray-700 text-sm font-bold mb-2">Schema Markup:</label>
          <textarea id="schema" v-model="schema" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" placeholder="Enter schema markup here..."></textarea>
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
import Ajv from 'ajv';

export default {
  name: 'SchemaValidator',
  data() {
    return {
      schema: '',
      result: null,
      error: null,
      loading: false,
    };
  },
  methods: {
    validateSchema() {
      if (!this.schema) {
        this.error = 'Please enter some schema markup.';
        return;
      }
      this.loading = true;
      this.error = null;
      this.result = null;
      try {
        const ajv = new Ajv();
        const validate = ajv.compile({});
        const valid = validate(JSON.parse(this.schema));
        if (valid) {
          this.result = 'The schema markup is valid.';
        } else {
          this.result = `Invalid schema markup: ${validate.errors.map(err => `${err.message}`).join(', ')}`;
        }
      } catch (error) {
        this.error = `Failed to validate schema: ${error.message}`;
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

<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">XML Validator</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The XML Validator tool helps you validate your XML code to ensure it adheres to the correct syntax and structure.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Validate XML:</h4>
        <p class="text-lg mb-6">Enter your XML code like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
&lt;note&gt;
  &lt;to&gt;Tove&lt;/to&gt;
  &lt;from&gt;Jani&lt;/from&gt;
  &lt;heading&gt;Reminder&lt;/heading&gt;
  &lt;body&gt;Don't forget me this weekend!&lt;/body&gt;
&lt;/note&gt;
        </pre>
        <p class="text-lg mb-6">Click "Validate" to get the validation results.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="validateXml">
        <div class="form-group mb-4">
          <label for="xmlCode" class="block text-gray-700 text-sm font-bold mb-2">XML Code:</label>
          <textarea id="xmlCode" v-model="xmlCode" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" placeholder="Enter XML code here..."></textarea>
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
import { XMLValidator } from 'fast-xml-parser';

export default {
  name: 'XmlValidator',
  data() {
    return {
      xmlCode: '',
      result: null,
      error: null,
      loading: false,
    };
  },
  methods: {
    validateXml() {
      if (!this.xmlCode) {
        this.error = 'Please enter some XML code.';
        return;
      }
      this.loading = true;
      this.error = null;
      this.result = null;
      try {
        const validationResult = XMLValidator.validate(this.xmlCode);
        if (validationResult === true) {
          this.result = 'The XML code is valid.';
        } else {
          this.result = `Invalid XML: ${validationResult.err.msg}`;
        }
      } catch (error) {
        this.error = `Failed to validate XML: ${error.message}`;
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

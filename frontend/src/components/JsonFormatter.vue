<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">JSON Minifier/Prettifier</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The JSON Minifier/Prettifier tool helps you minify (compress) and prettify (format) your JSON code.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Original JSON:</h4>
        <pre class="bg-gray-100 p-2 rounded">
{
  "name": "John Doe",
  "age": 30,
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "state": "CA"
  }
}
        </pre>
        <p class="text-lg mb-6">Click "Minify" to compress the JSON code, or "Prettify" to format the JSON code.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="processJson">
        <div class="form-group mb-4">
          <label for="jsonCode" class="block text-gray-700 text-sm font-bold mb-2">JSON Code:</label>
          <textarea id="jsonCode" v-model="jsonCode" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" placeholder="Enter JSON code here..."></textarea>
        </div>
        <div class="tool-actions">
          <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="minifyJson" :disabled="loading">
            Minify
          </button>
          <button type="button" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2" @click="prettifyJson" :disabled="loading">
            Prettify
          </button>
        </div>
      </form>
    </div>
    <div v-if="result || error" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Processed JSON</h3>
      <pre v-if="result" class="bg-gray-100 p-2 rounded">{{ result }}</pre>
      <p v-if="error" class="error text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JsonFormatter',
  data() {
    return {
      jsonCode: '',
      result: '',
      error: '',
      loading: false,
    };
  },
  methods: {
    minifyJson() {
      this.loading = true;
      this.error = '';
      try {
        const parsedJson = JSON.parse(this.jsonCode);
        this.result = JSON.stringify(parsedJson);
      } catch (error) {
        this.error = `Error: ${error.message}`;
      } finally {
        this.loading = false;
      }
    },
    prettifyJson() {
      this.loading = true;
      this.error = '';
      try {
        const parsedJson = JSON.parse(this.jsonCode);
        this.result = JSON.stringify(parsedJson, null, 2);
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

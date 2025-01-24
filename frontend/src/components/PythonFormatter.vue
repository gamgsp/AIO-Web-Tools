<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Python Formatter</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Python Formatter tool helps you format and beautify your Python code.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Original Python:</h4>
        <pre class="bg-gray-100 p-2 rounded">
def greet():
    print('Hello, world!')
greet()
        </pre>
        <p class="text-lg mb-6">Click "Beautify" to format the Python code.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="processPython">
        <div class="form-group mb-4">
          <label for="pythonCode" class="block text-gray-700 text-sm font-bold mb-2">Python Code:</label>
          <textarea id="pythonCode" v-model="pythonCode" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" placeholder="Enter Python code here..."></textarea>
        </div>
        <div class="tool-actions">
          <button type="button" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="beautifyPython" :disabled="loading">
            Beautify
          </button>
        </div>
      </form>
    </div>
    <div v-if="result || error" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Formatted Python</h3>
      <pre v-if="result" class="bg-gray-100 p-2 rounded">{{ result }}</pre>
      <p v-if="error" class="error text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PythonFormatter',
  data() {
    return {
      pythonCode: '',
      result: '',
      error: '',
      loading: false,
    };
  },
  methods: {
    beautifyPython() {
      this.loading = true;
      this.error = '';
      try {
        const formattedCode = this.pythonCode
          .replace(/^\s+/gm, '')  // Remove leading whitespace
          .replace(/(\S)(\s*\n\s*)(\S)/gm, '$1\n    $3');  // Indent lines
        this.result = formattedCode;
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

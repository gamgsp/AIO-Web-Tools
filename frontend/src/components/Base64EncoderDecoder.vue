<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Base64 Encoder / Decoder</h2>
    <p class="text-lg mb-6">This tool allows you to encode and decode Base64 data. Simply paste your text into the input box, then click the appropriate button to encode or decode the data.</p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Encode Text:</h4>
        <p class="text-lg mb-6">Enter your text like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
Hello, World!
        </pre>
        <p class="text-lg mb-6">Click "Encode" to get the following Base64 encoded data:</p>
        <pre class="bg-gray-100 p-2 rounded">
SGVsbG8sIFdvcmxkIQ==
        </pre>
      </div>
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Decode Base64:</h4>
        <p class="text-lg mb-6">Enter your Base64 data like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
SGVsbG8sIFdvcmxkIQ==
        </pre>
        <p class="text-lg mb-6">Click "Decode" to get the following decoded text:</p>
        <pre class="bg-gray-100 p-2 rounded">
Hello, World!
        </pre>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="handleSubmit">
        <div class="form-group mb-4">
          <label for="input" class="block text-gray-700 text-sm font-bold mb-2">Input:</label>
          <textarea id="input" v-model="inputData" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" placeholder="Enter text or Base64 data here..."></textarea>
        </div>
        <div class="form-group mb-4">
          <label for="output" class="block text-gray-700 text-sm font-bold mb-2">Output:</label>
          <textarea id="output" v-model="outputData" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" readonly></textarea>
        </div>
        <div class="tool-actions">
          <button @click="encodeBase64" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">Encode</button>
          <button @click="decodeBase64" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Decode</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Base64EncoderDecoder',
  data() {
    return {
      inputData: '',
      outputData: ''
    };
  },
  methods: {
    encodeBase64() {
      try {
        this.outputData = btoa(this.inputData);
      } catch (error) {
        this.outputData = `Error: ${error.message}`;
      }
    },
    decodeBase64() {
      try {
        this.outputData = atob(this.inputData);
      } catch (error) {
        this.outputData = `Error: ${error.message}`;
      }
    },
    handleSubmit() {
      // This method is left empty intentionally to prevent form submission
    }
  }
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>
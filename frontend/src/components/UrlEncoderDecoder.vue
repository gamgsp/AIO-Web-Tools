<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">URL Encoder/Decoder</h2>
    <p class="text-lg mb-6">This tool allows you to encode and decode URLs. Simply paste your text or URL-encoded data into the input box, then click the appropriate button to encode or decode it.</p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Encode:</h4>
        <p class="text-lg mb-6">Enter your text data like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
https://www.example.com/search?query=hello world
        </pre>
        <p class="text-lg mb-6">Click "Encode" to get the following URL-encoded output:</p>
        <pre class="bg-gray-100 p-2 rounded">
https%3A%2F%2Fwww.example.com%2Fsearch%3Fquery%3Dhello%20world
        </pre>
      </div>
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Decode:</h4>
        <p class="text-lg mb-6">Enter your URL-encoded data like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
https%3A%2F%2Fwww.example.com%2Fsearch%3Fquery%3Dhello%20world
        </pre>
        <p class="text-lg mb-6">Click "Decode" to get the following text output:</p>
        <pre class="bg-gray-100 p-2 rounded">
https://www.example.com/search?query=hello world
        </pre>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="handleSubmit">
        <div class="form-group mb-4">
          <label for="input" class="block text-gray-700 text-sm font-bold mb-2">Input:</label>
          <textarea id="input" v-model="inputData" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter text or URL-encoded data here..."></textarea>
        </div>
        <div class="form-group mb-4">
          <label for="output" class="block text-gray-700 text-sm font-bold mb-2">Output:</label>
          <textarea id="output" v-model="outputData" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" readonly></textarea>
        </div>
        <div class="tool-actions">
          <button @click="encodeUrl" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">Encode</button>
          <button @click="decodeUrl" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Decode</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UrlEncoderDecoder',
  data() {
    return {
      inputData: '',
      outputData: ''
    };
  },
  methods: {
    encodeUrl() {
      try {
        this.outputData = encodeURIComponent(this.inputData);
      } catch (error) {
        this.outputData = `Error: ${error.message}`;
      }
    },
    decodeUrl() {
      try {
        this.outputData = decodeURIComponent(this.inputData);
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
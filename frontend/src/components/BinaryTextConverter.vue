<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Binary to Text / Text to Binary Converter</h2>
    <p class="text-lg mb-6">This tool allows you to convert data between Binary and Text formats. Simply paste your Binary or Text data into the input box, then click the appropriate button to convert it to the desired format.</p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Binary to Text:</h4>
        <p class="text-lg mb-6">Enter your Binary data like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
01001000 01100101 01101100 01101100 01101111
        </pre>
        <p class="text-lg mb-6">Click "Convert to Text" to get the following Text output:</p>
        <pre class="bg-gray-100 p-2 rounded">
Hello
        </pre>
      </div>
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Text to Binary:</h4>
        <p class="text-lg mb-6">Enter your Text data like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
Hello
        </pre>
        <p class="text-lg mb-6">Click "Convert to Binary" to get the following Binary output:</p>
        <pre class="bg-gray-100 p-2 rounded">
01001000 01100101 01101100 01101100 01101111
        </pre>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="handleSubmit">
        <div class="form-group mb-4">
          <label for="input" class="block text-gray-700 text-sm font-bold mb-2">Input:</label>
          <textarea id="input" v-model="inputData" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter Binary or Text data here..."></textarea>
        </div>
        <div class="form-group mb-4">
          <label for="output" class="block text-gray-700 text-sm font-bold mb-2">Output:</label>
          <textarea id="output" v-model="outputData" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" readonly></textarea>
        </div>
        <div class="tool-actions">
          <button @click="convertToText" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">Convert to Text</button>
          <button @click="convertToBinary" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Convert to Binary</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BinaryTextConverter',
  data() {
    return {
      inputData: '',
      outputData: ''
    };
  },
  methods: {
    convertToText() {
      try {
        this.outputData = this.inputData.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
      } catch (error) {
        this.outputData = `Error: ${error.message}`;
      }
    },
    convertToBinary() {
      try {
        this.outputData = this.inputData.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
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

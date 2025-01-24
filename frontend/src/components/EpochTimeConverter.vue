<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Epoch Time Converter</h2>
    <p class="text-lg mb-6">This tool allows you to convert between Epoch time and human-readable date format. Simply paste your Epoch time or human-readable date into the input box, then click the appropriate button to convert it to the desired format.</p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Epoch to Human-Readable Date:</h4>
        <p class="text-lg mb-6">Enter your Epoch time like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
1632153600
        </pre>
        <p class="text-lg mb-6">Click "Convert to Date" to get the following date output:</p>
        <pre class="bg-gray-100 p-2 rounded">
2021-09-20 12:00:00
        </pre>
      </div>
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Human-Readable Date to Epoch:</h4>
        <p class="text-lg mb-6">Enter your human-readable date like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
2021-09-20 12:00:00
        </pre>
        <p class="text-lg mb-6">Click "Convert to Epoch" to get the following Epoch time output:</p>
        <pre class="bg-gray-100 p-2 rounded">
1632153600
        </pre>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="handleSubmit">
        <div class="form-group mb-4">
          <label for="input" class="block text-gray-700 text-sm font-bold mb-2">Input:</label>
          <textarea id="input" v-model="inputData" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter Epoch time or human-readable date here..."></textarea>
        </div>
        <div class="form-group mb-4">
          <label for="output" class="block text-gray-700 text-sm font-bold mb-2">Output:</label>
          <textarea id="output" v-model="outputData" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" readonly></textarea>
        </div>
        <div class="tool-actions">
          <button @click="convertToDate" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">Convert to Date</button>
          <button @click="convertToEpoch" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Convert to Epoch</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EpochTimeConverter',
  data() {
    return {
      inputData: '',
      outputData: ''
    };
  },
  methods: {
    convertToDate() {
      try {
        const epochTime = parseInt(this.inputData.trim(), 10);
        const date = new Date(epochTime * 1000);
        this.outputData = date.toLocaleString();
      } catch (error) {
        this.outputData = `Error: ${error.message}`;
      }
    },
    convertToEpoch() {
      try {
        const date = new Date(this.inputData.trim());
        if (isNaN(date.getTime())) {
          throw new Error('Invalid date format');
        }
        const epochTime = Math.floor(date.getTime() / 1000);
        this.outputData = epochTime.toString();
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

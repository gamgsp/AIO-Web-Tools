<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">CSV to JSON / JSON to CSV Converter</h2>
    <p class="text-lg mb-6">This tool allows you to convert between CSV and JSON formats. Simply paste your CSV or JSON data into the input box, then click the appropriate button to convert it to the desired format.</p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">CSV to JSON:</h4>
        <p class="text-lg mb-6">Enter your CSV data like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
name,age
John,30
Jane,25
        </pre>
        <p class="text-lg mb-6">Click "Convert to JSON" to get the following JSON data:</p>
        <pre class="bg-gray-100 p-2 rounded">
[
  {
    "name": "John",
    "age": 30
  },
  {
    "name": "Jane",
    "age": 25
  }
]
        </pre>
      </div>
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">JSON to CSV:</h4>
        <p class="text-lg mb-6">Enter your JSON data like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
[
  {
    "name": "John",
    "age": 30
  },
  {
    "name": "Jane",
    "age": 25
  }
]
        </pre>
        <p class="text-lg mb-6">Click "Convert to CSV" to get the following CSV data:</p>
        <pre class="bg-gray-100 p-2 rounded">
name,age
John,30
Jane,25
        </pre>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="handleSubmit">
        <div class="form-group mb-4">
          <label for="input" class="block text-gray-700 text-sm font-bold mb-2">Input:</label>
          <textarea id="input" v-model="inputData" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" placeholder="Enter CSV or JSON data here..."></textarea>
        </div>
        <div class="form-group mb-4">
          <label for="output" class="block text-gray-700 text-sm font-bold mb-2">Output:</label>
          <textarea id="output" v-model="outputData" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" readonly></textarea>
        </div>
        <div class="tool-actions">
          <button @click="convertToJson" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">Convert to JSON</button>
          <button @click="convertToCsv" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Convert to CSV</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CsvJsonConverter',
  data() {
    return {
      inputData: '',
      outputData: ''
    };
  },
  methods: {
    convertToJson() {
      try {
        const csv = this.inputData.split('\n').map(row => row.split(','));
        const headers = csv.shift();
        const json = csv.map(row => {
          return headers.reduce((obj, header, index) => {
            obj[header] = row[index];
            return obj;
          }, {});
        });
        this.outputData = JSON.stringify(json, null, 2);
      } catch (error) {
        this.outputData = `Error: ${error.message}`;
      }
    },
    convertToCsv() {
      try {
        const json = JSON.parse(this.inputData);
        const headers = Object.keys(json[0]);
        const csv = [
          headers.join(','),
          ...json.map(row => headers.map(header => row[header]).join(','))
        ].join('\n');
        this.outputData = csv;
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

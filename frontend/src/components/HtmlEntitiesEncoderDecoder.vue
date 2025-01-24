<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">HTML Entities Encoder / Decoder</h2>
    <p class="text-lg mb-6">This tool allows you to encode and decode HTML entities. Simply paste your HTML code into the input box, then click the appropriate button to encode or decode the entities.</p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Encode HTML:</h4>
        <p class="text-lg mb-6">Enter your HTML code like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
&lt;div&gt;Hello, World!&lt;/div&gt;
        </pre>
        <p class="text-lg mb-6">Click "Encode" to get the following encoded HTML entities:</p>
        <pre class="bg-gray-100 p-2 rounded">
&amp;lt;div&amp;gt;Hello, World!&amp;lt;/div&amp;gt;
        </pre>
      </div>
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Decode HTML:</h4>
        <p class="text-lg mb-6">Enter your encoded HTML entities like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
&amp;lt;div&amp;gt;Hello, World!&amp;lt;/div&amp;gt;
        </pre>
        <p class="text-lg mb-6">Click "Decode" to get the following decoded HTML code:</p>
        <pre class="bg-gray-100 p-2 rounded">
&lt;div&gt;Hello, World!&lt;/div&gt;
        </pre>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="handleSubmit">
        <div class="form-group mb-4">
          <label for="input" class="block text-gray-700 text-sm font-bold mb-2">Input:</label>
          <textarea id="input" v-model="inputData" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" placeholder="Enter HTML code or encoded HTML entities here..."></textarea>
        </div>
        <div class="form-group mb-4">
          <label for="output" class="block text-gray-700 text-sm font-bold mb-2">Output:</label>
          <textarea id="output" v-model="outputData" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" readonly></textarea>
        </div>
        <div class="tool-actions">
          <button @click="encodeHtml" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">Encode</button>
          <button @click="decodeHtml" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Decode</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HtmlEntitiesEncoderDecoder',
  data() {
    return {
      inputData: '',
      outputData: ''
    };
  },
  methods: {
    encodeHtml() {
      try {
        this.outputData = this.inputData.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
      } catch (error) {
        this.outputData = `Error: ${error.message}`;
      }
    },
    decodeHtml() {
      try {
        this.outputData = this.inputData.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
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
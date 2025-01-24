<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">HTML to PHP / PHP to HTML Converter</h2>
    <p class="text-lg mb-6">This tool allows you to convert between HTML and PHP code. Simply paste your HTML or PHP code into the input box, then click the appropriate button to convert it to the desired format.</p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">HTML to PHP:</h4>
        <p class="text-lg mb-6">Enter your HTML code like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
&lt;html&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello, World!&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;
        </pre>
        <p class="text-lg mb-6">Click "Convert to PHP" to get the following PHP code:</p>
        <pre class="bg-gray-100 p-2 rounded">
&lt;?php
echo '&lt;html&gt;';
echo '&lt;body&gt;';
echo '&lt;h1&gt;Hello, World!&lt;/h1&gt;';
echo '&lt;/body&gt;';
echo '&lt;/html&gt;';
?&gt;
        </pre>
      </div>
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">PHP to HTML:</h4>
        <p class="text-lg mb-6">Enter your PHP code like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
&lt;?php
echo '&lt;html&gt;';
echo '&lt;body&gt;';
echo '&lt;h1&gt;Hello, World!&lt;/h1&gt;';
echo '&lt;/body&gt;';
echo '&lt;/html&gt;';
?&gt;
        </pre>
        <p class="text-lg mb-6">Click "Convert to HTML" to get the following HTML code:</p>
        <pre class="bg-gray-100 p-2 rounded">
&lt;html&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello, World!&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;
        </pre>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="handleSubmit">
        <div class="form-group mb-4">
          <label for="input" class="block text-gray-700 text-sm font-bold mb-2">Input:</label>
          <textarea id="input" v-model="inputData" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" placeholder="Enter HTML or PHP code here..."></textarea>
        </div>
        <div class="form-group mb-4">
          <label for="output" class="block text-gray-700 text-sm font-bold mb-2">Output:</label>
          <textarea id="output" v-model="outputData" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" readonly></textarea>
        </div>
        <div class="tool-actions">
          <button @click="convertToPhp" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">Convert to PHP</button>
          <button @click="convertToHtml" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Convert to HTML</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HtmlPhpConverter',
  data() {
    return {
      inputData: '',
      outputData: ''
    };
  },
  methods: {
    convertToPhp() {
      try {
        const htmlCode = this.inputData
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .split('\n')
          .map(line => `echo '${line}';`)
          .join('\n');
        this.outputData = `&lt;?php\n${htmlCode}\n?&gt;`;
      } catch (error) {
        this.outputData = `Error: ${error.message}`;
      }
    },
    convertToHtml() {
      try {
        const phpCode = this.inputData
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/echo '(.*)';/g, '$1')
          .replace(/<\?php/, '')
          .replace(/\?>/, '');
        this.outputData = phpCode.trim();
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

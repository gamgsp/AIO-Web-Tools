<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">HTML to Markdown / Markdown to HTML Converter</h2>
    <p class="text-lg mb-6">This tool allows you to convert between HTML and Markdown. Simply paste your HTML or Markdown code into the input box, then click the appropriate button to convert it to the desired format.</p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">HTML to Markdown:</h4>
        <p class="text-lg mb-6">Enter your HTML code like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
&lt;h1&gt;Hello, World!&lt;/h1&gt;
        </pre>
        <p class="text-lg mb-6">Click "Convert to Markdown" to get the following Markdown code:</p>
        <pre class="bg-gray-100 p-2 rounded">
# Hello, World!
        </pre>
      </div>
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Markdown to HTML:</h4>
        <p class="text-lg mb-6">Enter your Markdown code like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
# Hello, World!
        </pre>
        <p class="text-lg mb-6">Click "Convert to HTML" to get the following HTML code:</p>
        <pre class="bg-gray-100 p-2 rounded">
&lt;h1&gt;Hello, World!&lt;/h1&gt;
        </pre>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="handleSubmit">
        <div class="form-group mb-4">
          <label for="input" class="block text-gray-700 text-sm font-bold mb-2">Input:</label>
          <textarea id="input" v-model="inputData" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" placeholder="Enter HTML or Markdown code here..."></textarea>
        </div>
        <div class="form-group mb-4">
          <label for="output" class="block text-gray-700 text-sm font-bold mb-2">Output:</label>
          <textarea id="output" v-model="outputData" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" readonly></textarea>
        </div>
        <div class="tool-actions">
          <button @click="convertToMarkdown" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">Convert to Markdown</button>
          <button @click="convertToHtml" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Convert to HTML</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HtmlMarkdownConverter',
  data() {
    return {
      inputData: '',
      outputData: ''
    };
  },
  methods: {
    convertToMarkdown() {
      try {
        // Simple conversion logic for demo purposes. You may need a library for more complex conversions.
        const htmlCode = this.inputData;
        const markdownCode = htmlCode
          .replace(/<h1>(.*?)<\/h1>/g, '# $1')
          .replace(/<h2>(.*?)<\/h2>/g, '## $1')
          .replace(/<h3>(.*?)<\/h3>/g, '### $1')
          .replace(/<p>(.*?)<\/p>/g, '$1\n')
          .replace(/<br\s*\/?>/g, '\n');
        this.outputData = markdownCode;
      } catch (error) {
        this.outputData = `Error: ${error.message}`;
      }
    },
    convertToHtml() {
      try {
        // Simple conversion logic for demo purposes. You may need a library for more complex conversions.
        const markdownCode = this.inputData;
        const htmlCode = markdownCode
          .replace(/^# (.*$)/gim, '<h1>$1</h1>')
          .replace(/^## (.*$)/gim, '<h2>$1</h2>')
          .replace(/^### (.*$)/gim, '<h3>$1</h3>')
          .replace(/^\s*(\S.*$)/gim, '<p>$1</p>')
          .replace(/\n/g, '<br />');
        this.outputData = htmlCode;
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

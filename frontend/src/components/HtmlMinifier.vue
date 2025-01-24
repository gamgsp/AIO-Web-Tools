<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">HTML Minifier/Unminifier</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The HTML Minifier/Unminifier tool helps you minify (compress) and unminify (expand) your HTML code.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Original HTML:</h4>
        <pre class="bg-gray-100 p-2 rounded">
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Example&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Hello, World!&lt;/h1&gt;
    &lt;p&gt;This is a sample paragraph.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;
        </pre>
        <p class="text-lg mb-6">Click "Minify" to compress the HTML code, or "Beautify" to expand minified HTML code.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="processHtml">
        <div class="form-group mb-4">
          <label for="htmlCode" class="block text-gray-700 text-sm font-bold mb-2">HTML Code:</label>
          <textarea id="htmlCode" v-model="htmlCode" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" placeholder="Enter HTML code here..."></textarea>
        </div>
        <div class="tool-actions">
          <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="minifyHtml" :disabled="loading">
            Minify
          </button>
          <button type="button" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2" @click="beautifyHtml" :disabled="loading">
            Beautify
          </button>
        </div>
      </form>
    </div>
    <div v-if="result || error" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Processed HTML</h3>
      <pre v-if="result" class="bg-gray-100 p-2 rounded">{{ result }}</pre>
      <p v-if="error" class="error text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HtmlMinifier',
  data() {
    return {
      htmlCode: '',
      result: '',
      error: '',
      loading: false,
    };
  },
  methods: {
    minifyHtml() {
      this.loading = true;
      this.error = '';
      try {
        this.result = this.htmlCode.replace(/\s+/g, ' ').trim();
      } catch (error) {
        this.error = `Error: ${error.message}`;
      } finally {
        this.loading = false;
      }
    },
    beautifyHtml() {
      this.loading = true;
      this.error = '';
      try {
        const formatted = this.htmlCode.replace(/(>)\s*(<)/g, '$1\n$2').replace(/\s{2,}/g, ' ');
        this.result = formatted.split('\n').map(line => line.trim()).join('\n');
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

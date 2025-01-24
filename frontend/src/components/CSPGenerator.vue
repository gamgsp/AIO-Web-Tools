<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Content Security Policy (CSP) Generator</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The CSP Generator helps you create a Content Security Policy for your website to enhance security by specifying what resources the browser is allowed to load for the page.
    </p>
    <div class="tool-example mb-6">
      <p class="text-lg mb-4"><strong>Usage Example:</strong></p>
      <div class="example-section mb-4">
        <h4 class="text-lg font-bold mb-2">Example 1:</h4>
        <p class="bg-gray-100 p-2 rounded">Policy: <code>default-src 'self'; script-src 'self' example.com; style-src 'self' example.com;</code></p>
      </div>
    </div>
    <div class="tool-form">
      <div class="form-group mb-4">
        <label for="defaultSrc" class="block text-gray-700 text-sm font-bold mb-2">Default Source:</label>
        <input id="defaultSrc" v-model="defaultSrc" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="'self'"/>
      </div>
      <div class="form-group mb-4">
        <label for="scriptSrc" class="block text-gray-700 text-sm font-bold mb-2">Script Source:</label>
        <input id="scriptSrc" v-model="scriptSrc" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="'self' example.com"/>
      </div>
      <div class="form-group mb-4">
        <label for="styleSrc" class="block text-gray-700 text-sm font-bold mb-2">Style Source:</label>
        <input id="styleSrc" v-model="styleSrc" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="'self' example.com"/>
      </div>
      <div class="form-group mb-4">
        <label for="imgSrc" class="block text-gray-700 text-sm font-bold mb-2">Image Source:</label>
        <input id="imgSrc" v-model="imgSrc" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="'self' example.com"/>
      </div>
      <div class="form-group mb-4">
        <label for="fontSrc" class="block text-gray-700 text-sm font-bold mb-2">Font Source:</label>
        <input id="fontSrc" v-model="fontSrc" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="'self' example.com"/>
      </div>
      <div class="tool-actions">
        <button @click="generateCSP" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate CSP</button>
      </div>
    </div>
    <div v-if="cspPolicy" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Generated CSP</h3>
      <pre class="bg-gray-100 p-2 rounded break-words">{{ cspPolicy }}</pre>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'CSPGenerator',
  setup() {
    const defaultSrc = ref("'self'");
    const scriptSrc = ref("'self'");
    const styleSrc = ref("'self'");
    const imgSrc = ref("'self'");
    const fontSrc = ref("'self'");
    const cspPolicy = ref('');

    const generateCSP = () => {
      cspPolicy.value = `default-src ${defaultSrc.value}; script-src ${scriptSrc.value}; style-src ${styleSrc.value}; img-src ${imgSrc.value}; font-src ${fontSrc.value};`;
    };

    return {
      defaultSrc,
      scriptSrc,
      styleSrc,
      imgSrc,
      fontSrc,
      cspPolicy,
      generateCSP
    };
  }
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>

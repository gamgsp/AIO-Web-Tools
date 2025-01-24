<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">CSS Box Shadow Generator</h2>
    <p class="text-lg mb-6">This tool allows you to generate CSS code for box shadows. Adjust the parameters and click "Generate" to create the box shadow CSS code.</p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Generate Box Shadow:</h4>
        <p class="text-lg mb-6">Adjust the parameters for horizontal offset, vertical offset, blur radius, spread radius, and color.</p>
        <p class="text-lg mb-6">Click "Generate" to get the CSS code for the box shadow.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="generateBoxShadow">
        <div class="form-group mb-4">
          <label for="hOffset" class="block text-gray-700 text-sm font-bold mb-2">Horizontal Offset:</label>
          <input id="hOffset" v-model="hOffset" type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter horizontal offset">
        </div>
        <div class="form-group mb-4">
          <label for="vOffset" class="block text-gray-700 text-sm font-bold mb-2">Vertical Offset:</label>
          <input id="vOffset" v-model="vOffset" type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter vertical offset">
        </div>
        <div class="form-group mb-4">
          <label for="blurRadius" class="block text-gray-700 text-sm font-bold mb-2">Blur Radius:</label>
          <input id="blurRadius" v-model="blurRadius" type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter blur radius">
        </div>
        <div class="form-group mb-4">
          <label for="spreadRadius" class="block text-gray-700 text-sm font-bold mb-2">Spread Radius:</label>
          <input id="spreadRadius" v-model="spreadRadius" type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter spread radius">
        </div>
        <div class="form-group mb-4">
          <label for="color" class="block text-gray-700 text-sm font-bold mb-2">Color:</label>
          <input id="color" v-model="color" type="color" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate</button>
        </div>
      </form>
    </div>
    <div class="generated-box-shadow mt-4" v-if="boxShadow">
      <h3 class="text-2xl font-bold mb-2">Generated Box Shadow CSS</h3>
      <pre class="bg-gray-100 p-2 rounded"><code>{{ boxShadow }}</code></pre>
      <div class="box-shadow-preview mt-4" :style="{ boxShadow: boxShadow }">Preview</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoxShadowGenerator',
  data() {
    return {
      hOffset: 0,
      vOffset: 0,
      blurRadius: 10,
      spreadRadius: 0,
      color: '#000000',
      boxShadow: ''
    };
  },
  methods: {
    generateBoxShadow() {
      this.boxShadow = `${this.hOffset}px ${this.vOffset}px ${this.blurRadius}px ${this.spreadRadius}px ${this.color}`;
    }
  }
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>


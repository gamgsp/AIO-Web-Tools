<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">CSS Border Radius Generator</h2>
    <p class="text-lg mb-6">This tool allows you to generate CSS code for border radius. Adjust the parameters and click "Generate" to create the border radius CSS code.</p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Generate Border Radius:</h4>
        <p class="text-lg mb-6">Adjust the parameters for top-left, top-right, bottom-left, and bottom-right radius.</p>
        <p class="text-lg mb-6">Click "Generate" to get the CSS code for the border radius.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="generateBorderRadius">
        <div class="form-group mb-4">
          <label for="topLeft" class="block text-gray-700 text-sm font-bold mb-2">Top-Left Radius:</label>
          <input id="topLeft" v-model="topLeft" type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter top-left radius">
        </div>
        <div class="form-group mb-4">
          <label for="topRight" class="block text-gray-700 text-sm font-bold mb-2">Top-Right Radius:</label>
          <input id="topRight" v-model="topRight" type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter top-right radius">
        </div>
        <div class="form-group mb-4">
          <label for="bottomLeft" class="block text-gray-700 text-sm font-bold mb-2">Bottom-Left Radius:</label>
          <input id="bottomLeft" v-model="bottomLeft" type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter bottom-left radius">
        </div>
        <div class="form-group mb-4">
          <label for="bottomRight" class="block text-gray-700 text-sm font-bold mb-2">Bottom-Right Radius:</label>
          <input id="bottomRight" v-model="bottomRight" type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter bottom-right radius">
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate</button>
        </div>
      </form>
    </div>
    <div class="generated-border-radius mt-4" v-if="borderRadiusCss">
      <h3 class="text-2xl font-bold mb-2">Generated Border Radius CSS</h3>
      <pre class="bg-gray-100 p-2 rounded"><code>{{ borderRadiusCss }}</code></pre>
      <div class="border-radius-preview mt-4" :style="{ borderRadius: borderRadiusCss }">Preview</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BorderRadiusGenerator',
  data() {
    return {
      topLeft: 0,
      topRight: 0,
      bottomLeft: 0,
      bottomRight: 0,
      borderRadiusCss: ''
    };
  },
  methods: {
    generateBorderRadius() {
      this.borderRadiusCss = `${this.topLeft}px ${this.topRight}px ${this.bottomLeft}px ${this.bottomRight}px`;
    }
  }
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>

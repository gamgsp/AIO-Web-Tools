<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Barcode Generator</h2>
    <p class="text-lg mb-6">This tool allows you to generate barcodes. Enter the text or number you want to encode and click "Generate" to create a barcode.</p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Generate Barcode:</h4>
        <p class="text-lg mb-6">Enter the text or number you want to encode: <code>1234567890</code></p>
        <p class="text-lg mb-6">Click "Generate" to get the barcode.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="generateBarcode">
        <div class="form-group mb-4">
          <label for="text" class="block text-gray-700 text-sm font-bold mb-2">Text/Number:</label>
          <input id="text" v-model="text" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter text or number">
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate</button>
        </div>
      </form>
    </div>
    <div class="generated-barcode mt-4">
      <h3 class="text-2xl font-bold mb-2">Generated Barcode</h3>
      <div v-if="barcodeUrl" class="barcode-container">
        <img :src="barcodeUrl" alt="Generated Barcode" class="rounded">
      </div>
    </div>
  </div>
</template>

<script>
import JsBarcode from 'jsbarcode';

export default {
  name: 'BarcodeGenerator',
  data() {
    return {
      text: '',
      barcodeUrl: ''
    };
  },
  methods: {
    generateBarcode() {
      if (!this.text) {
        return;
      }

      // Create a canvas element to draw the barcode
      const canvas = document.createElement('canvas');
      JsBarcode(canvas, this.text, {
        format: 'CODE128',
        width: 2,
        height: 100,
        displayValue: true,
      });

      // Convert the canvas to a data URL and set it as the barcode URL
      this.barcodeUrl = canvas.toDataURL('image/png');
    }
  }
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>

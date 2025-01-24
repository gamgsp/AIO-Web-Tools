<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">QR Code Generator</h2>
    <p class="text-lg mb-6">This tool allows you to generate QR codes. Enter the text or URL you want to encode and click "Generate" to create a QR code.</p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Generate QR Code:</h4>
        <p class="text-lg mb-6">Enter the text or URL you want to encode: <code>https://www.example.com</code></p>
        <p class="text-lg mb-6">Click "Generate" to get the QR code.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="generateQrCode">
        <div class="form-group mb-4">
          <label for="text" class="block text-gray-700 text-sm font-bold mb-2">Text/URL:</label>
          <input id="text" v-model="text" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter text or URL">
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate</button>
        </div>
      </form>
    </div>
    <div class="generated-qr-code mt-4" v-if="qrCodeUrl">
      <h3 class="text-2xl font-bold mb-2">Generated QR Code</h3>
      <img :src="qrCodeUrl" alt="Generated QR Code" class="rounded">
    </div>
  </div>
</template>

<script>
export default {
  name: 'QrCodeGenerator',
  data() {
    return {
      text: '',
      qrCodeUrl: ''
    };
  },
  methods: {
    generateQrCode() {
      const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(this.text)}&size=200x200`;
      this.qrCodeUrl = apiUrl;
    }
  }
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>

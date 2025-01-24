<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Hex to RGB / RGB to Hex Converter</h2>
    <p class="text-lg mb-6">This tool allows you to convert color codes between Hex and RGB formats. Simply paste your Hex or RGB color code into the input box, then click the appropriate button to convert it to the desired format. The resulting color will be displayed below.</p>
    <p class="text-lg mb-6">**Usage Example:**</p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Hex to RGB:</h4>
        <p class="text-lg mb-6">Enter your Hex color code like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
#FF5733
        </pre>
        <p class="text-lg mb-6">Click "Convert to RGB" to get the following RGB output:</p>
        <pre class="bg-gray-100 p-2 rounded">
rgb(255, 87, 51)
        </pre>
      </div>
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">RGB to Hex:</h4>
        <p class="text-lg mb-6">Enter your RGB color code like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
rgb(255, 87, 51)
        </pre>
        <p class="text-lg mb-6">Click "Convert to Hex" to get the following Hex output:</p>
        <pre class="bg-gray-100 p-2 rounded">
#FF5733
        </pre>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="handleSubmit">
        <div class="form-group mb-4">
          <label for="input" class="block text-gray-700 text-sm font-bold mb-2">Input:</label>
          <textarea id="input" v-model="inputData" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter Hex or RGB color code here..."></textarea>
        </div>
        <div v-if="color" class="color-preview mt-4 mx-auto" :style="{ backgroundColor: color }">
          <p class="text-center font-bold p-2" :style="{ color: textColor }">Color Preview</p>
        </div>
        <div class="form-group mb-4 mt-4">
          <label for="output" class="block text-gray-700 text-sm font-bold mb-2">Output:</label>
          <textarea id="output" v-model="outputData" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" readonly></textarea>
        </div>
        <div class="tool-actions">
          <button @click="convertToRgb" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">Convert to RGB</button>
          <button @click="convertToHex" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Convert to Hex</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HexRgbConverter',
  data() {
    return {
      inputData: '',
      outputData: '',
      color: null, // Stores the color for preview
      textColor: '#FFFFFF' // Default text color for preview
    };
  },
  methods: {
    convertToRgb() {
      const hex = this.inputData.trim();
      if (/^#[0-9A-F]{6}$/i.test(hex)) {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        this.outputData = `rgb(${r}, ${g}, ${b})`;
        this.color = `rgb(${r}, ${g}, ${b})`;
        this.textColor = this.getTextColor(r, g, b);
      } else {
        this.outputData = 'Error: Invalid Hex code';
        this.color = null;
      }
    },
    convertToHex() {
      const rgb = this.inputData.trim();
      const result = rgb.match(/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/);
      if (result) {
        const r = parseInt(result[1]);
        const g = parseInt(result[2]);
        const b = parseInt(result[3]);
        if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
          const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
          this.outputData = hex;
          this.color = hex;
          this.textColor = this.getTextColor(r, g, b);
        } else {
          this.outputData = 'Error: Invalid RGB values';
          this.color = null;
        }
      } else {
        this.outputData = 'Error: Invalid RGB format';
        this.color = null;
      }
    },
    getTextColor(r, g, b) {
      // Calculate brightness
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 128 ? '#000000' : '#FFFFFF';
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

<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">RGB to HSL Converter</h2>
    <p class="text-lg mb-6">This tool allows you to convert RGB color values to HSL color values. Enter the RGB values and click "Convert" to get the corresponding HSL values.</p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Convert RGB to HSL:</h4>
        <p class="text-lg mb-6">Enter the RGB values (e.g., <code>255, 0, 0</code> for red). Click "Convert" to get the corresponding HSL values.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="convertRgbToHsl">
        <div class="form-group mb-4">
          <label for="red" class="block text-gray-700 text-sm font-bold mb-2">Red:</label>
          <input id="red" v-model.number="red" type="number" min="0" max="255" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter red value (0-255)">
        </div>
        <div class="form-group mb-4">
          <label for="green" class="block text-gray-700 text-sm font-bold mb-2">Green:</label>
          <input id="green" v-model.number="green" type="number" min="0" max="255" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter green value (0-255)">
        </div>
        <div class="form-group mb-4">
          <label for="blue" class="block text-gray-700 text-sm font-bold mb-2">Blue:</label>
          <input id="blue" v-model.number="blue" type="number" min="0" max="255" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter blue value (0-255)">
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Convert</button>
        </div>
      </form>
    </div>
    <div class="generated-hsl mt-4" v-if="hsl">
      <h3 class="text-2xl font-bold mb-2">Converted HSL Values</h3>
      <pre class="bg-gray-100 p-2 rounded"><code>{{ hsl }}</code></pre>
      <div class="hsl-preview mt-4" :style="{ backgroundColor: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` }">Preview</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RgbToHslConverter',
  data() {
    return {
      red: 255,
      green: 0,
      blue: 0,
      hsl: null
    };
  },
  methods: {
    convertRgbToHsl() {
      const r = this.red / 255;
      const g = this.green / 255;
      const b = this.blue / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;

      if (max === min) {
        h = s = 0; // achromatic
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }

      this.hsl = {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
      };
    }
  }
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>

<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Accessibility Contrast Checker</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Accessibility Contrast Checker helps you ensure that your content is accessible by checking the color contrast between text and background.
    </p>
    <div class="tool-example mb-6">
      <p class="text-lg mb-4"><strong>Usage Example:</strong></p>
      <div class="example-section mb-4">
        <h4 class="text-lg font-bold mb-2">Example 1:</h4>
        <p class="bg-gray-100 p-2 rounded">Foreground Color: #000000<br>Background Color: #FFFFFF<br>Contrast Ratio: 21:1 (Pass)</p>
      </div>
      <div class="example-section mb-4">
        <h4 class="text-lg font-bold mb-2">Example 2:</h4>
        <p class="bg-gray-100 p-2 rounded">Foreground Color: #FF0000<br>Background Color: #FFFFFF<br>Contrast Ratio: 4:1 (Fail)</p>
      </div>
    </div>
    <div class="tool-form">
      <div class="form-group mb-4">
        <label for="foregroundColor" class="block text-gray-700 text-sm font-bold mb-2">Foreground Color:</label>
        <input id="foregroundColor" v-model="foregroundColor" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="#000000"/>
      </div>
      <div class="form-group mb-4">
        <label for="backgroundColor" class="block text-gray-700 text-sm font-bold mb-2">Background Color:</label>
        <input id="backgroundColor" v-model="backgroundColor" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="#FFFFFF"/>
      </div>
      <div class="tool-actions">
        <button @click="checkContrast" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Check Contrast</button>
      </div>
    </div>
    <div v-if="contrastRatio" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Contrast Ratio</h3>
      <p class="bg-gray-100 p-2 rounded">Contrast Ratio: {{ contrastRatio }}<br>Status: {{ contrastStatus }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccessibilityContrastChecker',
  data() {
    return {
      foregroundColor: '',
      backgroundColor: '',
      contrastRatio: null,
      contrastStatus: '',
    };
  },
  methods: {
    checkContrast() {
      const fgColor = this.foregroundColor;
      const bgColor = this.backgroundColor;

      // Convert hex color to RGB
      const rgbFg = this.hexToRgb(fgColor);
      const rgbBg = this.hexToRgb(bgColor);

      // Calculate relative luminance
      const lumFg = this.relativeLuminance(rgbFg);
      const lumBg = this.relativeLuminance(rgbBg);

      // Calculate contrast ratio
      const ratio = lumFg > lumBg ? (lumFg + 0.05) / (lumBg + 0.05) : (lumBg + 0.05) / (lumFg + 0.05);

      this.contrastRatio = ratio.toFixed(2);
      this.contrastStatus = ratio >= 4.5 ? 'Pass' : 'Fail';
    },
    hexToRgb(hex) {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return { r, g, b };
    },
    relativeLuminance(rgb) {
      const { r, g, b } = rgb;
      const a = [r, g, b].map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
    }
  }
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';

.break-words {
  word-break: break-word;
}
</style>

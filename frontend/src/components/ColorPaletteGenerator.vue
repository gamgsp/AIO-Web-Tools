<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Color Palette Generator</h2>
    <p class="text-lg mb-6">This tool allows you to generate color palettes. Select the colors and click "Generate" to create the color palette and get the corresponding HEX codes.</p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Generate Color Palette:</h4>
        <p class="text-lg mb-6">Select the colors for your palette. Click "Generate" to get the palette and corresponding HEX codes.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="generatePalette">
        <div class="form-group mb-4" v-for="(color, index) in colors" :key="index">
          <label :for="'color' + index" class="block text-gray-700 text-sm font-bold mb-2">Color {{ index + 1 }}:</label>
          <input :id="'color' + index" v-model="color.value" type="color" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <button @click="addColor" type="button" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">Add Color</button>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate</button>
        </div>
      </form>
    </div>
    <div class="generated-palette mt-4" v-if="palette.length > 0">
      <h3 class="text-2xl font-bold mb-2">Generated Color Palette</h3>
      <div class="palette-preview flex">
        <div v-for="(color, index) in palette" :key="index" class="color-box" :style="{ backgroundColor: color.value }">
          <span class="color-hex">{{ color.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorPaletteGenerator',
  data() {
    return {
      colors: [
        { value: '#ff0000' },
        { value: '#00ff00' },
        { value: '#0000ff' }
      ],
      palette: []
    };
  },
  methods: {
    addColor() {
      this.colors.push({ value: '#000000' });
    },
    generatePalette() {
      this.palette = this.colors.map(color => ({ value: color.value }));
    }
  }
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>

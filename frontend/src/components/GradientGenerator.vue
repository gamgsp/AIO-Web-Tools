<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">CSS Gradient Generator</h2>
    <p class="text-lg mb-6">This tool allows you to generate CSS code for gradients. Adjust the parameters and click "Generate" to create the gradient CSS code.</p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Generate Gradient:</h4>
        <p class="text-lg mb-6">Adjust the parameters for type, angle, colors, and positions.</p>
        <p class="text-lg mb-6">Click "Generate" to get the CSS code for the gradient.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="generateGradient">
        <div class="form-group mb-4">
          <label for="type" class="block text-gray-700 text-sm font-bold mb-2">Gradient Type:</label>
          <select id="type" v-model="type" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
          </select>
        </div>
        <div class="form-group mb-4" v-if="type === 'linear'">
          <label for="angle" class="block text-gray-700 text-sm font-bold mb-2">Angle:</label>
          <input id="angle" v-model="angle" type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter angle (e.g., 45)">
        </div>
        <div class="form-group mb-4">
          <label for="colors" class="block text-gray-700 text-sm font-bold mb-2">Colors:</label>
          <div v-for="(color, index) in colors" :key="index" class="color-input mb-2">
            <input v-model="color.value" type="color" class="color-picker">
            <input v-model="color.position" type="number" min="0" max="100" class="position-input" placeholder="Position (%)">
            <button @click="removeColor(index)" type="button" class="remove-color-btn">Remove</button>
          </div>
          <button @click="addColor" type="button" class="add-color-btn">Add Color</button>
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate</button>
        </div>
      </form>
    </div>
    <div class="generated-gradient mt-4" v-if="gradientCss">
      <h3 class="text-2xl font-bold mb-2">Generated Gradient CSS</h3>
      <pre class="bg-gray-100 p-2 rounded"><code>{{ gradientCss }}</code></pre>
      <div class="gradient-preview mt-4" :style="{ background: gradientCss }">Preview</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GradientGenerator',
  data() {
    return {
      type: 'linear',
      angle: 45,
      colors: [
        { value: '#ff0000', position: 0 },
        { value: '#0000ff', position: 100 }
      ],
      gradientCss: ''
    };
  },
  methods: {
    addColor() {
      this.colors.push({ value: '#000000', position: 100 });
    },
    removeColor(index) {
      this.colors.splice(index, 1);
    },
    generateGradient() {
      const colorStops = this.colors.map(color => `${color.value} ${color.position}%`).join(', ');
      if (this.type === 'linear') {
        this.gradientCss = `linear-gradient(${this.angle}deg, ${colorStops})`;
      } else {
        this.gradientCss = `radial-gradient(circle, ${colorStops})`;
      }
    }
  }
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>

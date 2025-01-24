<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Image Placeholder Generator</h2>
    <p class="text-lg mb-6">This tool allows you to generate placeholder images. Specify the dimensions, text, and colors, and click "Generate" to create a placeholder image.</p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Generate Placeholder Image:</h4>
        <p class="text-lg mb-6">Enter the dimensions (e.g., <code>300x200</code>), text (optional), and click "Generate" to get the placeholder image.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="generatePlaceholderImage">
        <div class="form-group mb-4">
          <label for="dimensions" class="block text-gray-700 text-sm font-bold mb-2">Dimensions:</label>
          <input id="dimensions" v-model="dimensions" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter dimensions (e.g., 300x200)">
        </div>
        <div class="form-group mb-4">
          <label for="text" class="block text-gray-700 text-sm font-bold mb-2">Text (Optional):</label>
          <input id="text" v-model="text" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter text">
        </div>
        <div class="form-group mb-4">
          <label for="bgColor" class="block text-gray-700 text-sm font-bold mb-2">Background Color (Optional):</label>
          <input id="bgColor" v-model="bgColor" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter background color (e.g., #cccccc)">
        </div>
        <div class="form-group mb-4">
          <label for="textColor" class="block text-gray-700 text-sm font-bold mb-2">Text Color (Optional):</label>
          <input id="textColor" v-model="textColor" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter text color (e.g., #000000)">
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate</button>
        </div>
      </form>
    </div>
    <div class="generated-placeholder-image mt-4" v-if="imageUrl">
      <h3 class="text-2xl font-bold mb-2">Generated Placeholder Image</h3>
      <img :src="imageUrl" alt="Generated Placeholder Image" class="rounded">
    </div>
  </div>
</template>

<script>
import Holder from 'holderjs';

export default {
  name: 'PlaceholderImageGenerator',
  data() {
    return {
      dimensions: '300x200',
      text: '',
      bgColor: '',
      textColor: '',
      imageUrl: ''
    };
  },
  methods: {
    generatePlaceholderImage() {
      let url = `holder.js/${this.dimensions}`;
      if (this.text) url += `?text=${encodeURIComponent(this.text)}`;
      if (this.bgColor) url += `&bg=${encodeURIComponent(this.bgColor)}`;
      if (this.textColor) url += `&fg=${encodeURIComponent(this.textColor)}`;
      this.imageUrl = url;

      // Apply Holder.js to generate the placeholder image
      this.$nextTick(() => {
        Holder.run({
          images: document.querySelectorAll('.generated-placeholder-image img')
        });
      });
    }
  }
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>

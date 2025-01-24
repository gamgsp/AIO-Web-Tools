<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Favicon Generator</h2>
    <p class="text-lg mb-6">This tool allows you to generate favicons from an image file. Upload an image and click "Generate" to create the favicon.</p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Generate Favicon:</h4>
        <p class="text-lg mb-6">Upload an image file (e.g., <code>favicon.png</code>). Click "Generate" to get the favicon.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="generateFavicon">
        <div class="form-group mb-4">
          <label for="image" class="block text-gray-700 text-sm font-bold mb-2">Image File:</label>
          <input id="image" type="file" @change="onImageChange" accept="image/*" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="!imageFile">Generate</button>
        </div>
      </form>
    </div>
    <div class="generated-favicon mt-4" v-if="faviconUrl">
      <h3 class="text-2xl font-bold mb-2">Generated Favicon</h3>
      <a :href="faviconUrl" download="favicon.ico">
        <img :src="faviconUrl" alt="Generated Favicon" class="rounded">
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FaviconGenerator',
  data() {
    return {
      imageFile: null,
      faviconUrl: ''
    };
  },
  methods: {
    onImageChange(event) {
      this.imageFile = event.target.files[0];
    },
    generateFavicon() {
      if (!this.imageFile) {
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target.result;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const size = 64; // Favicon size

          canvas.width = size;
          canvas.height = size;

          // Draw the image on the canvas
          ctx.drawImage(img, 0, 0, size, size);

          // Get the favicon URL from the canvas
          this.faviconUrl = canvas.toDataURL('image/x-icon');
        };
      };

      reader.readAsDataURL(this.imageFile);
    }
  }
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>

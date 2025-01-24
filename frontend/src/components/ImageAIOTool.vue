<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Image AIO Tool</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Image AIO Tool helps you resize, convert, and compress images with ease.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example Image:</h4>
        <pre class="bg-gray-100 p-2 rounded">
width: 800, height: 600, format: 'jpeg', quality: 80
        </pre>
        <p class="text-lg mb-6">Enter the desired dimensions, format, and compression to resize, convert, or compress your image.</p>
      </div>
    </div>
    <div class="tool-form mb-6">
      <form @submit.prevent="resizeImage" enctype="multipart/form-data">
        <div class="form-group mb-4">
          <label for="image" class="block text-gray-700 text-sm font-bold mb-2">Upload Image:</label>
          <input id="image" type="file" @change="handleFileUpload" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div class="form-group mb-4">
          <label for="width" class="block text-gray-700 text-sm font-bold mb-2">Width:</label>
          <input id="width" v-model="width" type="number" min="1" placeholder="Enter width (optional)" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div class="form-group mb-4">
          <label for="height" class="block text-gray-700 text-sm font-bold mb-2">Height:</label>
          <input id="height" v-model="height" type="number" min="1" placeholder="Enter height (optional)" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div class="form-group mb-4">
          <label for="format" class="block text-gray-700 text-sm font-bold mb-2">Output Format:</label>
          <select id="format" v-model="format" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
            <option value="webp">WEBP</option>
          </select>
        </div>
        <div class="form-group mb-4">
          <label for="quality" class="block text-gray-700 text-sm font-bold mb-2">Compression Quality:</label>
          <input id="quality" v-model="quality" type="number" min="1" max="100" placeholder="Enter quality (1-100)" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <span v-if="loading" class="spinner-border"></span>
            <span v-else>Process Image</span>
          </button>
        </div>
      </form>
    </div>
    <div v-if="resizedImageUrl" class="generated-info mt-4 text-center">
      <h3 class="text-2xl font-bold mb-2">Processed Image</h3>
      <img :src="resizedImageUrl" alt="Processed Image" class="resized-image mx-auto"/>
      <a :href="resizedImageUrl" download="processed-image" class="mt-4 inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Download Image</a>
    </div>
    <p v-if="error" class="error text-red-500 text-center">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ImageAIOTool',
  data() {
    return {
      image: null,
      width: '',
      height: '',
      format: 'jpeg',
      quality: 80,
      resizedImageUrl: '',
      error: '',
      loading: false,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.image = event.target.files[0];
    },
    async resizeImage() {
      this.loading = true;
      this.error = '';
      this.resizedImageUrl = '';
      const formData = new FormData();
      formData.append('image', this.image);
      formData.append('width', this.width);
      formData.append('height', this.height);
      formData.append('format', this.format);
      formData.append('quality', this.quality);

      try {
        const response = await axios.post('http://localhost:5000/api/resize-image', formData, {
          responseType: 'blob',
        });
        const url = URL.createObjectURL(response.data);
        this.resizedImageUrl = url;
      } catch (error) {
        this.error = `Error: ${error.response ? error.response.data.message : error.message}`;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';

.resized-image {
  max-width: 100%;
  height: auto;
}

.break-words {
  word-break: break-word;
}
</style>

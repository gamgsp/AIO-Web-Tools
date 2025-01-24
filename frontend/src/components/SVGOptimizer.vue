<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">SVG Optimizer</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The SVG Optimizer allows you to optimize SVG files by reducing their file size while maintaining quality.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example File:</h4>
        <pre class="bg-gray-100 p-2 rounded">
Upload an SVG file to optimize it.
        </pre>
      </div>
    </div>
    <div class="tool-form mb-6">
      <form @submit.prevent="optimizeSVG" enctype="multipart/form-data">
        <div class="form-group mb-4">
          <label for="file" class="block text-gray-700 text-sm font-bold mb-2">Upload File:</label>
          <input id="file" type="file" @change="handleFileUpload" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="loading">
            <span v-if="loading" class="spinner-border"></span>
            <span v-else>Optimize SVG</span>
          </button>
        </div>
      </form>
    </div>
    <div v-if="downloadUrl" class="mt-4 text-center">
      <p class="text-lg">Optimized SVG file is ready:</p>
      <a :href="downloadUrl" :download="downloadFileName" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block mt-2">
        Download Optimized File
      </a>
    </div>
    <p v-if="error" class="error text-red-500">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SVGOptimizer',
  data() {
    return {
      file: null,
      downloadUrl: null,
      downloadFileName: '',
      error: '',
      loading: false,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
      console.log('File selected:', this.file);
    },
    async optimizeSVG() {
      this.loading = true;
      this.error = '';
      this.downloadUrl = null;
      const formData = new FormData();
      formData.append('file', this.file);
      console.log('Sending form data:', formData);

      try {
        const response = await axios.post('http://localhost:5000/api/optimize-svg', formData, { responseType: 'blob' });
        console.log('Received response:', response.data);
        const blob = new Blob([response.data]);
        this.downloadUrl = window.URL.createObjectURL(blob);
        this.downloadFileName = this.file.name.replace('.svg', '-optimized.svg');
      } catch (error) {
        this.error = `Error: ${error.response ? error.response.data.message : error.message}`;
        console.error('Optimization error:', this.error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';

.break-words {
  word-break: break-word;
}
</style>

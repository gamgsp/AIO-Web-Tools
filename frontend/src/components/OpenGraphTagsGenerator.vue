<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Open Graph Tags Generator</h2>
    <p class="text-lg mb-6">This tool allows you to generate Open Graph meta tags for your website. Fill in the details and click "Generate" to create the Open Graph meta tags.</p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Generate Open Graph Tags:</h4>
        <p class="text-lg mb-6">Fill in the details for title, description, URL, and image. Click "Generate" to get the Open Graph meta tags.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="generateOpenGraphTags">
        <div class="form-group mb-4">
          <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <input id="title" v-model="title" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter title">
        </div>
        <div class="form-group mb-4">
          <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Description:</label>
          <input id="description" v-model="description" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter description">
        </div>
        <div class="form-group mb-4">
          <label for="url" class="block text-gray-700 text-sm font-bold mb-2">URL:</label>
          <input id="url" v-model="url" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter URL">
        </div>
        <div class="form-group mb-4">
          <label for="image" class="block text-gray-700 text-sm font-bold mb-2">Image URL:</label>
          <input id="image" v-model="image" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter image URL">
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate</button>
        </div>
      </form>
    </div>
    <div class="generated-tags mt-4" v-if="openGraphTags">
      <h3 class="text-2xl font-bold mb-2">Generated Open Graph Tags</h3>
      <pre class="bg-gray-100 p-2 rounded"><code>{{ openGraphTags }}</code></pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OpenGraphTagsGenerator',
  data() {
    return {
      title: '',
      description: '',
      url: '',
      image: '',
      openGraphTags: ''
    };
  },
  methods: {
    generateOpenGraphTags() {
      this.openGraphTags = `
<meta property="og:title" content="${this.title}">
<meta property="og:description" content="${this.description}">
<meta property="og:url" content="${this.url}">
<meta property="og:image" content="${this.image}">
      `;
    }
  }
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>

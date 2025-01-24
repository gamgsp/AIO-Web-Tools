<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Social Media Preview Card Generator</h2>
    <p class="text-lg mb-6">This tool allows you to generate preview cards for social media posts. Fill in the details and click "Generate" to create the social media preview card.</p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Generate Social Media Preview Card:</h4>
        <p class="text-lg mb-6">Fill in the details for title, description, URL, and image. Click "Generate" to get the preview card.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="generatePreviewCard">
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
    <div class="generated-preview-card mt-4" v-if="previewCardHtml">
      <h3 class="text-2xl font-bold mb-2">Generated Social Media Preview Card</h3>
      <div v-html="previewCardHtml"></div>
      <pre class="bg-gray-100 p-2 rounded"><code>{{ previewCardHtml }}</code></pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SocialMediaPreviewCardGenerator',
  data() {
    return {
      title: '',
      description: '',
      url: '',
      image: '',
      previewCardHtml: ''
    };
  },
  methods: {
    generatePreviewCard() {
      // Validate the image URL by checking if it starts with http or https
      if (this.image && !/^https?:\/\//.test(this.image)) {
        this.image = 'https://' + this.image;
      }

      this.previewCardHtml = `
<div style="width: 500px; border: 1px solid #ccc; padding: 16px; font-family: Arial, sans-serif;">
  <a href="${this.url}" style="text-decoration: none; color: inherit;">
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <img src="${this.image}" alt="Preview Image" style="width: 100%; height: auto; border-radius: 8px;">
      <h2 style="margin: 0; font-size: 1.5em; color: #333;">${this.title}</h2>
      <p style="margin: 0; font-size: 1em; color: #555;">${this.description}</p>
      <p style="margin: 0; font-size: 0.875em; color: #007bff;">${this.url}</p>
    </div>
  </a>
</div>
      `;
    }
  }
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>
<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">SERP Preview Tool</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The SERP Preview Tool helps you visualize how your webpage's title, URL, and meta description will appear in search engine results.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example Title:</h4>
        <pre class="bg-gray-100 p-2 rounded">
Discover the Best Restaurants in Town
        </pre>
        <h4 class="text-lg font-bold mb-2">Example URL:</h4>
        <pre class="bg-gray-100 p-2 rounded">
www.example.com/best-restaurants
        </pre>
        <h4 class="text-lg font-bold mb-2">Example Description:</h4>
        <pre class="bg-gray-100 p-2 rounded">
Find out where to eat and what to order with our comprehensive guide to the best restaurants in your area.
        </pre>
        <p class="text-lg mb-6">Enter your own title, URL, and description to see how they will appear on search engine results.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="previewSerp">
        <div class="form-group mb-4">
          <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <input id="title" v-model="title" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter title..."/>
        </div>
        <div class="form-group mb-4">
          <label for="url" class="block text-gray-700 text-sm font-bold mb-2">URL:</label>
          <input id="url" v-model="url" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter URL..."/>
        </div>
        <div class="form-group mb-4">
          <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Description:</label>
          <textarea id="description" v-model="description" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="5" placeholder="Enter description..."></textarea>
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="loading">
            Preview
          </button>
        </div>
      </form>
    </div>
    <div v-if="result" class="serp-preview mt-6">
      <div class="serp-title">{{ result.title }}</div>
      <div class="serp-url">{{ result.url }}</div>
      <div class="serp-description">{{ result.description }}</div>
    </div>
    <div v-if="error" class="generated-info mt-4">
      <p class="error text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SerpPreviewTool',
  data() {
    return {
      title: '',
      url: '',
      description: '',
      result: null,
      error: '',
      loading: false,
    };
  },
  methods: {
    previewSerp() {
      this.loading = true;
      this.error = '';
      this.result = null;
      try {
        if (this.title.trim() === '' || this.url.trim() === '' || this.description.trim() === '') {
          throw new Error('Title, URL, and description fields cannot be empty.');
        }
        this.result = {
          title: this.title.trim(),
          url: this.url.trim(),
          description: this.description.trim(),
        };
      } catch (error) {
        this.error = `Error: ${error.message}`;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
@import '@/assets/toolstyles.css'; /* This imports your default CSS */
</style>

<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">SEO Title & Description Analyzer</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The SEO Title & Description Analyzer tool helps you analyze and optimize your titles and descriptions for search engines.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example Title:</h4>
        <pre class="bg-gray-100 p-2 rounded">
Discover the Best Restaurants in Town
        </pre>
        <h4 class="text-lg font-bold mb-2">Example Description:</h4>
        <pre class="bg-gray-100 p-2 rounded">
Find out where to eat and what to order with our comprehensive guide to the best restaurants in your area.
        </pre>
        <p class="text-lg mb-6">Enter your own title and description to analyze their effectiveness.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="analyzeSeo">
        <div class="form-group mb-4">
          <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <input id="title" v-model="title" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter title..."/>
        </div>
        <div class="form-group mb-4">
          <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Description:</label>
          <textarea id="description" v-model="description" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="5" placeholder="Enter description..."></textarea>
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="loading">
            Analyze
          </button>
        </div>
      </form>
    </div>
    <div v-if="result !== null || error" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Analysis Result</h3>
      <div v-if="result !== null" class="result">
        <p><strong>Title Length:</strong> {{ result.titleLength }} characters</p>
        <p><strong>Description Length:</strong> {{ result.descriptionLength }} characters</p>
        <p><strong>Title Analysis:</strong> {{ result.titleAnalysis }}</p>
        <p><strong>Description Analysis:</strong> {{ result.descriptionAnalysis }}</p>
      </div>
      <p v-if="error" class="error text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SeoAnalyzer',
  data() {
    return {
      title: '',
      description: '',
      result: null,
      error: '',
      loading: false,
    };
  },
  methods: {
    analyzeSeo() {
      this.loading = true;
      this.error = '';
      this.result = null;
      try {
        const titleLength = this.title.trim().length;
        const descriptionLength = this.description.trim().length;
        const titleAnalysis = this.getTitleAnalysis(titleLength);
        const descriptionAnalysis = this.getDescriptionAnalysis(descriptionLength);

        this.result = {
          titleLength,
          descriptionLength,
          titleAnalysis,
          descriptionAnalysis,
        };
      } catch (error) {
        this.error = `Error: ${error.message}`;
      } finally {
        this.loading = false;
      }
    },
    getTitleAnalysis(length) {
      if (length === 0) {
        return 'Title is empty. Please provide a title.';
      } else if (length > 60) {
        return 'Title is too long. It should be under 60 characters.';
      } else {
        return 'Title length is good.';
      }
    },
    getDescriptionAnalysis(length) {
      if (length === 0) {
        return 'Description is empty. Please provide a description.';
      } else if (length > 160) {
        return 'Description is too long. It should be under 160 characters.';
      } else {
        return 'Description length is good.';
      }
    },
  },
};
</script>

<style scoped>
@import '@/assets/toolstyles.css'; /* This imports your default CSS */
</style>

<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Keyword Density Checker</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Keyword Density Checker tool helps you calculate the keyword density in a given text.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example Text:</h4>
        <pre class="bg-gray-100 p-2 rounded">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </pre>
        <p class="text-lg mb-6">Enter the keyword and text to check its density.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="checkKeywordDensity">
        <div class="form-group mb-4">
          <label for="keyword" class="block text-gray-700 text-sm font-bold mb-2">Keyword:</label>
          <input id="keyword" v-model="keyword" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter keyword..."/>
        </div>
        <div class="form-group mb-4">
          <label for="text" class="block text-gray-700 text-sm font-bold mb-2">Text:</label>
          <textarea id="text" v-model="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" placeholder="Enter text..."></textarea>
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="loading">
            Check Density
          </button>
        </div>
      </form>
    </div>
    <div v-if="result !== null || error" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Keyword Density</h3>
      <p v-if="result !== null" class="result">{{ result }}%</p>
      <p v-if="error" class="error text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KeywordDensityChecker',
  data() {
    return {
      keyword: '',
      text: '',
      result: null,
      error: '',
      loading: false,
    };
  },
  methods: {
    checkKeywordDensity() {
      this.loading = true;
      this.error = '';
      this.result = null;
      try {
        const keywords = this.keyword.trim().toLowerCase().split(/\s+/);
        const text = this.text.trim().toLowerCase();
        if (keywords.length === 0 || text === '') {
          throw new Error('Keyword and text fields cannot be empty.');
        }
        const totalWords = text.split(/\s+/).length;
        let keywordCount = 0;
        keywords.forEach(keyword => {
          keywordCount += (text.match(new RegExp(`\\b${keyword}\\b`, 'gi')) || []).length;
        });
        const density = ((keywordCount / totalWords) * 100).toFixed(2);
        this.result = density;
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

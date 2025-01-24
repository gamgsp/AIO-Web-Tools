<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Content Word Counter</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Content Word Counter helps you count the number of words in your text.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example Text:</h4>
        <pre class="bg-gray-100 p-2 rounded">
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </pre>
        <p class="text-lg mb-6">Enter your text to count the number of words.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="countWords">
        <div class="form-group mb-4">
          <label for="text" class="block text-gray-700 text-sm font-bold mb-2">Text:</label>
          <textarea id="text" v-model="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="5" placeholder="Enter text..."></textarea>
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="loading">
            <span v-if="loading" class="spinner-border"></span>
            <span v-else>Count Words</span>
          </button>
        </div>
      </form>
    </div>
    <div v-if="result !== null || error" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Word Count</h3>
      <div v-if="result !== null" class="result">
        <p><strong>Total Words:</strong> {{ result }}</p>
      </div>
      <p v-if="error" class="error text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentWordCounter',
  data() {
    return {
      text: '',
      result: null,
      error: '',
      loading: false,
    };
  },
  methods: {
    countWords() {
      this.loading = true;
      this.error = '';
      this.result = null;
      try {
        const wordCount = this.text.trim().split(/\s+/).length;
        this.result = wordCount;
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
@import '@/assets/toolstyles.css';
</style>

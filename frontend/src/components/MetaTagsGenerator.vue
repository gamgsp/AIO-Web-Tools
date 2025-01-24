<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Meta Tags Generator</h2>
    <p class="text-lg mb-6">This tool allows you to generate meta tags for your website. Simply fill in the details below and click "Generate" to create the meta tags.</p>
    <div class="tool-form">
      <form @submit.prevent="generateMetaTags">
        <div class="form-group mb-4">
          <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <input id="title" v-model="title" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter website title">
        </div>
        <div class="form-group mb-4">
          <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Description:</label>
          <textarea id="description" v-model="description" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="4" placeholder="Enter website description"></textarea>
        </div>
        <div class="form-group mb-4">
          <label for="keywords" class="block text-gray-700 text-sm font-bold mb-2">Keywords:</label>
          <input id="keywords" v-model="keywords" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter keywords separated by commas">
        </div>
        <div class="form-group mb-4">
          <label for="author" class="block text-gray-700 text-sm font-bold mb-2">Author:</label>
          <input id="author" v-model="author" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter author name">
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate</button>
        </div>
      </form>
    </div>
    <div class="generated-meta-tags mt-4" v-if="metaTags">
      <h3 class="text-2xl font-bold mb-2">Generated Meta Tags</h3>
      <pre class="bg-gray-100 p-2 rounded"><code>{{ metaTags }}</code></pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MetaTagsGenerator',
  data() {
    return {
      title: '',
      description: '',
      keywords: '',
      author: '',
      metaTags: ''
    };
  },
  methods: {
    generateMetaTags() {
      const metaTags = `
<meta name="title" content="${this.title}">
<meta name="description" content="${this.description}">
<meta name="keywords" content="${this.keywords}">
<meta name="author" content="${this.author}">
      `;
      this.metaTags = metaTags.trim();
    }
  }
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>

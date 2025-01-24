<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">UTM Link Generator (Google Analytics)</h2>
    <p class="text-lg mb-6">This tool allows you to generate UTM links for Google Analytics. Fill in the details and click "Generate" to create the UTM link.</p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Generate UTM Link:</h4>
        <p class="text-lg mb-6">Fill in the details for campaign source, medium, name, term, and content. Click "Generate" to get the UTM link.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="generateUtmLink">
        <div class="form-group mb-4">
          <label for="baseUrl" class="block text-gray-700 text-sm font-bold mb-2">Base URL:</label>
          <input id="baseUrl" v-model="baseUrl" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter base URL (e.g., https://www.example.com)">
        </div>
        <div class="form-group mb-4">
          <label for="campaignSource" class="block text-gray-700 text-sm font-bold mb-2">Campaign Source:</label>
          <input id="campaignSource" v-model="campaignSource" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter campaign source (e.g., google)">
        </div>
        <div class="form-group mb-4">
          <label for="campaignMedium" class="block text-gray-700 text-sm font-bold mb-2">Campaign Medium:</label>
          <input id="campaignMedium" v-model="campaignMedium" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter campaign medium (e.g., cpc)">
        </div>
        <div class="form-group mb-4">
          <label for="campaignName" class="block text-gray-700 text-sm font-bold mb-2">Campaign Name:</label>
          <input id="campaignName" v-model="campaignName" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter campaign name (e.g., spring_sale)">
        </div>
        <div class="form-group mb-4">
          <label for="campaignTerm" class="block text-gray-700 text-sm font-bold mb-2">Campaign Term (Optional):</label>
          <input id="campaignTerm" v-model="campaignTerm" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter campaign term (e.g., running shoes)">
        </div>
        <div class="form-group mb-4">
          <label for="campaignContent" class="block text-gray-700 text-sm font-bold mb-2">Campaign Content (Optional):</label>
          <input id="campaignContent" v-model="campaignContent" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter campaign content (e.g., banner ad)">
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate</button>
        </div>
      </form>
    </div>
    <div class="generated-utm-link mt-4" v-if="utmLink">
      <h3 class="text-2xl font-bold mb-2">Generated UTM Link</h3>
      <pre class="bg-gray-100 p-2 rounded"><code>{{ utmLink }}</code></pre>
      <a :href="utmLink" target="_blank" class="text-blue-500">Open UTM Link</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UtmLinkGenerator',
  data() {
    return {
      baseUrl: '',
      campaignSource: '',
      campaignMedium: '',
      campaignName: '',
      campaignTerm: '',
      campaignContent: '',
      utmLink: ''
    };
  },
  methods: {
    generateUtmLink() {
      const params = new URLSearchParams();
      if (this.campaignSource) params.append('utm_source', this.campaignSource);
      if (this.campaignMedium) params.append('utm_medium', this.campaignMedium);
      if (this.campaignName) params.append('utm_campaign', this.campaignName);
      if (this.campaignTerm) params.append('utm_term', this.campaignTerm);
      if (this.campaignContent) params.append('utm_content', this.campaignContent);
      this.utmLink = `${this.baseUrl}?${params.toString()}`;
    }
  }
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>
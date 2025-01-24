<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Whois Lookup</h2>
    <p class="text-lg mb-6">Enter a domain name below to retrieve its Whois information.</p>
    <div class="tool-form">
      <form @submit.prevent="performLookup">
        <div class="form-group mb-4">
          <label for="domain" class="block text-gray-700 text-sm font-bold mb-2">Domain:</label>
          <input id="domain" v-model="domain" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter domain name">
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span v-else>Lookup</span>
          </button>
        </div>
      </form>
    </div>
    <div class="generated-meta-tags mt-4" v-if="result">
      <h3 class="text-2xl font-bold mb-2">Whois Information</h3>
      <pre class="bg-gray-100 p-2 rounded"><code v-html="formatWhois(result)"></code></pre>
    </div>
    <div v-if="error" class="error text-red-500 mt-4">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhoisLookup',
  data() {
    return {
      domain: '',
      result: null,
      error: null,
      loading: false, // Add loading state
    };
  },
  methods: {
    async performLookup() {
      this.loading = true; // Set loading to true
      this.error = null;
      this.result = null;
      try {
        const response = await fetch(`http://localhost:5000/whois?domain=${this.domain}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.result = data.result;
      } catch (error) {
        this.error = 'Failed to perform lookup';
      } finally {
        this.loading = false; // Set loading to false
      }
    },
    formatWhois(whoisData) {
      // Function to format the WHOIS data
      return whoisData.replace(/(^|\s)([A-Za-z\s]+:)/g, '$1<b>$2</b>');
    },
  },
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>
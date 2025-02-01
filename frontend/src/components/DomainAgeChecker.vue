<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Domain Age Checker</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Domain Age Checker tool helps you determine how long a domain has been active by checking its registration date. This can be useful for assessing the reliability and trustworthiness of a website.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Check Domain Age:</h4>
        <p class="text-lg mb-6">Enter your domain like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
facebook.com
        </pre>
        <p class="text-lg mb-6">Click "Check Age" to get the following domain age data:</p>
        <pre class="bg-gray-100 p-2 rounded">
Domain: facebook.com
Registration Date: 1997-03-29
Domain Age: 27 years
        </pre>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="checkDomainAge">
        <div class="form-group mb-4">
          <label for="domain" class="block text-gray-700 text-sm font-bold mb-2">Domain:</label>
          <input id="domain" v-model="domain" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter Domain">
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span v-else>Check Age</span>
          </button>
        </div>
      </form>
    </div>
    <div v-if="result || error" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2 text-center">Domain Age Results</h3>
      <div v-if="result">
        <p><strong>Domain:</strong> {{ result.domain }}</p>
        <p><strong>Registration Date:</strong> {{ result.registrationDate }}</p>
        <p><strong>Domain Age:</strong> {{ result.age }}</p>
      </div>
      <p class="error text-red-500" v-else>{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DomainAgeChecker',
  data() {
    return {
      domain: '',
      result: null,
      error: null,
      loading: false,
    };
  },
  methods: {
    async checkDomainAge() {
      if (!this.domain) {
        this.error = 'Please enter a valid domain.';
        return;
      }
      this.loading = true;
      this.error = null;
      this.result = null;
      try {
        // Detect current protocol and host
        const protocol = window.location.protocol;
        const host = window.location.hostname;
        const port = 5000;

        // Construct the API URL with the correct port
        const apiUrl = `${protocol}//${host}:${port}/domainage?domain=${encodeURIComponent(this.domain)}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.result = data;
      } catch (error) {
        this.error = 'Failed to check domain age';
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

<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">SSL Certificate Checker</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The SSL Certificate Checker tool allows you to check the SSL certificate details of a given domain. This includes information such as the issuer, validity period, and more.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Check SSL Certificate:</h4>
        <p class="text-lg mb-6">Enter the domain name like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
example.com
        </pre>
        <p class="text-lg mb-6">Click "Check" to retrieve the SSL certificate details:</p>
        <pre class="bg-gray-100 p-2 rounded">
Issuer: Let's Encrypt
Valid From: 2023-01-01
Valid To: 2023-04-01
        </pre>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="performCheck">
        <div class="form-group mb-4">
          <label for="domain" class="block text-gray-700 text-sm font-bold mb-2">Domain:</label>
          <input id="domain" v-model="domain" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter domain name">
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span v-else>Check</span>
          </button>
        </div>
      </form>
    </div>
    <div v-if="result || error" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">SSL Certificate Details</h3>
      <pre class="bg-gray-100 p-2 rounded" v-if="result"><code v-html="formatSslInfo(result)"></code></pre>
      <p class="error text-red-500" v-else>No SSL certificate found for this domain.</p>
    </div>
    <div v-if="error" class="error text-red-500 mt-4">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SslCertificateChecker',
  data() {
    return {
      domain: '',
      result: null,
      error: null,
      loading: false,
    };
  },
  methods: {
    async performCheck() {
      if (!this.domain) {
        this.error = 'Please enter a valid domain name.';
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
        const apiUrl = `${protocol}//${host}:${port}/sslcheck?domain=${this.domain}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.result = data;
        if (!this.result || Object.keys(this.result).length === 0) {
          this.error = 'No SSL certificate found for this domain.';
        }
      } catch (error) {
        this.error = 'Failed to perform SSL check';
      } finally {
        this.loading = false;
      }
    },
    formatSslInfo(data) {
      return Object.entries(data).map(([key, value]) => `<b>${key}:</b> ${value}`).join('<br>');
    },
  },
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>

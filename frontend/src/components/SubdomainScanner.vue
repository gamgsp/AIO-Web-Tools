<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Subdomain Scanner</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Subdomain Scanner helps you discover subdomains associated with a given domain, which can be valuable for security assessments and SEO analysis. Simply enter the domain and scan for subdomains.
    </p>
    <div class="tool-example mb-6">
      <p class="text-lg mb-4"><strong>Usage Example:</strong></p>
      <div class="example-section mb-4">
        <h4 class="text-lg font-bold mb-2">Example 1:</h4>
        <p class="bg-gray-100 p-2 rounded">Domain: example.com<br>Found Subdomains: www.example.com, mail.example.com</p>
      </div>
    </div>
    <div class="tool-form">
      <div class="form-group mb-4">
        <label for="domain" class="block text-gray-700 text-sm font-bold mb-2">Domain:</label>
        <input id="domain" v-model="domain" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="example.com"/>
      </div>
      <div class="tool-actions">
        <button @click="scanSubdomains" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Scan Subdomains</button>
      </div>
    </div>
    <div v-if="subdomains" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Found Subdomains</h3>
      <ul class="bg-gray-100 p-2 rounded">
        <li v-for="subdomain in subdomains" :key="subdomain">{{ subdomain }}</li>
      </ul>
    </div>
    <div v-if="error" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Error</h3>
      <p class="bg-red-100 p-2 rounded text-red-700">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  name: 'SubdomainScanner',
  setup() {
    const domain = ref('');
    const subdomains = ref(null);
    const error = ref(null);

    const scanSubdomains = async () => {
      try {
        const response = await axios.post('http://localhost:5000/scan-subdomains', { domain: domain.value });
        subdomains.value = response.data.subdomains;
        error.value = null;
      } catch (err) {
        error.value = err.response?.data?.error || 'An error occurred while scanning for subdomains.';
        subdomains.value = null;
      }
    };

    return {
      domain,
      subdomains,
      error,
      scanSubdomains
    };
  }
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';

.bg-red-100 {
  background-color: #ffe6e6;
}

.text-red-700 {
  color: #d21c1c;
}
</style>

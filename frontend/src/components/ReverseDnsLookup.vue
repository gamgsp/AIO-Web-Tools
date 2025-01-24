<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Reverse DNS Lookup</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Reverse DNS Lookup tool allows you to retrieve the domain name associated with a given IP address. This information is useful for identifying the hostname corresponding to an IP address.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Perform Reverse DNS Lookup:</h4>
        <p class="text-lg mb-6">Enter the IP address like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
8.8.8.8
        </pre>
        <p class="text-lg mb-6">Click "Lookup" to retrieve the associated domain name:</p>
        <pre class="bg-gray-100 p-2 rounded">
Domain: dns.google
        </pre>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="performLookup">
        <div class="form-group mb-4">
          <label for="ipAddress" class="block text-gray-700 text-sm font-bold mb-2">IP Address:</label>
          <input id="ipAddress" v-model="ipAddress" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter IP address">
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span v-else>Lookup</span>
          </button>
        </div>
      </form>
    </div>
    <div class="generated-dns-records mt-4" v-if="result">
      <h3 class="text-2xl font-bold mb-2">Domain Name</h3>
      <pre class="bg-gray-100 p-2 rounded" v-if="result.length"><code v-html="formatDnsRecords(result)"></code></pre>
      <p class="error text-red-500" v-else>No records found for this IP address.</p>
    </div>
    <div v-if="error" class="error text-red-500 mt-4">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReverseDnsLookup',
  data() {
    return {
      ipAddress: '',
      result: null,
      error: null,
      loading: false,
    };
  },
  methods: {
    isValidIp(ip) {
      const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4})$/;
      return ipv4Pattern.test(ip) || ipv6Pattern.test(ip);
    },
    async performLookup() {
      if (!this.isValidIp(this.ipAddress)) {
        this.error = 'Please enter a valid IP address.';
        return;
      }
      this.loading = true;
      this.error = null;
      this.result = null;
      try {
        const response = await fetch(`http://localhost:5000/reversedns?ip=${this.ipAddress}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.result = data.domains;
        if (!this.result || this.result.length === 0) {
          this.error = 'No records found for this IP address.';
        }
      } catch (error) {
        this.error = 'Failed to perform lookup';
      } finally {
        this.loading = false;
      }
    },
    formatDnsRecords(records) {
      return records.map(record => `<b>Domain:</b> ${record}`).join('<br>');
    },
  },
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>

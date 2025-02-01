<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Whois Lookup</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Whois Lookup tool allows you to retrieve Whois information for a given domain. This information includes domain registration details, registrar information, and more.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Check Whois Information:</h4>
        <p class="text-lg mb-6">Enter your domain like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
google.com
        </pre>
        <p class="text-lg mb-6">Click "Lookup" to retrieve the Whois information:</p>
        <pre class="bg-gray-100 p-2 rounded">
Domain Name: google.com
Registrar: MarkMonitor Inc.
Registration Date: 1997-09-15
Updated Date: 2021-09-09
Expiration Date: 2028-09-14
        </pre>
      </div>
    </div>
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
      loading: false,
    };
  },
  methods: {
    async performLookup() {
      this.loading = true;
      this.error = null;
      this.result = null;
      try {
        // Detect current protocol and host
        const protocol = window.location.protocol;
        const host = window.location.hostname;
        const port = 5000;

        // Construct the API URL with the correct port
        const apiUrl = `${protocol}//${host}:${port}/whois?domain=${this.domain}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.result = data.result;
      } catch (error) {
        this.error = 'Failed to perform lookup';
      } finally {
        this.loading = false;
      }
    },
    formatWhois(whoisData) {
      // Function to format the WHOIS data
      return whoisData
        .replace(/(Domain name:|Registry Domain ID:|Registrar WHOIS Server:|Registrar URL:|Updated Date:|Creation Date:|Registrar Registration Expiration Date:|Registrar:|Registrar IANA ID:|Registrar Abuse Contact Email:|Registrar Abuse Contact Phone:|Reseller:|Domain Status:|Registry Registrant ID:|Registrant Name:|Registrant Organization:|Registrant Street:|Registrant City:|Registrant State\/Province:|Registrant Postal Code:|Registrant Country:|Registrant Phone:|Registrant Phone Ext:|Registrant Fax:|Registrant Fax Ext:|Registrant Email:|Registry Admin ID:|Admin Name:|Admin Organization:|Admin Street:|Admin City:|Admin State\/Province:|Admin Postal Code:|Admin Country:|Admin Phone:|Admin Phone Ext:|Admin Fax:|Admin Fax Ext:|Admin Email:|Registry Tech ID:|Tech Name:|Tech Organization:|Tech Street:|Tech City:|Tech State\/Province:|Tech Postal Code:|Tech Country:|Tech Phone:|Tech Phone Ext:|Tech Fax:|Tech Fax Ext:|Tech Email:|Name Server:|DNSSEC:|URL of the ICANN WHOIS Data Problem Reporting System:|>>> Last update of WHOIS database:|For more information on Whois status codes, please visit)/g, '<b>$1</b>');
    },
  },
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>

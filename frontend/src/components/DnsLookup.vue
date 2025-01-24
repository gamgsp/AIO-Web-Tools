<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">DNS Lookup</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The DNS Lookup tool allows you to retrieve DNS records for a given domain. This information includes various types of DNS records such as A, AAAA, CNAME, MX, NS, and more.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Check DNS Records:</h4>
        <p class="text-lg mb-6">Enter your domain like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
google.com
        </pre>
        <p class="text-lg mb-6">Select the record type (e.g., A, MX, TXT), then click "Lookup" to retrieve the DNS records:</p>
        <pre class="bg-gray-100 p-2 rounded">
Record Type: A
IP Address: 142.250.72.14
TTL: 300
        </pre>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="performLookup">
        <div class="form-group mb-4">
          <label for="domain" class="block text-gray-700 text-sm font-bold mb-2">Domain:</label>
          <input id="domain" v-model="domain" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter domain name">
        </div>
        <div class="form-group mb-4">
          <label for="recordType" class="block text-gray-700 text-sm font-bold mb-2">Record Type:</label>
          <select id="recordType" v-model="recordType" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="A">A</option>
            <option value="AAAA">AAAA</option>
            <option value="CNAME">CNAME</option>
            <option value="MX">MX</option>
            <option value="NS">NS</option>
            <option value="TXT">TXT</option>
            <option value="SRV">SRV</option>
            <option value="PTR">PTR</option>
            <option value="SOA">SOA</option>
            <option value="ANY">ANY</option>
            <option value="CAA">CAA</option>
            <option value="NAPTR">NAPTR</option>
            <option value="DNSKEY">DNSKEY</option>
            <option value="DS">DS</option>
            <option value="RRSIG">RRSIG</option>
            <option value="NSEC">NSEC</option>
          </select>
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
      <h3 class="text-2xl font-bold mb-2">DNS Records</h3>
      <pre class="bg-gray-100 p-2 rounded" v-if="result.length"><code v-html="formatDnsRecords(result)"></code></pre>
      <p class="error text-red-500" v-else>No records found for this record type.</p>
    </div>
    <div v-if="error" class="error text-red-500 mt-4">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DnsLookup',
  data() {
    return {
      domain: '',
      recordType: 'ANY',
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
        const response = await fetch(`http://localhost:5000/dnslookup?domain=${this.domain}&type=${this.recordType}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.result = data.records;
        if (!this.result || this.result.length === 0) {
          this.error = 'No records found for this record type.';
        }
      } catch (error) {
        this.error = 'No records found for this record type.';
      } finally {
        this.loading = false;
      }
    },
    formatDnsRecords(records) {
      return records.map(record => {
        if (typeof record === 'object') {
          return Object.entries(record).map(([key, value]) => `<b>${key}:</b> ${value}`).join('<br>');
        }
        return record;
      }).join('<br><br>');
    },
  },
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>

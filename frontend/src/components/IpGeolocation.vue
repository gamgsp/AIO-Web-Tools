<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">IP Address Geolocation</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The IP Address Geolocation tool allows you to retrieve geolocation information for a given IP address. This information includes the country, city, latitude, longitude, and more.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Perform IP Geolocation Lookup:</h4>
        <p class="text-lg mb-6">Enter the IP address like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
8.8.8.8
        </pre>
        <p class="text-lg mb-6">Click "Lookup" to retrieve the geolocation information:</p>
        <pre class="bg-gray-100 p-2 rounded">
Country: United States
City: Mountain View
Latitude: 37.4056
Longitude: -122.0775
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
    <div v-if="result || error" class="generated-geolocation mt-4">
      <h3 class="text-2xl font-bold mb-2">Geolocation Information</h3>
      <pre class="bg-gray-100 p-2 rounded" v-if="result"><code v-html="formatGeolocation(result)"></code></pre>
      <p class="error text-red-500" v-else>No records found for this IP address.</p>
    </div>
    <div v-if="error" class="error text-red-500 mt-4">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IpGeolocation',
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
        const response = await fetch(`http://localhost:5000/ipgeolocation?ip=${this.ipAddress}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.result = data;
        if (!this.result || Object.keys(this.result).length === 0) {
          this.error = 'No records found for this IP address.';
        }
      } catch (error) {
        this.error = 'Failed to perform lookup';
      } finally {
        this.loading = false;
      }
    },
    formatGeolocation(data) {
      return Object.entries(data).map(([key, value]) => `<b>${key}:</b> ${value}`).join('<br>');
    },
  },
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>

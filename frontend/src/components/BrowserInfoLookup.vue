<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Browser Information Lookup</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Browser Information Lookup tool helps you retrieve detailed information about your browser, such as the user agent, browser name, version, and more. This information is useful for debugging and ensuring compatibility with different browsers.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Retrieve Browser Information:</h4>
        <p class="text-lg mb-6">Click "Get Info" to retrieve the browser information:</p>
        <pre class="bg-gray-100 p-2 rounded">
User Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36
Browser Name: Chrome
Browser Version: 96.0.4664.110
        </pre>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="getBrowserInfo">
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Get Info</button>
        </div>
      </form>
    </div>
    <div v-if="result" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Browser Information</h3>
      <pre class="bg-gray-100 p-2 rounded">{{ result }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BrowserInfoLookup',
  data() {
    return {
      result: null,
    };
  },
  methods: {
    getBrowserInfo() {
      const userAgent = navigator.userAgent;
      const browserName = this.getBrowserName(userAgent);
      const browserVersion = this.getBrowserVersion(userAgent);

      this.result = `User Agent: ${userAgent}\nBrowser Name: ${browserName}\nBrowser Version: ${browserVersion}`;
    },
    getBrowserName(userAgent) {
      if (userAgent.indexOf("Firefox") > -1) {
        return "Firefox";
      } else if (userAgent.indexOf("SamsungBrowser") > -1) {
        return "Samsung Internet";
      } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
        return "Opera";
      } else if (userAgent.indexOf("Trident") > -1) {
        return "Internet Explorer";
      } else if (userAgent.indexOf("Edge") > -1) {
        return "Microsoft Edge";
      } else if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
      } else if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
      } else {
        return "Unknown";
      }
    },
    getBrowserVersion(userAgent) {
      const browserMatch = userAgent.match(/(chrome|firefox|msie|safari|opr|trident|edge|opera|samsungbrowser|version)[/\s]?([\d.]+)/i);
      if (browserMatch && browserMatch.length > 2) {
        return browserMatch[2];
      }
      return "Unknown";
    },
  },
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>
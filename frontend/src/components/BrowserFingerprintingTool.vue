<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Browser Fingerprinting Tool</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Browser Fingerprinting Tool helps you gather and analyze information about the browser and device being used.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example Fingerprint:</h4>
        <pre class="bg-gray-100 p-2 rounded">
{
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
  "language": "en-US",
  "platform": "Win32",
  "screenResolution": "1920x1080"
}
        </pre>
        <p class="text-lg mb-6">This is a sample browser fingerprint. Click the button below to generate a fingerprint of your current browser.</p>
      </div>
    </div>
    <div class="tool-actions">
      <button @click="generateFingerprint" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate Fingerprint</button>
    </div>
    <div v-if="fingerprint" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Browser Fingerprint</h3>
      <pre class="bg-gray-100 p-2 rounded break-words">{{ fingerprint }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BrowserFingerprintingTool',
  data() {
    return {
      fingerprint: null,
    };
  },
  methods: {
    generateFingerprint() {
      const fingerprint = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screenResolution: `${window.screen.width}x${window.screen.height}`
      };
      this.fingerprint = JSON.stringify(fingerprint, null, 2);
    },
  },
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';

.break-words {
  word-break: break-word;
}
</style>

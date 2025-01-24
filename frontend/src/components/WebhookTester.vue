<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Webhook Tester</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Webhook Tester helps you send and test webhooks with custom payloads.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example Webhook URL:</h4>
        <pre class="bg-gray-100 p-2 rounded">
https://example.com/webhook
        </pre>
        <p class="text-lg mb-6">This is a sample webhook URL. Enter your webhook URL to test with custom payloads.</p>
      </div>
    </div>
    <div class="tool-form">
      <div class="form-group mb-4">
        <label for="webhookUrl" class="block text-gray-700 text-sm font-bold mb-2">Webhook URL:</label>
        <input id="webhookUrl" v-model="webhookUrl" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="https://example.com/webhook"/>
      </div>
      <div class="form-group mb-4">
        <label for="payload" class="block text-gray-700 text-sm font-bold mb-2">Payload (JSON format):</label>
        <textarea id="payload" v-model="payload" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="4" placeholder='{"key": "value"}'></textarea>
      </div>
      <div class="tool-actions">
        <button @click="sendWebhook" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="loading">
          <span v-if="loading" class="spinner-border"></span>
          <span v-else>Send Webhook</span>
        </button>
      </div>
    </div>
    <div v-if="response" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Response</h3>
      <pre class="bg-gray-100 p-2 rounded break-words">{{ formattedResponse }}</pre>
    </div>
    <div v-if="error" class="generated-info mt-4 text-red-500">
      <h3 class="text-2xl font-bold mb-2">Error</h3>
      <pre class="bg-gray-100 p-2 rounded break-words">{{ error }}</pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'WebhookTester',
  data() {
    return {
      webhookUrl: '',
      payload: '{}',
      response: null,
      error: '',
      loading: false,
    };
  },
  computed: {
    formattedResponse() {
      return typeof this.response === 'object' ? JSON.stringify(this.response, null, 2) : this.response;
    }
  },
  methods: {
    async sendWebhook() {
      this.loading = true;
      this.response = null;
      this.error = '';
      try {
        const parsedPayload = JSON.parse(this.payload);
        if (!this.isJsonString(this.payload)) {
          throw new Error('Invalid JSON format in payload');
        }
        const res = await axios.post(this.webhookUrl, parsedPayload);
        this.response = res.data;
      } catch (err) {
        this.error = err.response ? JSON.stringify(err.response.data, null, 2) : err.message;
      } finally {
        this.loading = false;
      }
    },
    isJsonString(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    }
  },
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';

.break-words {
  word-break: break-word;
}
</style>

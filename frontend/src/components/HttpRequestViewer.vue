<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">HTTP Request Viewer</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The HTTP Request Viewer helps you view and analyze HTTP requests.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example HTTP Request:</h4>
        <pre class="bg-gray-100 p-2 rounded">
GET /example-path HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0
Accept: */*
        </pre>
        <p class="text-lg mb-6">This is a simple HTTP GET request example.</p>
      </div>
    </div>
    <div class="tool-form">
      <div class="form-group mb-4">
        <label for="requestMethod" class="block text-gray-700 text-sm font-bold mb-2">Request Method:</label>
        <select id="requestMethod" v-model="requestMethod" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <div class="form-group mb-4">
        <label for="requestUrl" class="block text-gray-700 text-sm font-bold mb-2">Request URL:</label>
        <input id="requestUrl" v-model="requestUrl" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="http://example.com"/>
      </div>
      <div class="form-group mb-4">
        <label for="requestHeaders" class="block text-gray-700 text-sm font-bold mb-2">Request Headers (JSON format):</label>
        <textarea id="requestHeaders" v-model="requestHeaders" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="4" placeholder='{"Content-Type": "application/json"}'></textarea>
      </div>
      <div v-if="requestMethod === 'POST' || requestMethod === 'PUT'" class="form-group mb-4">
        <label for="requestBody" class="block text-gray-700 text-sm font-bold mb-2">Request Body (JSON format):</label>
        <textarea id="requestBody" v-model="requestBody" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="4" placeholder='{"key": "value"}'></textarea>
      </div>
      <div class="tool-actions">
        <button @click="viewRequest" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">View Request</button>
      </div>
    </div>
    <div v-if="displayedRequest" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">HTTP Request</h3>
      <pre class="bg-gray-100 p-2 rounded break-words">{{ displayedRequest }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HttpRequestViewer',
  data() {
    return {
      requestMethod: 'GET',
      requestUrl: '',
      requestHeaders: '{}',
      requestBody: '{}',
      displayedRequest: '',
    };
  },
  methods: {
    viewRequest() {
      let request = `${this.requestMethod} ${this.requestUrl} HTTP/1.1\n`;
      const headers = JSON.parse(this.requestHeaders);
      for (const key in headers) {
        request += `${key}: ${headers[key]}\n`;
      }
      if (this.requestMethod === 'POST' || this.requestMethod === 'PUT') {
        request += `\n${JSON.stringify(JSON.parse(this.requestBody), null, 2)}`;
      }
      this.displayedRequest = request;
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

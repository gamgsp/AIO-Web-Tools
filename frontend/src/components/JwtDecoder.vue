<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">JWT Decoder</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The JWT Decoder helps you decode JSON Web Tokens (JWT) and view their payload.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example JWT:</h4>
        <pre class="bg-gray-100 p-2 rounded">
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
        </pre>
        <p class="text-lg mb-6">This is a sample JWT. Enter your JWT to decode its payload.</p>
      </div>
    </div>
    <div class="tool-form">
      <div class="form-group mb-4">
        <label for="jwt" class="block text-gray-700 text-sm font-bold mb-2">JWT:</label>
        <textarea id="jwt" v-model="jwt" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="4" placeholder="Enter JWT..."></textarea>
      </div>
      <div class="tool-actions">
        <button @click="decodeJwt" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Decode JWT</button>
      </div>
    </div>
    <div v-if="decodedPayload" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Decoded Payload</h3>
      <div class="bg-gray-100 p-2 rounded break-words">
        <p><strong>Subject:</strong> {{ decodedPayload.sub }}</p>
        <p><strong>Name:</strong> {{ decodedPayload.name }}</p>
        <p><strong>Issued At:</strong> {{ new Date(decodedPayload.iat * 1000).toLocaleString() }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JwtDecoder',
  data() {
    return {
      jwt: '',
      decodedPayload: null,
    };
  },
  methods: {
    decodeJwt() {
      try {
        const base64Url = this.jwt.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        this.decodedPayload = JSON.parse(jsonPayload);
      } catch (e) {
        this.decodedPayload = { error: 'Invalid JWT' };
      }
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

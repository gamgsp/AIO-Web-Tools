<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Password Hash Generator</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Password Hash Generator helps you create secure hashed versions of your passwords.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example Password:</h4>
        <pre class="bg-gray-100 p-2 rounded">
password123
        </pre>
        <p class="text-lg mb-6">Enter a password and select a hash type to generate its hash.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="generateHash">
        <div class="form-group mb-4">
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input id="password" v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Enter password..."/>
        </div>
        <div class="form-group mb-4">
          <label for="hashType" class="block text-gray-700 text-sm font-bold mb-2">Hash Type:</label>
          <select id="hashType" v-model="hashType" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="SHA256">SHA-256</option>
            <option value="MD5">MD5</option>
            <option value="SHA1">SHA-1</option>
          </select>
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="loading">
            <span v-if="loading" class="spinner-border"></span>
            <span v-else>Generate Hash</span>
          </button>
        </div>
      </form>
    </div>
    <div v-if="hash || error" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Generated Hash</h3>
      <div v-if="hash" class="result">
        <pre class="break-words bg-gray-100 p-2 rounded">{{ hash }}</pre>
      </div>
      <p v-if="error" class="error text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js';

export default {
  name: 'PasswordHashGenerator',
  data() {
    return {
      password: '',
      hashType: 'SHA256', // Default to SHA-256
      hash: '',
      error: '',
      loading: false,
    };
  },
  methods: {
    generateHash() {
      this.loading = true;
      this.error = '';
      this.hash = '';
      try {
        let hash = '';
        if (this.hashType === 'SHA256') {
          hash = CryptoJS.SHA256(this.password).toString();
        } else if (this.hashType === 'MD5') {
          hash = CryptoJS.MD5(this.password).toString();
        } else if (this.hashType === 'SHA1') {
          hash = CryptoJS.SHA1(this.password).toString();
        }
        this.hash = hash;
      } catch (error) {
        this.error = `Error: ${error.message}`;
      } finally {
        this.loading = false;
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

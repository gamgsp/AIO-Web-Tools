<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">CSRF Token Generator</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The CSRF Token Generator helps you create secure tokens to protect your web application against CSRF attacks.
    </p>
    <div class="tool-example mb-6">
      <h4 class="text-lg font-bold mb-2">Example Token:</h4>
      <pre class="bg-gray-100 p-2 rounded">e9f3c4...5b91</pre>
    </div>
    <div class="tool-actions">
      <button @click="generateToken" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Generate Token
      </button>
    </div>
    <div v-if="token || error" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Generated Token</h3>
      <div v-if="token" class="result">
        <pre class="break-words bg-gray-100 p-2 rounded">{{ token }}</pre>
      </div>
      <p v-if="error" class="error text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CSRFTokenGenerator',
  data() {
    return {
      token: '',
      error: ''
    };
  },
  methods: {
    generateToken() {
      try {
        const token = btoa(crypto.randomUUID());
        this.token = token;
      } catch (error) {
        this.error = `Error: ${error.message}`;
      }
    }
  }
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';

.break-words {
  word-break: break-word;
}
</style>

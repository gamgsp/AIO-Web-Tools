<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Email Address Validator</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Email Address Validator tool helps you validate the syntax and format of email addresses to ensure they are properly structured.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Validate Email Address:</h4>
        <p class="text-lg mb-6">Enter your email addresses (one per line) like this:</p>
        <pre class="bg-gray-100 p-2 rounded">example1@example.com\nexample2@example.com\nexample3@example.com</pre>
        <p class="text-lg mb-6">Click "Validate" to get the validation results.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="validateEmails">
        <div class="form-group mb-4">
          <label for="emails" class="block text-gray-700 text-sm font-bold mb-2">Email Addresses:</label>
          <textarea id="emails" v-model="emails" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" placeholder="Enter email addresses here (one per line)..."></textarea>
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span v-else>Validate</span>
          </button>
        </div>
      </form>
    </div>
    <div v-if="result || error" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Validation Results</h3>
      <pre class="bg-gray-100 p-2 rounded" v-if="result">{{ result }}</pre>
      <p class="error text-red-500" v-else>{{ error }}</p>
    </div>
  </div>
</template>

<script>
import validator from 'validator';

export default {
  name: 'EmailValidator',
  data() {
    return {
      emails: '',
      result: null,
      error: null,
      loading: false,
    };
  },
  methods: {
    validateEmails() {
      if (!this.emails) {
        this.error = 'Please enter at least one email address.';
        return;
      }
      this.loading = true;
      this.error = null;
      this.result = null;
      try {
        const emailList = this.emails.split('\n').map(email => email.trim()).filter(email => email.length > 0);
        const results = emailList.map(email => {
          return `${email}: ${validator.isEmail(email) ? 'Valid' : 'Invalid'}`;
        });
        this.result = results.join('\n');
      } catch (error) {
        this.error = `Failed to validate emails: ${error.message}`;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>

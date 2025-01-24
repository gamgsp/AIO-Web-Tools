<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Password Generator</h2>
    <p class="text-lg mb-6">This tool allows you to generate strong passwords. Specify the criteria and click "Generate" to create a password.</p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Generate Password:</h4>
        <p class="text-lg mb-6">Specify the criteria: length, use of uppercase, lowercase, numbers, and special characters.</p>
        <p class="text-lg mb-6">Click "Generate" to get the password.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="generatePassword">
        <div class="form-group mb-4">
          <label for="length" class="block text-gray-700 text-sm font-bold mb-2">Length:</label>
          <input id="length" v-model="length" type="number" min="1" max="128" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter the length of the password">
        </div>
        <div class="form-group mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Include:</label>
          <div class="checkbox-group">
            <label><input type="checkbox" v-model="includeUppercase"> Uppercase Letters</label>
            <label><input type="checkbox" v-model="includeLowercase"> Lowercase Letters</label>
            <label><input type="checkbox" v-model="includeNumbers"> Numbers</label>
            <label><input type="checkbox" v-model="includeSpecialChars"> Special Characters</label>
          </div>
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate</button>
        </div>
      </form>
    </div>
    <div class="generated-password mt-4" v-if="password">
      <h3 class="text-2xl font-bold mb-2">Generated Password</h3>
      <pre class="bg-gray-100 p-2 rounded"><code>{{ password }}</code></pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PasswordGenerator',
  data() {
    return {
      length: 12,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSpecialChars: true,
      password: ''
    };
  },
  methods: {
    generatePassword() {
      const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowercase = 'abcdefghijklmnopqrstuvwxyz';
      const numbers = '0123456789';
      const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

      let characters = '';
      if (this.includeUppercase) characters += uppercase;
      if (this.includeLowercase) characters += lowercase;
      if (this.includeNumbers) characters += numbers;
      if (this.includeSpecialChars) characters += specialChars;

      if (!characters) {
        this.password = 'Please select at least one character type.';
        return;
      }

      let password = '';
      for (let i = 0; i < this.length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
      }
      this.password = password;
    }
  }
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>

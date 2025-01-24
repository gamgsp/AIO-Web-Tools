<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Fake Data Generator</h2>
    <p class="text-lg mb-6">This tool allows you to generate various types of fake data for testing purposes. Select the type of data and click "Generate" to create the fake data.</p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Generate Fake Data:</h4>
        <p class="text-lg mb-6">Select the type of data (e.g., name, address, email). Click "Generate" to get the fake data.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="generateFakeData">
        <div class="form-group mb-4">
          <label for="dataType" class="block text-gray-700 text-sm font-bold mb-2">Data Type:</label>
          <select id="dataType" v-model="dataType" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="name">Name</option>
            <option value="address">Address</option>
            <option value="email">Email</option>
            <option value="phone">Phone Number</option>
            <option value="company">Company</option>
          </select>
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate</button>
        </div>
      </form>
    </div>
    <div class="generated-data mt-4" v-if="fakeData">
      <h3 class="text-2xl font-bold mb-2">Generated Fake Data</h3>
      <pre class="bg-gray-100 p-2 rounded"><code>{{ fakeData }}</code></pre>
    </div>
  </div>
</template>

<script>
import { faker } from '@faker-js/faker';

export default {
  name: 'FakeDataGenerator',
  data() {
    return {
      dataType: 'name',
      fakeData: ''
    };
  },
  methods: {
    generateFakeData() {
      switch (this.dataType) {
        case 'name':
          this.fakeData = faker.name.fullName();
          break;
        case 'address':
          this.fakeData = faker.address.streetAddress() + ', ' + faker.address.city() + ', ' + faker.address.country();
          break;
        case 'email':
          this.fakeData = faker.internet.email();
          break;
        case 'phone':
          this.fakeData = faker.phone.number();
          break;
        case 'company':
          this.fakeData = faker.company.name();
          break;
      }
    }
  }
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>

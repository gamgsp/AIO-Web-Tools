<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">MongoDB Query Builder</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The MongoDB Query Builder helps you create MongoDB queries effortlessly. Simply provide the collection name, specify the fields, and add filter conditions.
    </p>
    <div class="tool-example mb-6">
      <p class="text-lg mb-4"><strong>Usage Example:</strong></p>
      <div class="example-section mb-4">
        <h4 class="text-lg font-bold mb-2">Example 1:</h4>
        <p class="bg-gray-100 p-2 rounded">Collection Name: users<br>Fields: name, email<br>Filter Conditions: { "age": { "$gt": 25 } }</p>
      </div>
      <div class="example-section mb-4">
        <h4 class="text-lg font-bold mb-2">Example 2:</h4>
        <p class="bg-gray-100 p-2 rounded">Collection Name: orders<br>Fields: order_id, product, quantity<br>Filter Conditions: { "status": "shipped" }</p>
      </div>
    </div>
    <div class="tool-form">
      <div class="form-group mb-4">
        <label for="collectionName" class="block text-gray-700 text-sm font-bold mb-2">Collection Name:</label>
        <input id="collectionName" v-model="collectionName" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"/>
      </div>
      <div class="form-group mb-4">
        <label for="fields" class="block text-gray-700 text-sm font-bold mb-2">Fields (comma separated):</label>
        <input id="fields" v-model="fields" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"/>
      </div>
      <div class="form-group mb-4">
        <label for="filterConditions" class="block text-gray-700 text-sm font-bold mb-2">Filter Conditions (JSON format):</label>
        <input id="filterConditions" v-model="filterConditions" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"/>
      </div>
      <div class="tool-actions">
        <button @click="generateQuery" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate Query</button>
      </div>
    </div>
    <div v-if="query" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Generated MongoDB Query</h3>
      <pre class="bg-gray-100 p-2 rounded break-words">{{ query }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MongoDBQueryBuilder',
  data() {
    return {
      collectionName: '',
      fields: '',
      filterConditions: '',
      query: '',
    };
  },
  methods: {
    generateQuery() {
      const fieldsPart = this.fields ? `{ ${this.fields.split(',').map(field => `"${field.trim()}": 1`).join(', ')} }` : '{}';
      let query = `db.${this.collectionName}.find(${this.filterConditions || '{}'}, ${fieldsPart})`;
      this.query = query;
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

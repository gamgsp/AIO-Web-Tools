<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">PostgreSQL Query Builder</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The PostgreSQL Query Builder helps you create PostgreSQL queries effortlessly. Simply provide the table name, select columns, and add conditions.
    </p>
    <div class="tool-example mb-6">
      <p class="text-lg mb-4"><strong>Usage Example:</strong></p>
      <div class="example-section mb-4">
        <h4 class="text-lg font-bold mb-2">Example 1:</h4>
        <p class="bg-gray-100 p-2 rounded">Table Name: users<br>Columns: id, name, email<br>Conditions: name = 'John Doe'</p>
      </div>
      <div class="example-section mb-4">
        <h4 class="text-lg font-bold mb-2">Example 2:</h4>
        <p class="bg-gray-100 p-2 rounded">Table Name: orders<br>Columns: id, user_id, product, quantity<br>Conditions: quantity > 10 AND product = 'Laptop'</p>
      </div>
    </div>
    <div class="tool-form">
      <div class="form-group mb-4">
        <label for="tableName" class="block text-gray-700 text-sm font-bold mb-2">Table Name:</label>
        <input id="tableName" v-model="tableName" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"/>
      </div>
      <div class="form-group mb-4">
        <label for="columns" class="block text-gray-700 text-sm font-bold mb-2">Columns (comma separated):</label>
        <input id="columns" v-model="columns" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"/>
      </div>
      <div class="form-group mb-4">
        <label for="conditions" class="block text-gray-700 text-sm font-bold mb-2">Conditions (optional, comma separated):</label>
        <input id="conditions" v-model="conditions" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"/>
      </div>
      <div class="tool-actions">
        <button @click="generateQuery" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate Query</button>
      </div>
    </div>
    <div v-if="query" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Generated PostgreSQL Query</h3>
      <pre class="bg-gray-100 p-2 rounded break-words">{{ query }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostgreSQLQueryBuilder',
  data() {
    return {
      tableName: '',
      columns: '',
      conditions: '',
      query: '',
    };
  },
  methods: {
    generateQuery() {
      const columnsPart = this.columns || '*';
      let query = `SELECT ${columnsPart} FROM ${this.tableName}`;
      if (this.conditions) {
        const conditionsPart = this.conditions.split(',').map(condition => condition.trim()).join(' AND ');
        query += ` WHERE ${conditionsPart}`;
      }
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

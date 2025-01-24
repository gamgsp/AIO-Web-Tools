<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Database Schema Designer</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Database Schema Designer helps you design and visualize database schemas. You can add tables, define columns, and specify relationships between tables.
    </p>
    <div class="tool-example mb-6">
      <p class="text-lg mb-4"><strong>Usage Example:</strong></p>
      <div class="example-section mb-4">
        <h4 class="text-lg font-bold mb-2">Example 1:</h4>
        <p class="bg-gray-100 p-2 rounded">Table Name: Users<br>Columns: id, name, email<br>Relationships: </p>
      </div>
      <div class="example-section mb-4">
        <h4 class="text-lg font-bold mb-2">Example 2:</h4>
        <p class="bg-gray-100 p-2 rounded">Table Name: Orders<br>Columns: id, user_id, product, quantity<br>Relationships: user_id -> Users.id</p>
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
        <label for="relationships" class="block text-gray-700 text-sm font-bold mb-2">Relationships (optional, comma separated):</label>
        <input id="relationships" v-model="relationships" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"/>
      </div>
      <div class="tool-actions">
        <button @click="addTable" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Table</button>
      </div>
    </div>
    <div class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Database Schema</h3>
      <div v-for="(table, index) in tables" :key="index" class="bg-gray-100 p-4 mb-4 rounded shadow">
        <h4 class="text-xl font-bold mb-2">{{ table.name }}</h4>
        <p><strong>Columns:</strong> {{ table.columns.join(', ') }}</p>
        <p v-if="table.relationships.length"><strong>Relationships:</strong> {{ table.relationships.join(', ') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DatabaseSchemaDesigner',
  data() {
    return {
      tableName: '',
      columns: '',
      relationships: '',
      tables: [],
    };
  },
  methods: {
    addTable() {
      const newTable = {
        name: this.tableName,
        columns: this.columns.split(',').map(column => column.trim()),
        relationships: this.relationships.split(',').map(relationship => relationship.trim()),
      };
      this.tables.push(newTable);
      this.tableName = '';
      this.columns = '';
      this.relationships = '';
    },
  },
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';

.bg-gray-100 {
  background-color: #f7fafc;
}
</style>
    
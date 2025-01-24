<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Unix Timestamp Generator</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Unix Timestamp Generator helps you generate and convert Unix timestamps.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example Timestamp:</h4>
        <pre class="bg-gray-100 p-2 rounded">{{ currentTimestamp }}</pre>
        <p class="text-lg mb-6">This is the current Unix timestamp.</p>
      </div>
    </div>
    <div class="tool-form">
      <div class="form-group mb-4">
        <label for="date" class="block text-gray-700 text-sm font-bold mb-2">Date:</label>
        <input id="date" v-model="date" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date"/>
      </div>
      <div class="tool-actions">
        <button @click="generateTimestamp" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate Timestamp</button>
      </div>
    </div>
    <div v-if="timestamp" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Generated Unix Timestamp</h3>
      <pre class="bg-gray-100 p-2 rounded break-words">{{ timestamp }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnixTimestampGenerator',
  data() {
    return {
      date: '',
      timestamp: '',
      currentTimestamp: Math.floor(Date.now() / 1000),
    };
  },
  methods: {
    generateTimestamp() {
      this.timestamp = Math.floor(new Date(this.date).getTime() / 1000);
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

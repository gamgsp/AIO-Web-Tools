<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">UUID (GUID) Generator</h2>
    <p class="text-lg mb-6">This tool allows you to generate UUIDs (Universally Unique Identifiers). Click "Generate" to create a UUID.</p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Generate UUID:</h4>
        <p class="text-lg mb-6">Click "Generate" to get a UUID.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="generateUuid">
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate</button>
        </div>
      </form>
    </div>
    <div class="generated-uuid mt-4" v-if="uuid">
      <h3 class="text-2xl font-bold mb-2">Generated UUID</h3>
      <pre class="bg-gray-100 p-2 rounded"><code>{{ uuid }}</code></pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UuidGenerator',
  data() {
    return {
      uuid: ''
    };
  },
  methods: {
    generateUuid() {
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
      this.uuid = uuid;
    }
  }
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>
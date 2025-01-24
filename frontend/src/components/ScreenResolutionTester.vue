<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Screen Resolution Tester</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Screen Resolution Tester helps you determine the resolution of your screen.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example Screen Resolution:</h4>
        <pre class="bg-gray-100 p-2 rounded">1920x1080</pre>
        <p class="text-lg mb-6">This is a sample screen resolution.</p>
      </div>
    </div>
    <div class="tool-actions">
      <button @click="testResolution" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Test Resolution</button>
    </div>
    <div v-if="resolution" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Screen Resolution</h3>
      <pre class="bg-gray-100 p-2 rounded break-words">{{ resolution }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScreenResolutionTester',
  data() {
    return {
      resolution: null,
    };
  },
  methods: {
    testResolution() {
      this.resolution = `${window.screen.width}x${window.screen.height}`;
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

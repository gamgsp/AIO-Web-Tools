<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">{{ toolName }}</h2>
    <p class="text-lg mb-6">{{ toolDescription }}</p>
    <div class="tool-example">
      <h3 class="text-xl font-semibold mb-2">Example:</h3>
      <p class="mb-4">{{ toolExample }}</p>
    </div>
    <div class="tool-form">
      <form @submit.prevent="handleSubmit">
        <div class="form-group mb-4">
          <label for="input" class="block text-gray-700 text-sm font-bold mb-2">Input:</label>
          <textarea id="input" v-model="input" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
        </div>
        <div class="form-group mb-4">
          <label for="output" class="block text-gray-700 text-sm font-bold mb-2">Output:</label>
          <textarea id="output" v-model="output" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" readonly></textarea>
        </div>
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Convert</button>
      </form>
    </div>
  </div>
</template>

<script>
import marked from 'marked';

export default {
  name: 'ToolPage',
  props: {
    toolName: {
      type: String,
      required: true
    },
    toolDescription: {
      type: String,
      required: true
    },
    toolExample: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      input: '',
      output: ''
    }
  },
  methods: {
    handleSubmit() {
      // Check which tool is being used and apply the appropriate logic
      if (this.toolName === 'Markdown to HTML') {
        this.output = marked(this.input);
      }
      // Add more conditions for other tools
    }
  }
}
</script>

<style scoped>
.tool-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.form-group {
  display: flex;
  flex-direction: column;
}
</style>

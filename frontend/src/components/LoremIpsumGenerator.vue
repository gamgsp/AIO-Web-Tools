<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Lorem Ipsum Generator</h2>
    <p class="text-lg mb-6">This tool allows you to generate placeholder text (Lorem Ipsum). Simply enter the number of paragraphs, sentences, or words and click "Generate" to create the Lorem Ipsum text.</p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Generate Lorem Ipsum:</h4>
        <p class="text-lg mb-6">Enter the number of paragraphs: <code>3</code></p>
        <p class="text-lg mb-6">Click "Generate" to get the Lorem Ipsum text.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="generateLoremIpsum">
        <div class="form-group mb-4">
          <label for="count" class="block text-gray-700 text-sm font-bold mb-2">Count:</label>
          <input id="count" v-model="count" type="number" min="1" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter the number of paragraphs, sentences, or words">
        </div>
        <div class="form-group mb-4">
          <label for="type" class="block text-gray-700 text-sm font-bold mb-2">Type:</label>
          <select id="type" v-model="type" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate</button>
        </div>
      </form>
    </div>
    <div class="generated-lorem-ipsum mt-4" v-if="loremIpsum">
      <h3 class="text-2xl font-bold mb-2">Generated Lorem Ipsum</h3>
      <pre class="bg-gray-100 p-2 rounded" style="white-space: pre-wrap; word-wrap: break-word;"><code>{{ loremIpsum }}</code></pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoremIpsumGenerator',
  data() {
    return {
      count: 3,
      type: 'paragraphs',
      loremIpsum: ''
    };
  },
  methods: {
    generateLoremIpsum() {
      let API_URL = 'https://baconipsum.com/api/?type=all-meat&format=text';
      if (this.type === 'paragraphs') {
        API_URL += `&paras=${this.count}`;
      } else if (this.type === 'sentences') {
        API_URL += `&sentences=${this.count}`;
      } else if (this.type === 'words') {
        API_URL += `&sentences=1`; // Get one sentence and split it into words
      }
      fetch(API_URL)
        .then(response => response.text())
        .then(data => {
          if (this.type === 'words') {
            const words = data.split(' ').slice(0, this.count).join(' ');
            this.loremIpsum = words;
          } else {
            this.loremIpsum = data;
          }
        })
        .catch(error => {
          console.error('Error fetching Lorem Ipsum:', error);
          this.loremIpsum = 'Error generating Lorem Ipsum text.';
        });
    }
  }
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>

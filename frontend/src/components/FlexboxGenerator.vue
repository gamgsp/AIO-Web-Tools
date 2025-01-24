<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">CSS Flexbox Generator</h2>
    <p class="text-lg mb-6">This tool allows you to generate CSS code for flexbox layouts. Adjust the parameters and click "Generate" to create the flexbox CSS code.</p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Generate Flexbox:</h4>
        <p class="text-lg mb-6">Adjust the parameters for flex direction, justify content, align items, and more.</p>
        <p class="text-lg mb-6">Click "Generate" to get the CSS code for the flexbox layout.</p>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="generateFlexbox">
        <div class="form-group mb-4">
          <label for="flexDirection" class="block text-gray-700 text-sm font-bold mb-2">Flex Direction:</label>
          <select id="flexDirection" v-model="flexDirection" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="row">row</option>
            <option value="row-reverse">row-reverse</option>
            <option value="column">column</option>
            <option value="column-reverse">column-reverse</option>
          </select>
        </div>
        <div class="form-group mb-4">
          <label for="justifyContent" class="block text-gray-700 text-sm font-bold mb-2">Justify Content:</label>
          <select id="justifyContent" v-model="justifyContent" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="flex-start">flex-start</option>
            <option value="flex-end">flex-end</option>
            <option value="center">center</option>
            <option value="space-between">space-between</option>
            <option value="space-around">space-around</option>
            <option value="space-evenly">space-evenly</option>
          </select>
        </div>
        <div class="form-group mb-4">
          <label for="alignItems" class="block text-gray-700 text-sm font-bold mb-2">Align Items:</label>
          <select id="alignItems" v-model="alignItems" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="stretch">stretch</option>
            <option value="flex-start">flex-start</option>
            <option value="flex-end">flex-end</option>
            <option value="center">center</option>
            <option value="baseline">baseline</option>
          </select>
        </div>
        <div class="form-group mb-4">
          <label for="flexWrap" class="block text-gray-700 text-sm font-bold mb-2">Flex Wrap:</label>
          <select id="flexWrap" v-model="flexWrap" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="nowrap">nowrap</option>
            <option value="wrap">wrap</option>
            <option value="wrap-reverse">wrap-reverse</option>
          </select>
        </div>
        <div class="form-group mb-4">
          <label for="alignContent" class="block text-gray-700 text-sm font-bold mb-2">Align Content:</label>
          <select id="alignContent" v-model="alignContent" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="stretch">stretch</option>
            <option value="flex-start">flex-start</option>
            <option value="flex-end">flex-end</option>
            <option value="center">center</option>
            <option value="space-between">space-between</option>
            <option value="space-around">space-around</option>
          </select>
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate</button>
        </div>
      </form>
    </div>
    <div class="generated-flexbox mt-4" v-if="flexboxCss">
      <h3 class="text-2xl font-bold mb-2">Generated Flexbox CSS</h3>
      <pre class="bg-gray-100 p-2 rounded"><code>{{ flexboxCss }}</code></pre>
      <div class="flexbox-preview mt-4" :style="flexboxStyle">
        <div class="flexbox-item" v-for="i in 3" :key="i">Item {{ i }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlexboxGenerator',
  data() {
    return {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      flexWrap: 'nowrap',
      alignContent: 'stretch',
      flexboxCss: '',
      flexboxStyle: {}
    };
  },
  methods: {
    generateFlexbox() {
      this.flexboxCss = `
display: flex;
flex-direction: ${this.flexDirection};
justify-content: ${this.justifyContent};
align-items: ${this.alignItems};
flex-wrap: ${this.flexWrap};
align-content: ${this.alignContent};`;

      this.flexboxStyle = {
        display: 'flex',
        flexDirection: this.flexDirection,
        justifyContent: this.justifyContent,
        alignItems: this.alignItems,
        flexWrap: this.flexWrap,
        alignContent: this.alignContent,
        height: '200px',
        border: '1px solid #000',
        padding: '10px'
      };
    }
  }
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>

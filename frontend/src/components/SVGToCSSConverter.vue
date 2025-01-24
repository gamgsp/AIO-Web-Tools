<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">SVG to CSS Converter</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The SVG to CSS Converter helps you convert SVG elements to CSS styles effortlessly. Simply paste your SVG code, and the tool will generate the equivalent CSS.
    </p>
    <div class="tool-example mb-6">
      <p class="text-lg mb-4"><strong>Usage Example:</strong></p>
      <div class="example-section mb-4">
        <h4 class="text-lg font-bold mb-2">Example 1:</h4>
        <pre class="bg-gray-100 p-2 rounded">
&lt;svg width="100" height="100"&gt;
  &lt;circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" /&gt;
&lt;/svg&gt;
        </pre>
        <p class="bg-gray-100 p-2 rounded">Equivalent CSS: <code>.my-svg { width: 100px; height: 100px; } .my-svg circle { cx: 50px; cy: 50px; r: 40px; stroke: black; stroke-width: 3px; fill: red; }</code></p>
      </div>
    </div>
    <div class="tool-form">
      <div class="form-group mb-4">
        <label for="svgInput" class="block text-gray-700 text-sm font-bold mb-2">SVG Code:</label>
        <textarea id="svgInput" v-model="svgInput" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="10"></textarea>
      </div>
      <div class="tool-actions">
        <button @click="convertToCSS" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Convert to CSS</button>
      </div>
    </div>
    <div v-if="cssOutput" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Generated CSS</h3>
      <pre class="bg-gray-100 p-2 rounded break-words">{{ cssOutput }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SVGToCSSConverter',
  data() {
    return {
      svgInput: '',
      cssOutput: '',
    };
  },
  methods: {
    convertToCSS() {
      try {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(this.svgInput, 'image/svg+xml');
        const svgElement = svgDoc.documentElement;
        let css = `.my-svg { width: ${svgElement.getAttribute('width')}px; height: ${svgElement.getAttribute('height')}px; }\n`;
        Array.from(svgElement.children).forEach(child => {
          const tagName = child.tagName;
          css += `.my-svg ${tagName} { `;
          Array.from(child.attributes).forEach(attr => {
            css += `${attr.name.replace(/-./g, x => x[1].toUpperCase())}: ${attr.value}; `;
          });
          css += '}\n';
        });
        this.cssOutput = css;
      } catch (error) {
        this.cssOutput = 'Error parsing SVG code. Please ensure it is valid SVG.';
      }
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

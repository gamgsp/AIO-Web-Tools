<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">CSS Animation Generator</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The CSS Animation Generator helps you create custom CSS animations.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example Animation:</h4>
        <pre class="bg-gray-100 p-2 rounded">
@keyframes example {
  from {transform: translateX(0);}
  to {transform: translateX(100px);}
}
        </pre>
        <p class="text-lg mb-6">This animation moves an element 100px to the right.</p>
      </div>
    </div>
    <div class="tool-form">
      <div class="form-group mb-4">
        <label for="animationName" class="block text-gray-700 text-sm font-bold mb-2">Animation Name:</label>
        <input id="animationName" v-model="animationName" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="example"/>
      </div>
      <div class="form-group mb-4">
        <label for="property" class="block text-gray-700 text-sm font-bold mb-2">CSS Property:</label>
        <input id="property" v-model="property" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="transform"/>
      </div>
      <div class="form-group mb-4">
        <label for="fromValue" class="block text-gray-700 text-sm font-bold mb-2">From Value:</label>
        <input id="fromValue" v-model="fromValue" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="translateX(0)"/>
      </div>
      <div class="form-group mb-4">
        <label for="toValue" class="block text-gray-700 text-sm font-bold mb-2">To Value:</label>
        <input id="toValue" v-model="toValue" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="translateX(100px)"/>
      </div>
      <div class="tool-actions">
        <button @click="generateAnimation" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate Animation</button>
      </div>
    </div>
    <div v-if="animationCode" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Generated CSS Animation</h3>
      <pre class="bg-gray-100 p-2 rounded break-words">{{ animationCode }}</pre>
      <p class="mt-2">Preview:</p>
      <div :style="animationStyle" class="animation-preview"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CssAnimationGenerator',
  data() {
    return {
      animationName: 'example',
      property: 'transform',
      fromValue: 'translateX(0)',
      toValue: 'translateX(100px)',
      animationCode: '',
    };
  },
  computed: {
    animationStyle() {
      const styleElement = document.createElement('style');
      styleElement.innerHTML = `
        @keyframes ${this.animationName} {
          from {${this.property}: ${this.fromValue};}
          to {${this.property}: ${this.toValue};}
        }
      `;
      document.head.appendChild(styleElement);
      return {
        animation: `${this.animationName} 2s infinite`,
        width: '50px',
        height: '50px',
        backgroundColor: '#007BFF',
        transform: this.fromValue,
      };
    },
  },
  methods: {
    generateAnimation() {
      this.animationCode = `
@keyframes ${this.animationName} {
  from {${this.property}: ${this.fromValue};}
  to {${this.property}: ${this.toValue};}
}
.animation-preview {
  width: 50px;
  height: 50px;
  background-color: #007BFF;
  ${this.property}: ${this.fromValue};
  animation: ${this.animationName} 2s infinite;
}
      `.trim();
      this.animationStyle;
    },
  },
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';

.break-words {
  word-break: break-word;
}
.animation-preview {
  margin-top: 20px;
}
</style>

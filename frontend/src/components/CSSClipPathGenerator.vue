<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">CSS Clip Path Generator</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The CSS Clip Path Generator helps you create complex shapes using the clip-path property in CSS. Simply select a shape, adjust the parameters, and generate the CSS code.
    </p>
    <div class="tool-example mb-6">
      <p class="text-lg mb-4"><strong>Usage Example:</strong></p>
      <div class="example-section mb-4">
        <h4 class="text-lg font-bold mb-2">Example 1:</h4>
        <p class="bg-gray-100 p-2 rounded">Shape: Circle<br>Parameters: radius = 50%</p>
        <p class="bg-gray-100 p-2 rounded">CSS: <code>clip-path: circle(50%);</code></p>
      </div>
      <div class="example-section mb-4">
        <h4 class="text-lg font-bold mb-2">Example 2:</h4>
        <p class="bg-gray-100 p-2 rounded">Shape: Polygon<br>Parameters: points = 50% 0%, 100% 100%, 0% 100%</p>
        <p class="bg-gray-100 p-2 rounded">CSS: <code>clip-path: polygon(50% 0%, 100% 100%, 0% 100%);</code></p>
      </div>
    </div>
    <div class="tool-form">
      <div class="form-group mb-4">
        <label for="shape" class="block text-gray-700 text-sm font-bold mb-2">Shape:</label>
        <v-select id="shape" v-model="shape" :options="shapes" placeholder="Select a shape" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></v-select>
      </div>
      <div class="form-group mb-4" v-if="shape === 'circle'">
        <label for="radius" class="block text-gray-700 text-sm font-bold mb-2">Radius (%):</label>
        <input id="radius" v-model="radius" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="50"/>
      </div>
      <div class="form-group mb-4" v-if="shape === 'ellipse'">
        <label for="radii" class="block text-gray-700 text-sm font-bold mb-2">Radii (horizontal%, vertical%):</label>
        <input id="radii" v-model="radii" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="50% 50%"/>
      </div>
      <div class="form-group mb-4" v-if="shape === 'inset'">
        <label for="insetValues" class="block text-gray-700 text-sm font-bold mb-2">Inset Values (top% right% bottom% left%):</label>
        <input id="insetValues" v-model="insetValues" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="10% 20% 30% 40%"/>
      </div>
      <div class="form-group mb-4" v-if="shape === 'polygon'">
        <label for="points" class="block text-gray-700 text-sm font-bold mb-2">Points (comma separated):</label>
        <input id="points" v-model="points" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="50% 0%, 100% 100%, 0% 100%"/>
      </div>
      <div class="form-group mb-4" v-if="shape === 'path'">
        <label for="path" class="block text-gray-700 text-sm font-bold mb-2">Path (SVG path data):</label>
        <input id="path" v-model="pathData" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="M10 10 H 90 V 90 H 10 L 10 10"/>
      </div>
      <div class="form-group mb-4" v-if="shape === 'rect'">
        <label for="rectValues" class="block text-gray-700 text-sm font-bold mb-2">Rectangle Values (top%, right%, bottom%, left%, radius%):</label>
        <input id="rectValues" v-model="rectValues" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="10% 20% 30% 40% / 10%"/>
      </div>
      <div class="form-group mb-4" v-if="shape === 'url'">
        <label for="urlPath" class="block text-gray-700 text-sm font-bold mb-2">URL (link to SVG):</label>
        <input id="urlPath" v-model="urlPath" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="path/to/svg"/>
      </div>
      <div class="tool-actions">
        <button @click="generateCSS" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate CSS</button>
      </div>
    </div>
    <div v-if="cssCode" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Generated CSS</h3>
      <pre class="bg-gray-100 p-2 rounded break-words">{{ cssCode }}</pre>
    </div>
    <div v-if="shapePreview" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Shape Preview</h3>
      <div class="shape-preview" :style="shapePreview"></div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import vSelect from 'vue3-select';
import 'vue3-select/dist/vue3-select.css';

export default {
  name: 'CSSClipPathGenerator',
  components: { vSelect },
  setup() {
    const shape = ref('');
    const radius = ref(50);
    const radii = ref('50% 50%');
    const insetValues = ref('10% 20% 30% 40%');
    const points = ref('50% 0%, 100% 100%, 0% 100%');
    const pathData = ref('M10 10 H 90 V 90 H 10 L 10 10');
    const rectValues = ref('10% 20% 30% 40% / 10%');
    const urlPath = ref('path/to/svg');
    const cssCode = ref('');
    const shapePreview = ref(null);
    const shapes = ref(['circle', 'ellipse', 'inset', 'polygon', 'path', 'rect', 'url']);

    const generateCSS = () => {
      if (shape.value === 'circle') {
        cssCode.value = `clip-path: circle(${radius.value}%);`;
        shapePreview.value = {
          clipPath: `circle(${radius.value}%)`,
          width: '200px',
          height: '200px',
          backgroundColor: 'lightblue'
        };
      } else if (shape.value === 'ellipse') {
        cssCode.value = `clip-path: ellipse(${radii.value});`;
        shapePreview.value = {
          clipPath: `ellipse(${radii.value})`,
          width: '200px',
          height: '200px',
          backgroundColor: 'lightblue'
        };
      } else if (shape.value === 'inset') {
        cssCode.value = `clip-path: inset(${insetValues.value});`;
        shapePreview.value = {
          clipPath: `inset(${insetValues.value})`,
          width: '200px',
          height: '200px',
          backgroundColor: 'lightblue'
        };
      } else if (shape.value === 'polygon') {
        cssCode.value = `clip-path: polygon(${points.value});`;
        shapePreview.value = {
          clipPath: `polygon(${points.value})`,
          width: '200px',
          height: '200px',
          backgroundColor: 'lightblue'
        };
      } else if (shape.value === 'path') {
        cssCode.value = `clip-path: path('${pathData.value}');`;
        shapePreview.value = {
          clipPath: `path('${pathData.value}')`,
          width: '200px',
          height: '200px',
          backgroundColor: 'lightblue'
        };
      } else if (shape.value === 'rect') {
        cssCode.value = `clip-path: rect(${rectValues.value});`;
        shapePreview.value = {
          clipPath: `rect(${rectValues.value})`,
          width: '200px',
          height: '200px',
          backgroundColor: 'lightblue'
        };
      } else if (shape.value === 'url') {
        cssCode.value = `clip-path: url('${urlPath.value}');`;
        shapePreview.value = {
          clipPath: `url('${urlPath.value}')`,
          width: '200px',
          height: '200px',
          backgroundColor: 'lightblue'
        };
      }
    };

    return {
      shape,
      radius,
      radii,
      insetValues,
      points,
      pathData,
      rectValues,
      urlPath,
      cssCode,
      shapePreview,
      shapes,
      generateCSS
    };
  }
};
</script>
<style scoped>
@import '@/assets/toolstyles.css';

.shape-preview {
  width: 200px;
  height: 200px;
  background-color: lightblue;
  margin-top: 1rem;
}
</style>

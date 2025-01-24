<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">JSON to XML / XML to JSON Converter</h2>
    <p class="text-lg mb-6">This tool allows you to convert between JSON and XML formats. Simply paste your JSON or XML code into the input box, then click the appropriate button to convert it to the desired format.</p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">JSON to XML:</h4>
        <p class="text-lg mb-6">Enter your JSON code like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
{
  "greeting": "Hello, World!"
}
        </pre>
        <p class="text-lg mb-6">Click "Convert to XML" to get the following XML code:</p>
        <pre class="bg-gray-100 p-2 rounded">
&lt;greeting&gt;Hello, World!&lt;/greeting&gt;
        </pre>
      </div>
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">XML to JSON:</h4>
        <p class="text-lg mb-6">Enter your XML code like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
&lt;greeting&gt;Hello, World!&lt;/greeting&gt;
        </pre>
        <p class="text-lg mb-6">Click "Convert to JSON" to get the following JSON code:</p>
        <pre class="bg-gray-100 p-2 rounded">
{
  "greeting": "Hello, World!"
}
        </pre>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="handleSubmit">
        <div class="form-group mb-4">
          <label for="input" class="block text-gray-700 text-sm font-bold mb-2">Input:</label>
          <textarea id="input" v-model="inputData" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" placeholder="Enter JSON or XML code here..."></textarea>
        </div>
        <div class="form-group mb-4">
          <label for="output" class="block text-gray-700 text-sm font-bold mb-2">Output:</label>
          <textarea id="output" v-model="outputData" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" readonly></textarea>
        </div>
        <div class="tool-actions">
          <button @click="convertToJson" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">Convert to JSON</button>
          <button @click="convertToXml" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Convert to XML</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JsonXmlConverter',
  data() {
    return {
      inputData: '',
      outputData: ''
    };
  },
  methods: {
    convertToJson() {
      try {
        const xml = new DOMParser().parseFromString(this.inputData, 'text/xml');
        const json = this.xmlToJson(xml);
        this.outputData = JSON.stringify(json, null, 2);
      } catch (error) {
        this.outputData = `Error: ${error.message}`;
      }
    },
    convertToXml() {
      try {
        const json = JSON.parse(this.inputData);
        const xml = this.jsonToXml(json);
        this.outputData = xml;
      } catch (error) {
        this.outputData = `Error: ${error.message}`;
      }
    },
    xmlToJson(xml) {
      let obj = {}; // Changed to let
      if (xml.nodeType === 1) { // element
        if (xml.attributes.length > 0) {
          obj["@attributes"] = {};
          for (let j = 0; j < xml.attributes.length; j++) {
            const attribute = xml.attributes.item(j);
            obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
          }
        }
      } else if (xml.nodeType === 3) { // text
        obj = xml.nodeValue;
      }
      if (xml.hasChildNodes()) {
        for (let i = 0; i < xml.childNodes.length; i++) {
          const item = xml.childNodes.item(i);
          const nodeName = item.nodeName;
          if (typeof obj[nodeName] === "undefined") {
            obj[nodeName] = this.xmlToJson(item);
          } else {
            if (typeof obj[nodeName].push === "undefined") {
              const old = obj[nodeName];
              obj[nodeName] = [];
              obj[nodeName].push(old);
            }
            obj[nodeName].push(this.xmlToJson(item));
          }
        }
      }
      return obj;
    },
    jsonToXml(json) {
      let xml = '';
      for (const prop in json) {
        if (Object.prototype.hasOwnProperty.call(json, prop)) { // Updated the check
          if (Array.isArray(json[prop])) {
            for (const arrayElement of json[prop]) {
              xml += `<${prop}>${this.jsonToXml(arrayElement)}</${prop}>`;
            }
          } else if (typeof json[prop] === 'object') {
            xml += `<${prop}>${this.jsonToXml(json[prop])}</${prop}>`;
          } else {
            xml += `<${prop}>${json[prop]}</${prop}>`;
          }
        }
      }
      return xml;
    },
    handleSubmit() {
      // This method is left empty intentionally to prevent form submission
    }
  }
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>

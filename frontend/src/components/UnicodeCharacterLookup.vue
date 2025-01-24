<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Unicode Character Lookup</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Unicode Character Lookup helps you find Unicode characters and their code points.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example Character:</h4>
        <pre class="bg-gray-100 p-2 rounded">😊</pre>
        <p class="text-lg mb-6">This is a sample Unicode character.</p>
      </div>
    </div>
    <div class="tool-form">
      <div class="form-group mb-4">
        <label for="character" class="block text-gray-700 text-sm font-bold mb-2">Character:</label>
        <input id="character" v-model="character" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter character"/>
      </div>
      <div class="tool-actions">
        <button @click="lookupCharacter" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Lookup Character</button>
      </div>
    </div>
    <div v-if="characterInfo" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Character Information</h3>
      <div class="mt-2">
        <p><strong>Character:</strong> {{ characterInfo.character }}</p>
        <p><strong>Code Point:</strong> U+{{ characterInfo.codePoint.toString(16).toUpperCase() }}</p>
        <p><strong>Name:</strong> {{ characterInfo.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnicodeCharacterLookup',
  data() {
    return {
      character: '',
      characterInfo: null,
    };
  },
  methods: {
    lookupCharacter() {
      if (this.character) {
        const codePoint = this.character.codePointAt(0);
        this.characterInfo = {
          character: this.character,
          codePoint: codePoint,
          name: this.getCharacterName(codePoint),
        };
      }
    },
    getCharacterName(codePoint) {
      // Placeholder for actual Unicode character name lookup
      const unicodeCharacterNames = {
        0x1F60A: 'SMILING FACE WITH SMILING EYES', // Example entry
        // Add more Unicode character names as needed
      };
      return unicodeCharacterNames[codePoint] || 'Unknown Character';
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

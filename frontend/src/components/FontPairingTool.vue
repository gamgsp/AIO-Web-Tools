<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Font Pairing Tool</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Font Pairing Tool helps you find complementary font pairs for your projects. Simply select a primary font, and the tool will suggest a secondary font that pairs well with it.
    </p>
    <div class="tool-example mb-6">
      <p class="text-lg mb-4"><strong>Usage Example:</strong></p>
      <div class="example-section mb-4">
        <h4 class="text-lg font-bold mb-2">Example 1:</h4>
        <p class="bg-gray-100 p-2 rounded">Primary Font: Roboto<br>Suggested Secondary Font: Open Sans</p>
      </div>
      <div class="example-section mb-4">
        <h4 class="text-lg font-bold mb-2">Example 2:</h4>
        <p class="bg-gray-100 p-2 rounded">Primary Font: Lora<br>Suggested Secondary Font: Montserrat</p>
      </div>
    </div>
    <div class="tool-form">
      <div class="form-group mb-4">
        <label for="primaryFont" class="block text-gray-700 text-sm font-bold mb-2">Primary Font:</label>
        <v-select 
          id="primaryFont" 
          v-model="primaryFont" 
          :options="fonts" 
          placeholder="Select a font"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </v-select>
      </div>
      <div class="tool-actions">
        <button @click="suggestPairing" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Suggest Pairing</button>
      </div>
    </div>
    <div v-if="secondaryFont" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Suggested Secondary Font</h3>
      <p class="bg-gray-100 p-2 rounded">{{ secondaryFont }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import vSelect from 'vue3-select';
import 'vue3-select/dist/vue3-select.css';

export default {
  name: 'FontPairingTool',
  components: { vSelect },
  setup() {
    const primaryFont = ref('');
    const secondaryFont = ref('');
    const fonts = ref([
      'Arial', 'Verdana', 'Helvetica', 'Tahoma', 'Trebuchet MS', 'Times New Roman', 'Georgia', 'Garamond',
      'Courier New', 'Brush Script MT', 'Roboto', 'Open Sans', 'Lora', 'Montserrat', 'Merriweather', 'Ubuntu',
      'Poppins', 'Raleway', 'Playfair Display', 'Nunito', 'Oswald', 'Fira Sans', 'Source Sans Pro', 'Droid Sans',
      'Droid Serif', 'Noto Sans', 'Noto Serif', 'Inconsolata', 'PT Sans', 'PT Serif', 'Quicksand', 'Rubik',
      'Cabin', 'Cinzel', 'Exo', 'Jura', 'Karla', 'Lato', 'Libre Baskerville', 'Lobster', 'Monda', 'Mukta',
      'Overpass', 'Oxygen', 'Patrick Hand', 'Poiret One', 'Quattrocento', 'Rokkitt', 'Rufina', 'Sanchez',
      'Slabo 27px', 'Space Mono', 'Spectral', 'Sura', 'Teko', 'Titillium Web', 'Vollkorn', 'Work Sans', 'Yanone Kaffeesatz'
    ]);
    const fontPairings = {
      'Arial': 'Verdana',
      'Verdana': 'Tahoma',
      'Helvetica': 'Arial',
      'Tahoma': 'Verdana',
      'Trebuchet MS': 'Arial',
      'Times New Roman': 'Georgia',
      'Georgia': 'Garamond',
      'Garamond': 'Times New Roman',
      'Courier New': 'Verdana',
      'Brush Script MT': 'Arial',
      'Roboto': 'Open Sans',
      'Open Sans': 'Roboto',
      'Lora': 'Montserrat',
      'Montserrat': 'Lora',
      'Merriweather': 'Lato',
      'Ubuntu': 'Roboto',
      'Poppins': 'Lora',
      'Raleway': 'Open Sans',
      'Playfair Display': 'Source Sans Pro',
      'Nunito': 'Lora',
      'Oswald': 'Raleway',
      'Fira Sans': 'Merriweather',
      'Source Sans Pro': 'Playfair Display',
      'Droid Sans': 'Droid Serif',
      'Droid Serif': 'Droid Sans',
      'Noto Sans': 'Noto Serif',
      'Noto Serif': 'Noto Sans',
      'Inconsolata': 'Roboto',
      'PT Sans': 'PT Serif',
      'PT Serif': 'PT Sans',
      'Quicksand': 'Rubik',
      'Rubik': 'Quicksand',
      'Cabin': 'Libre Baskerville',
      'Cinzel': 'Quattrocento',
      'Exo': 'Monda',
      'Jura': 'Mukta',
      'Karla': 'Rubik',
      'Lato': 'Merriweather',
      'Libre Baskerville': 'Cabin',
      'Lobster': 'Patrick Hand',
      'Monda': 'Exo',
      'Mukta': 'Jura',
      'Overpass': 'Sanchez',
      'Oxygen': 'Mukta',
      'Patrick Hand': 'Lobster',
      'Poiret One': 'Quattrocento',
      'Quattrocento': 'Cinzel',
      'Rokkitt': 'Rufina',
      'Rufina': 'Rokkitt',
      'Sanchez': 'Overpass',
      'Slabo 27px': 'Raleway',
      'Space Mono': 'Spectral',
      'Spectral': 'Space Mono',
      'Sura': 'Teko',
      'Teko': 'Sura',
      'Titillium Web': 'Quicksand',
      'Vollkorn': 'Raleway',
      'Work Sans': 'Yanone Kaffeesatz',
      'Yanone Kaffeesatz': 'Work Sans'
    };
    
    const suggestPairing = () => {
      secondaryFont.value = fontPairings[primaryFont.value] || 'No pairing suggestion available';
    };

    return {
      primaryFont,
      secondaryFont,
      fonts,
      suggestPairing
    };
  }
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';

.break-words {
  word-break: break-word;
}
</style>

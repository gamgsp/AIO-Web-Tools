<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Unit Converter</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Unit Converter helps you convert between various units of measurement.
    </p>
    <div class="tool-form">
      <div class="form-group mb-4">
        <label for="conversionType" class="block text-gray-700 text-sm font-bold mb-2">Conversion Type:</label>
        <select id="conversionType" v-model="conversionType" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" @change="updateUnits">
          <option v-for="(units, type) in conversionTypes" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>
      <div class="form-group mb-4 flex items-center">
        <label for="fromUnit" class="block text-gray-700 text-sm font-bold mb-2 mr-2">From:</label>
        <input id="value" v-model="value" type="number" class="shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2" />
        <select id="fromUnit" v-model="fromUnit" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option v-for="unit in units" :key="unit" :value="unit">{{ unit }}</option>
        </select>
      </div>
      <div class="form-group mb-4 flex items-center">
        <label for="toUnit" class="block text-gray-700 text-sm font-bold mb-2 mr-2">To:</label>
        <select id="toUnit" v-model="toUnit" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2">
          <option v-for="unit in units" :key="unit" :value="unit">{{ unit }}</option>
        </select>
        <pre class="bg-gray-100 p-2 rounded break-words w-20 text-center">{{ result !== null ? result : '' }}</pre>
      </div>
      <div class="tool-actions">
        <button @click="convert" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Convert</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UnitConverter',
  data() {
    return {
      conversionType: 'Length',
      fromUnit: '',
      toUnit: '',
      value: '',
      result: null,
      conversionTypes: {
        Length: ['meters', 'kilometers', 'miles', 'feet', 'inches'],
        Mass: ['grams', 'kilograms', 'pounds', 'ounces'],
        Volume: ['liters', 'milliliters', 'gallons', 'quarts'],
        Temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
        Time: ['seconds', 'minutes', 'hours', 'days', 'weeks'],
        Speed: ['meters per second', 'kilometers per hour', 'miles per hour'],
        Area: ['square meters', 'square kilometers', 'square feet', 'acres'],
        Data: ['bytes', 'kilobytes', 'megabytes', 'gigabytes'],
      },
      units: [],
    };
  },
  mounted() {
    this.updateUnits();
  },
  methods: {
    updateUnits() {
      this.units = this.conversionTypes[this.conversionType];
      this.fromUnit = this.units[0];
      this.toUnit = this.units[1];
    },
    convert() {
      if (this.conversionType === 'Length') {
        this.result = this.convertLength(this.value, this.fromUnit, this.toUnit);
      } else if (this.conversionType === 'Mass') {
        this.result = this.convertMass(this.value, this.fromUnit, this.toUnit);
      } else if (this.conversionType === 'Volume') {
        this.result = this.convertVolume(this.value, this.fromUnit, this.toUnit);
      } else if (this.conversionType === 'Temperature') {
        this.result = this.convertTemperature(this.value, this.fromUnit, this.toUnit);
      } else if (this.conversionType === 'Time') {
        this.result = this.convertTime(this.value, this.fromUnit, this.toUnit);
      } else if (this.conversionType === 'Speed') {
        this.result = this.convertSpeed(this.value, this.fromUnit, this.toUnit);
      } else if (this.conversionType === 'Area') {
        this.result = this.convertArea(this.value, this.fromUnit, this.toUnit);
      } else if (this.conversionType === 'Data') {
        this.result = this.convertData(this.value, this.fromUnit, this.toUnit);
      }
    },
    convertLength(value, fromUnit, toUnit) {
      const conversionRates = {
        meters: 1,
        kilometers: 1000,
        miles: 1609.34,
        feet: 0.3048,
        inches: 0.0254,
      };

      const factorFrom = conversionRates[fromUnit];
      const factorTo = conversionRates[toUnit];
      return (value * factorFrom) / factorTo;
    },
    convertMass(value, fromUnit, toUnit) {
      const conversionRates = {
        grams: 1,
        kilograms: 1000,
        pounds: 453.592,
        ounces: 28.3495,
      };
      const factorFrom = conversionRates[fromUnit];
      const factorTo = conversionRates[toUnit];
      return (value * factorFrom) / factorTo;
    },
    convertVolume(value, fromUnit, toUnit) {
      const conversionRates = {
        liters: 1,
        milliliters: 0.001,
        gallons: 3.78541,
        quarts: 0.946353,
      };
      const factorFrom = conversionRates[fromUnit];
      const factorTo = conversionRates[toUnit];
      return (value * factorFrom) / factorTo;
    },
    convertTemperature(value, fromUnit, toUnit) {
      if (fromUnit === 'Celsius' && toUnit === 'Fahrenheit') {
        return (value * 9/5) + 32;
      } else if (fromUnit === 'Fahrenheit' && toUnit === 'Celsius') {
        return (value - 32) * 5/9;
      } else if (fromUnit === 'Celsius' && toUnit === 'Kelvin') {
        return value + 273.15;
      } else if (fromUnit === 'Kelvin' && toUnit === 'Celsius') {
        return value - 273.15;
      } else if (fromUnit === 'Fahrenheit' && toUnit === 'Kelvin') {
        return (value - 32) * 5/9 + 273.15;
      } else if (fromUnit === 'Kelvin' && toUnit === 'Fahrenheit') {
        return (value - 273.15) * 9/5 + 32;
      } else {
        return value;
      }
    },
    convertTime(value, fromUnit, toUnit) {
      const conversionRates = {
        seconds: 1,
        minutes: 60,
        hours: 3600,
        days: 86400,
        weeks: 604800,
      };
      const factorFrom = conversionRates[fromUnit];
      const factorTo = conversionRates[toUnit];
      return (value * factorFrom) / factorTo;
    },
    convertSpeed(value, fromUnit, toUnit) {
      const conversionRates = {
        'meters per second': 1,
        'kilometers per hour': 3.6,
        'miles per hour': 2.23694,
      };
      const factorFrom = conversionRates[fromUnit];
      const factorTo = conversionRates[toUnit];
      return (value * factorFrom) / factorTo;
    },
    convertArea(value, fromUnit, toUnit) {
      const conversionRates = {
        'square meters': 1,
        'square kilometers': 1e+6,
        'square feet': 0.092903,
        'acres': 4046.86,
      };
      const factorFrom = conversionRates[fromUnit];
      const factorTo = conversionRates[toUnit];
      return (value * factorFrom) / factorTo;
    },
    convertData(value, fromUnit, toUnit) {
      const conversionRates = {
        bytes: 1,
        kilobytes: 1024,
        megabytes: 1048576,
        gigabytes: 1073741824,
      };
      const factorFrom = conversionRates[fromUnit];
      const factorTo = conversionRates[toUnit];
      return (value * factorFrom) / factorTo;
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

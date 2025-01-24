<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Time Zone Converter</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Time Zone Converter helps you convert time between different time zones.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example Conversion:</h4>
        <pre class="bg-gray-100 p-2 rounded">
Time in New York: 2025-01-01 12:00
Converted to Tokyo: 2025-01-02 02:00
        </pre>
        <p class="text-lg mb-6">This example shows how to convert time from New York to Tokyo.</p>
      </div>
    </div>
    <div class="tool-form">
      <div class="form-group mb-4">
        <label for="fromTime" class="block text-gray-700 text-sm font-bold mb-2">From Time:</label>
        <input id="fromTime" v-model="fromTime" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="datetime-local"/>
      </div>
      <div class="form-group mb-4">
        <label for="fromTimeZone" class="block text-gray-700 text-sm font-bold mb-2">From Time Zone:</label>
        <v-select id="fromTimeZone" v-model="fromTimeZone" :options="timeZones" :reduce="timezone => timezone" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
      </div>
      <div class="form-group mb-4">
        <label for="toTimeZone" class="block text-gray-700 text-sm font-bold mb-2">To Time Zone:</label>
        <v-select id="toTimeZone" v-model="toTimeZone" :options="timeZones" :reduce="timezone => timezone" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
      </div>
      <div class="tool-actions">
        <button @click="convertTime" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Convert Time</button>
      </div>
    </div>
    <div v-if="convertedTime" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Converted Time</h3>
      <pre class="bg-gray-100 p-2 rounded break-words">{{ convertedTime }}</pre>
    </div>
  </div>
</template>

<script>
import moment from 'moment-timezone';
import vSelect from 'vue3-select';
import 'vue3-select/dist/vue3-select.css';

export default {
  name: 'TimeZoneConverter',
  components: { vSelect },
  data() {
    return {
      fromTime: '',
      fromTimeZone: 'UTC',
      toTimeZone: 'UTC',
      convertedTime: '',
      timeZones: moment.tz.names(),
    };
  },
  methods: {
    convertTime() {
      const time = moment.tz(this.fromTime, this.fromTimeZone);
      this.convertedTime = time.tz(this.toTimeZone).format('YYYY-MM-DD HH:mm');
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

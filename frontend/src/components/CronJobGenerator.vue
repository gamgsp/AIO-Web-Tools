<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Cron Job Generator</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Cron Job Generator helps you create cron job expressions for scheduling tasks.
    </p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Example Cron Expression:</h4>
        <pre class="bg-gray-100 p-2 rounded">
0 0 * * *
        </pre>
        <p class="text-lg mb-6">This expression schedules a job to run at midnight every day.</p>
      </div>
    </div>
    <div class="tool-form">
      <div class="form-group mb-4">
        <label for="minute" class="block text-gray-700 text-sm font-bold mb-2">Minute:</label>
        <input id="minute" v-model="minute" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="0-59"/>
      </div>
      <div class="form-group mb-4">
        <label for="hour" class="block text-gray-700 text-sm font-bold mb-2">Hour:</label>
        <input id="hour" v-model="hour" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="0-23"/>
      </div>
      <div class="form-group mb-4">
        <label for="dayOfMonth" class="block text-gray-700 text-sm font-bold mb-2">Day of Month:</label>
        <input id="dayOfMonth" v-model="dayOfMonth" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="1-31"/>
      </div>
      <div class="form-group mb-4">
        <label for="month" class="block text-gray-700 text-sm font-bold mb-2">Month:</label>
        <input id="month" v-model="month" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="1-12"/>
      </div>
      <div class="form-group mb-4">
        <label for="dayOfWeek" class="block text-gray-700 text-sm font-bold mb-2">Day of Week:</label>
        <input id="dayOfWeek" v-model="dayOfWeek" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="0-6 (Sunday=0)"/>
      </div>
      <div class="form-group mb-4">
        <label for="command" class="block text-gray-700 text-sm font-bold mb-2">Command:</label>
        <input id="command" v-model="command" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter command..."/>
      </div>
      <div class="tool-actions">
        <button @click="generateCronExpression" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate Cron Command</button>
      </div>
    </div>
    <div v-if="cronCommand" class="generated-info mt-4">
      <h3 class="text-2xl font-bold mb-2">Generated Cron Command</h3>
      <p class="bg-gray-100 p-2 rounded break-words">{{ cronCommand }}</p>
      <p class="mt-2">Explanation: {{ explanation }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CronJobGenerator',
  data() {
    return {
      minute: '*',
      hour: '*',
      dayOfMonth: '*',
      month: '*',
      dayOfWeek: '*',
      command: '',
      cronCommand: '',
      explanation: '',
    };
  },
  methods: {
    generateCronExpression() {
      const cronExpression = `${this.minute} ${this.hour} ${this.dayOfMonth} ${this.month} ${this.dayOfWeek}`;
      this.cronCommand = `${cronExpression} ${this.command}`;
      this.explanation = this.getExplanation(cronExpression);
    },
    getExplanation(cronExpression) {
      return `This cron expression (${cronExpression}) schedules a job to run the command '${this.command}' at the specified times.`;
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

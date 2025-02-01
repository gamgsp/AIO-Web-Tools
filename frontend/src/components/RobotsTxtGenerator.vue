<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Robots.txt Generator</h2>
    <p class="text-lg mb-6">
      <strong>Description</strong>: The Robots.txt Generator helps you create a `robots.txt` file to manage web crawlers' access to your website.
    </p>
    <div class="tool-form mb-6">
      <form @submit.prevent="generateRobotsTxt">
        <div class="form-group mb-4">
          <label for="userAgent" class="block text-gray-700 text-sm font-bold mb-2">User-Agent:</label>
          <input id="userAgent" v-model="userAgent" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="*"/>
        </div>
        <div class="form-group mb-4">
          <label for="disallow" class="block text-gray-700 text-sm font-bold mb-2">Disallow:</label>
          <input id="disallow" v-model="disallow" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="/admin"/>
        </div>
        <div class="form-group mb-4">
          <label for="allow" class="block text-gray-700 text-sm font-bold mb-2">Allow:</label>
          <input id="allow" v-model="allow" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="/public"/>
        </div>
        <div class="form-group mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Select Crawlers:</label>
          <div v-for="crawler in crawlers" :key="crawler.name" class="mb-2">
            <span class="block text-gray-700 text-sm font-bold mb-1">{{ crawler.name }}</span>
            <label class="inline-flex items-center">
              <input type="checkbox" v-model="crawler.allow" class="form-checkbox h-5 w-5 text-blue-600" @change="updateCrawlerSelection(crawler, 'allow')" :disabled="crawler.disallow"/>
              <span class="ml-2">Allow</span>
            </label>
            <label class="inline-flex items-center ml-4">
              <input type="checkbox" v-model="crawler.disallow" class="form-checkbox h-5 w-5 text-red-600" @change="updateCrawlerSelection(crawler, 'disallow')" :disabled="crawler.allow"/>
              <span class="ml-2">Disallow</span>
            </label>
          </div>
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="loading">
            <span v-if="loading" class="spinner-border"></span>
            <span v-else>Generate robots.txt</span>
          </button>
        </div>
      </form>
    </div>
    <div v-if="robotsTxt" class="mt-4">
      <h4 class="text-lg font-bold">Generated robots.txt:</h4>
      <pre class="bg-gray-100 p-2 rounded">{{ robotsTxt }}</pre>
    </div>
    <p v-if="error" class="error text-red-500">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RobotsTxtGenerator',
  data() {
    return {
      userAgent: '*',
      disallow: '/admin',
      allow: '/public',
      crawlers: [
        { name: 'Google Bot', allow: false, disallow: false },
        { name: 'Bing Bot', allow: false, disallow: false },
        { name: 'Slurp (Yahoo)', allow: false, disallow: false },
        { name: 'DuckDuckBot', allow: false, disallow: false },
        { name: 'Baiduspider', allow: false, disallow: false },
        { name: 'Yandex Bot', allow: false, disallow: false },
      ],
      robotsTxt: '',
      error: '',
      loading: false,
    };
  },
  methods: {
    updateCrawlerSelection(crawler, type) {
      if (type === 'allow') {
        crawler.disallow = false;
      } else {
        crawler.allow = false;
      }
    },
    async generateRobotsTxt() {
      this.loading = true;
      this.error = '';
      this.robotsTxt = '';
      try {
        // Detect current protocol and host
        const protocol = window.location.protocol;
        const host = window.location.hostname;
        const port = 5000;

        // Construct the API URL with the correct port
        const apiUrl = `${protocol}//${host}:${port}/api/generate-robots-txt`;

        const allowCrawlers = this.crawlers.filter(crawler => crawler.allow).map(crawler => crawler.name);
        const disallowCrawlers = this.crawlers.filter(crawler => crawler.disallow).map(crawler => crawler.name);

        const response = await axios.post(apiUrl, {
          userAgent: this.userAgent,
          disallow: this.disallow,
          allow: this.allow,
          allowCrawlers: allowCrawlers,
          disallowCrawlers: disallowCrawlers,
        });
        this.robotsTxt = response.data.robotsTxt;
      } catch (error) {
        this.error = `Error: ${error.response ? error.response.data.message : error.message}`;
        console.error('Generation error:', this.error);
      } finally {
        this.loading = false;
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
.form-checkbox:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

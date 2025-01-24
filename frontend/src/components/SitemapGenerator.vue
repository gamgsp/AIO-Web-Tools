<template>
  <div class="tool-page">
    <h2 class="text-3xl font-bold mb-4">Sitemap Generator</h2>
    <p class="text-lg mb-6">This tool allows you to generate a sitemap for your website. Simply enter the URLs and click "Generate" to create the sitemap.</p>
    <p class="text-lg mb-6"><strong>Usage Example:</strong></p>
    <div class="tool-example">
      <div class="example-section">
        <h4 class="text-lg font-bold mb-2">Generate Sitemap:</h4>
        <p class="text-lg mb-6">Enter the URLs like this:</p>
        <pre class="bg-gray-100 p-2 rounded">
https://www.example.com/
https://www.example.com/about
https://www.example.com/contact
        </pre>
        <p class="text-lg mb-6">Select Change Frequency: <code>daily</code></p>
        <p class="text-lg mb-6">Enter Priority: <code>0.8</code></p>
        <p class="text-lg mb-6">Click "Generate" to get the following sitemap content:</p>
        <pre class="bg-gray-100 p-2 rounded"><code>{{ exampleSitemap }}</code></pre>
      </div>
    </div>
    <div class="tool-form">
      <form @submit.prevent="generateSitemap">
        <div class="form-group mb-4">
          <label for="urls" class="block text-gray-700 text-sm font-bold mb-2">URLs:</label>
          <textarea id="urls" v-model="urls" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y" rows="10" placeholder="Enter each URL on a new line"></textarea>
        </div>
        <div class="form-group mb-4">
          <label for="changefreq" class="block text-gray-700 text-sm font-bold mb-2">Change Frequency:</label>
          <select id="changefreq" v-model="changefreq" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="always">Always</option>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="never">Never</option>
          </select>
        </div>
        <div class="form-group mb-4">
          <label for="priority" class="block text-gray-700 text-sm font-bold mb-2">Priority:</label>
          <input id="priority" v-model="priority" type="number" min="0.0" max="1.0" step="0.1" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter priority (0.0 - 1.0)">
        </div>
        <div class="tool-actions">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate</button>
        </div>
      </form>
    </div>
    <div class="generated-sitemap mt-4" v-if="sitemap">
      <h3 class="text-2xl font-bold mb-2">Generated Sitemap</h3>
      <pre class="bg-gray-100 p-2 rounded"><code>{{ sitemap }}</code></pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SitemapGenerator',
  data() {
    return {
      urls: '',
      changefreq: 'daily',
      priority: 0.5,
      sitemap: '',
      exampleSitemap: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>https://www.example.com/</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>\n  <url>\n    <loc>https://www.example.com/about</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>\n  <url>\n    <loc>https://www.example.com/contact</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>\n</urlset>`
    };
  },
  methods: {
    generateSitemap() {
      const urls = this.urls.split('\n').map(url => url.trim()).filter(url => url !== '');
      const sitemap = urls.map(url => `
  <url>
    <loc>${url}</loc>
    <changefreq>${this.changefreq}</changefreq>
    <priority>${this.priority}</priority>
  </url>`).join('');
      this.sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemap}
</urlset>`;
    }
  }
};
</script>

<style scoped>
@import '@/assets/toolstyles.css';
</style>

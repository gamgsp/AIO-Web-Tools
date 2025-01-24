<template>
  <div class="flex flex-col min-h-screen">
    <div class="flex flex-1">
      <!-- Sidebar Section -->
      <nav class="bg-gray-200 p-4 shadow flex-shrink-0" style="width: 380px;">
        <!-- Logo Section -->
        <div class="flex items-center justify-center mb-4">
          <router-link to="/">
          <img :src="require('@/assets/logo.png')" alt="Brand Logo" class="h-13 w-auto">
           </router-link>
        </div>
        <div class="container mx-auto">
          <ul class="sidebar">
          <li><router-link to="/" class="text-blue-600 hover:text-blue-800 font-bold text-lg" exact>Homepage</router-link></li>
          <li><router-link to="/ToolsList" class="text-blue-600 hover:text-blue-800 font-bold text-lg" exact>Tools List</router-link></li>          
            <!-- Converters Category -->
            <li>
              <a href="#" @click="toggleCategory('converters')" class="text-blue-600 hover:text-blue-800 font-bold text-lg">
                <span>{{ categories.converters ? '-' : '+' }}</span> Converters
              </a>
              <ul v-if="categories.converters" class="ml-4">
                <li class="container-listing tool-container"><router-link to="/html-markdown-converter" active-class="active tool-active">HTML to Markdown / Markdown to HTML</router-link></li>
                <li class="container-listing tool-container"><router-link to="/json-xml-converter" active-class="active tool-active">JSON to XML / XML to JSON Converter</router-link></li>
                <li class="container-listing tool-container"><router-link to="/csv-json-converter" active-class="active tool-active">CSV to JSON / JSON to CSV</router-link></li>
                <li class="container-listing tool-container"><router-link to="/base64-encoder-decoder" active-class="active tool-active">Base64 Encoder/Decoder</router-link></li>
                <li class="container-listing tool-container"><router-link to="/url-encoder-decoder" active-class="active tool-active">URL Encoder/Decoder</router-link></li>
                <li class="container-listing tool-container"><router-link to="/hex-rgb-converter" active-class="active tool-active">Hex to RGB / RGB to Hex</router-link></li>
                <li class="container-listing tool-container"><router-link to="/html-entities-encoder-decoder" active-class="active tool-active">HTML Entities Encoder/Decoder</router-link></li>
                <li class="container-listing tool-container"><router-link to="/binary-text-converter" active-class="active tool-active">Binary to Text / Text to Binary</router-link></li>
                <li class="container-listing tool-container"><router-link to="/text-ascii-converter" active-class="active tool-active">Text to ASCII / ASCII to Text</router-link></li>
                <li class="container-listing tool-container"><router-link to="/epoch-time-converter" active-class="active tool-active">Epoch Time Converter</router-link></li>
                <li class="container-listing tool-container"><router-link to="/html-php-converter" active-class="active tool-active">HTML to PHP / PHP to HTML Converter</router-link></li>
                <li class="container-listing tool-container"><router-link to="/rgb-to-hsl-converter" active-class="active">RGB to HSL Converter</router-link></li>
              </ul>
            </li>
            <!-- Generators Category -->
            <li>
              <a href="#" @click="toggleCategory('generators')" class="text-blue-600 hover:text-blue-800 font-bold text-lg">
                <span>{{ categories.generators ? '-' : '+' }}</span> Generators
              </a>
              <ul v-if="categories.generators" class="ml-4">
                <li class="container-listing tool-container"><router-link to="/meta-tags-generator" active-class="active">Meta Tags Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/robots-txt-generator" active-class="active">Robots.txt Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/sitemap-generator" active-class="active">Sitemap Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/lorem-ipsum-generator" active-class="active">Lorem Ipsum Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/password-generator" active-class="active">Password Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/uuid-generator" active-class="active">UUID Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/qr-code-generator" active-class="active">QR Code Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/barcode-generator" active-class="active">Barcode Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/image-placeholder-generator" active-class="active">Image Placeholder Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/box-shadow-generator" active-class="active">CSS Box Shadow Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/gradient-generator" active-class="active">CSS Gradient Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/border-radius-generator" active-class="active">CSS Border Radius Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/flexbox-generator" active-class="active">CSS Flexbox Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/color-palette-generator" active-class="active">Color Palette Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/favicon-generator" active-class="active">Favicon Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/open-graph-tags-generator" active-class="active">Open Graph Tags Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/social-media-preview-card-generator" active-class="active">Social Media Preview Card Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/fake-data-generator" active-class="active">Fake Data Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/utm-link-generator" active-class="active">UTM Link Generator</router-link></li>
              </ul>
            </li>
            <!-- Lookup Tools Category -->
            <li>
              <a href="#" @click="toggleCategory('lookupTools')" class="text-blue-600 hover:text-blue-800 font-bold text-lg">
                <span>{{ categories.lookupTools ? '-' : '+' }}</span> Lookup Tools
              </a>
              <ul v-if="categories.lookupTools" class="ml-4">
                <li class="container-listing tool-container"><router-link to="/whois-lookup" active-class="active tool-active">Whois Lookup</router-link></li>
                <li class="container-listing tool-container"><router-link to="/dns-lookup" active-class="active tool-active">DNS Lookup</router-link></li>
                <li class="container-listing tool-container"><router-link to="/reverse-dns-lookup" active-class="active tool-active">Reverse DNS Lookup</router-link></li>
                <li class="container-listing tool-container"><router-link to="/ip-geolocation" active-class="active tool-active">IP Geolocation</router-link></li>
                <li class="container-listing tool-container"><router-link to="/ssl-certificate-checker" active-class="active tool-active">SSL Certificate Checker</router-link></li>
                <li class="container-listing tool-container"><router-link to="/http-header-checker" active-class="active tool-active">HTTP Header Checker</router-link></li>
                <li class="container-listing tool-container"><router-link to="/page-speed-tester" active-class="active tool-active">Page Speed Tester</router-link></li>
                <li class="container-listing tool-container"><router-link to="/domain-age-checker" active-class="active tool-active">Domain Age Checker</router-link></li>
                <li class="container-listing tool-container"><router-link to="/http-status-checker" active-class="active tool-active">HTTP Status Code Checker</router-link></li>
                <li class="container-listing tool-container"><router-link to="/browser-info" active-class="active tool-active">Browser Information Lookup</router-link></li>
              </ul>
            </li>
            <!-- Validators Category -->
            <li>
              <a href="#" @click="toggleCategory('validators')" class="text-blue-600 hover:text-blue-800 font-bold text-lg">
                <span>{{ categories.validators ? '-' : '+' }}</span> Validators
              </a>
              <ul v-if="categories.validators" class="ml-4">
                <li class="container-listing tool-container"><router-link to="/html-validator" active-class="active tool-active">HTML Validator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/css-validator" active-class="active tool-active">CSS Validator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/json-validator" active-class="active tool-active">JSON Validator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/javascript-validator" active-class="active tool-active">JavaScript Code Validator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/xml-validator" active-class="active tool-active">XML Validator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/email-validator" active-class="active tool-active">Email Address Validator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/url-validator" active-class="active tool-active">URL Validator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/schema-validator" active-class="active tool-active">Schema Markup Validator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/accessibility-checker" active-class="active tool-active">Accessibility Checker (WCAG Compliance)</router-link></li>
              </ul>
            </li>
            <!-- Minify/Unminify Tools Category -->
            <li>
              <a href="#" @click="toggleCategory('minifyTools')" class="text-blue-600 hover:text-blue-800 font-bold text-lg">
                <span>{{ categories.minifyTools ? '-' : '+' }}</span> Minify/Unminify Tools
              </a>
              <ul v-if="categories.minifyTools" class="ml-4">
                <li class="container-listing tool-container"><router-link to="/html-minifier" active-class="active tool-active">HTML Minifier/Unminifier</router-link></li>
                <li class="container-listing tool-container"><router-link to="/css-minifier" active-class="active tool-active">CSS Minifier/Unminifier</router-link></li>
                <li class="container-listing tool-container"><router-link to="/js-minifier" active-class="active tool-active">JavaScript Minifier/Unminifier</router-link></li>
                <li class="container-listing tool-container"><router-link to="/json-formatter" active-class="active tool-active">JSON Minifier/Prettifier</router-link></li>
              </ul>
            </li>
            <!-- Code Formatters Category -->
            <li>
              <a href="#" @click="toggleCategory('codeFormatters')" class="text-blue-600 hover:text-blue-800 font-bold text-lg">
                <span>{{ categories.codeFormatters ? '-' : '+' }}</span> Code Formatters
              </a>
              <ul v-if="categories.codeFormatters" class="ml-4">
                <li class="container-listing tool-container"><router-link to="/html-formatter" active-class="active tool-active">HTML Formatter</router-link></li>
                <li class="container-listing tool-container"><router-link to="/css-formatter" active-class="active tool-active">CSS Formatter</router-link></li>
                <li class="container-listing tool-container"><router-link to="/js-formatter" active-class="active tool-active">JavaScript Formatter</router-link></li>
                <li class="container-listing tool-container"><router-link to="/sql-formatter" active-class="active tool-active">SQL Formatter</router-link></li>
                <li class="container-listing tool-container"><router-link to="/python-formatter" active-class="active tool-active">Python Formatter</router-link></li>
                <li class="container-listing tool-container"><router-link to="/php-formatter" active-class="active tool-active">PHP Formatter</router-link></li>
              </ul>
            </li>
            <!-- SEO Tools Category -->
            <li>
              <a href="#" @click="toggleCategory('seoTools')" class="text-blue-600 hover:text-blue-800 font-bold text-lg">
                <span>{{ categories.seoTools ? '-' : '+' }}</span> SEO Tools
              </a>
              <ul v-if="categories.seoTools" class="ml-4">
                <li class="container-listing tool-container"><router-link to="/keyword-density-checker" active-class="active tool-active">Keyword Density Checker</router-link></li>
                <li class="container-listing tool-container"><router-link to="/seo-analyzer" active-class="active tool-active">SEO Title & Description Analyzer</router-link></li>
                <li class="container-listing tool-container"><router-link to="/serp-preview-tool" active-class="active tool-active">SERP Preview Tool</router-link></li>
                <li class="container-listing tool-container"><router-link to="/redirect-checker" active-class="active tool-active">Redirect Checker</router-link></li>
                <li class="container-listing tool-container"><router-link to="/broken-link-checker" active-class="active tool-active">Broken Link Checker</router-link></li>
                <li class="container-listing tool-container"><router-link to="/website-uptime-checker" active-class="active tool-active">Website Uptime Checker</router-link></li>
                <li class="container-listing tool-container"><router-link to="/content-word-counter" active-class="active tool-active">Content Word Counter</router-link></li>
                <li class="container-listing tool-container"><router-link to="/backlink-checker" active-class="active tool-active">Backlink Checker</router-link></li>
              </ul>
            </li>
            <!-- Security Tools Category -->
            <li>
              <a href="#" @click="toggleCategory('securityTools')" class="text-blue-600 hover:text-blue-800 font-bold text-lg">
                <span>{{ categories.securityTools ? '-' : '+' }}</span> Security Tools
              </a>
              <ul v-if="categories.securityTools" class="ml-4">
                <li class="container-listing tool-container"><router-link to="/password-hash-generator" active-class="active tool-active">Password Hash Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/xss-vulnerability-tester" active-class="active tool-active">XSS Vulnerability Tester</router-link></li>
                <li class="container-listing tool-container"><router-link to="/csrf-token-generator" active-class="active tool-active">CSRF Token Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/secure-token-generator" active-class="active tool-active">Secure Token Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/key-pair-generator" active-class="active tool-active">Public Key/Private Key Generator</router-link></li>
              </ul>
            </li>
            <!-- Image/File Utilities Category -->
            <li>
              <a href="#" @click="toggleCategory('imageFileUtilities')" class="text-blue-600 hover:text-blue-800 font-bold text-lg">
                <span>{{ categories.imageFileUtilities ? '-' : '+' }}</span> Image/File Utilities
              </a>
              <ul v-if="categories.imageFileUtilities" class="ml-4">
                <li class="container-listing tool-container"><router-link to="/image-aio-tool" active-class="active tool-active">Image AIO Tool</router-link></li>
                <li class="container-listing tool-container"><router-link to="/exif-data-viewer" active-class="active tool-active">EXIF Data Viewer</router-link></li>
                <li class="container-listing tool-container"><router-link to="/svg-optimizer" active-class="active tool-active">SVG Optimizer</router-link></li>
              </ul>
            </li>
            <!-- Debugging/Development Tools Category -->
            <li>
              <a href="#" @click="toggleCategory('debugTools')" class="text-blue-600 hover:text-blue-800 font-bold text-lg">
                <span>{{ categories.debugTools ? '-' : '+' }}</span> Debugging/Development Tools
              </a>
              <ul v-if="categories.debugTools" class="ml-4">
                <li class="container-listing tool-container"><router-link to="/jsonpath-tester" active-class="active tool-active">JSON Path Tester</router-link></li>
                <li class="container-listing tool-container"><router-link to="/regex-tester" active-class="active tool-active">Regex Tester</router-link></li>
                <li class="container-listing tool-container"><router-link to="/regex-generator" active-class="active tool-active">Regex Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/api-response-tester" active-class="active tool-active">API Response Tester</router-link></li>
                <li class="container-listing tool-container"><router-link to="/curl-command-generator" active-class="active tool-active">Curl Command Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/websocket-tester" active-class="active tool-active">WebSocket Tester</router-link></li>
                <li class="container-listing tool-container"><router-link to="/cron-job-generator" active-class="active tool-active">Cron Job Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/htaccess-redirect-generator" active-class="active tool-active">htaccess Redirect Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/http-request-viewer" active-class="active tool-active">HTTP Request Viewer</router-link></li>
                <li class="container-listing tool-container"><router-link to="/jwt-decoder" active-class="active tool-active">JWT Decoder</router-link></li>
                <li class="container-listing tool-container"><router-link to="/api-request-builder" active-class="active tool-active">API Request Builder</router-link></li>
                <li class="container-listing tool-container"><router-link to="/webhook-tester" active-class="active tool-active">Webhook Tester</router-link></li>
                <li class="container-listing tool-container"><router-link to="/css-animation-generator" active-class="active tool-active">CSS Animation Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/cors-tester" active-class="active tool-active">CORS Tester</router-link></li>
              </ul>
            </li>
            <!-- Miscellaneous Development Tools Category -->
            <li>
              <a href="#" @click="toggleCategory('miscDevelopmentTools')" class="text-blue-600 hover:text-blue-800 font-bold text-lg">
                <span>{{ categories.miscDevelopmentTools ? '-' : '+' }}</span> Miscellaneous Development Tools
              </a>
              <ul v-if="categories.miscDevelopmentTools" class="ml-4">
                <li class="container-listing tool-container"><router-link to="/unix-timestamp-generator" active-class="active tool-active">Unix Timestamp Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/unicode-character-lookup" active-class="active tool-active">Unicode Character Lookup</router-link></li>
                <li class="container-listing tool-container"><router-link to="/browser-fingerprinting-tool" active-class="active tool-active">Browser Fingerprinting Tool</router-link></li>
                <li class="container-listing tool-container"><router-link to="/screen-resolution-tester" active-class="active tool-active">Screen Resolution Tester</router-link></li>
                <li class="container-listing tool-container"><router-link to="/time-zone-converter" active-class="active tool-active">Time Zone Converter</router-link></li>
                <li class="container-listing tool-container"><router-link to="/unit-converter" active-class="active tool-active">Unit Converter</router-link></li>
                </ul>
            </li>
            <!-- Database Utilities Category -->
            <li>
              <a href="#" @click="toggleCategory('databaseUtilities')" class="text-blue-600 hover:text-blue-800 font-bold text-lg">
                <span>{{ categories.databaseUtilities ? '-' : '+' }}</span> Database Utilities
              </a>
              <ul v-if="categories.databaseUtilities" class="ml-4">
                <li class="container-listing tool-container"><router-link to="/sql-query-generator" active-class="active tool-active">SQL Query Generator</router-link></li>
                <li class="container-listing tool-container"><router-link to="/database-schema-designer" active-class="active tool-active">Database Schema Designer</router-link></li>
                <li class="container-listing tool-container"><router-link to="/mongodb-query-builder" active-class="active tool-active">MongoDB Query Builder</router-link></li>
                <li class="container-listing tool-container"><router-link to="/sqlite-query-builder" active-class="active tool-active">SQLite Query Builder</router-link></li>
                <li class="container-listing tool-container"><router-link to="/postgresql-query-builder" active-class="active tool-active">PostgreSQL Query Builder</router-link></li>
              </ul>
            </li>
            <!-- Front-End Utilities Category -->
            <li>
              <a href="#" @click="toggleCategory('frontendUtilities')" class="text-blue-600 hover:text-blue-800 font-bold text-lg">
                <span>{{ categories.frontendUtilities ? '-' : '+' }}</span> Front-End Utilities
              </a>
              <ul v-if="categories.frontendUtilities" class="ml-4">
                <li class="container-listing tool-container"><router-link to="/svg-to-css-converter" active-class="active tool-active">SVG to CSS Converter</router-link></li>
                <li class="container-listing tool-container"><router-link to="/font-pairing-tool" active-class="active tool-active">Font Pairing Tool</router-link></li>
                <li class="container-listing tool-container"><router-link to="/accessibility-contrast-checker" active-class="active tool-active">Accessibility Contrast Checker</router-link></li>
                <li class="container-listing tool-container"><router-link to="/css-clip-path-generator" active-class="active tool-active">CSS Clip Path Generator</router-link></li>
              </ul>
            </li>
            <!-- Security-Focused Tools Category -->
            <li>
              <a href="#" @click="toggleCategory('securityFocusedTools')" class="text-blue-600 hover:text-blue-800 font-bold text-lg">
                <span>{{ categories.securityFocusedTools ? '-' : '+' }}</span> Security-Focused Tools
              </a>
              <ul v-if="categories.securityFocusedTools" class="ml-4">
                <li class="container-listing tool-container"><router-link to="/subdomain-scanner" active-class="active tool-active">Subdomain Scanner</router-link></li>
                <li class="container-listing tool-container"><router-link to="/csp-generator" active-class="active tool-active">CSP Generator</router-link></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Main Content Section -->
      <div class="flex flex-col flex-grow">
        <!-- Header Section -->
        <header class="bg-gray-200 text-black p-4 shadow-lg flex justify-between items-center">
          <!-- Title Section -->
          <div class="flex-1 flex justify-center">
            <h1 class="text-2xl font-bold">{{ currentRouteName }}</h1>
          </div>
        </header>

        <!-- Main Content -->
        <main class="container mx-auto py-8 flex-grow">
          <router-view></router-view>
        </main>
      </div>
    </div>

    <!-- Footer Section -->
    <footer class="bg-gray-800 text-white p-4 text-center shadow-inner">
      <p>&copy; {{ new Date().getFullYear() }} {{ brandName }}. All rights reserved. Powered by <a href="https://globalwebdev.us" target="_blank">Global Web Dev</a></p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'AppLayout',
  data() {
    return {
      brandName: 'AIO Web Tools',
      logo: '/path/to/logo.png',
      categories: {
        converters: false,
      }
    }
  },
  computed: {
    currentRouteName() {
      const routeName = this.$route.name;
      if (routeName) {
        return routeName.replace(/([A-Z])/g, ' $1').trim();
      }
      return 'Dashboard';
    }
  },
  methods: {
    toggleCategory(category) {
      this.categories[category] = !this.categories[category];
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Open+Sans:wght@400;700&display=swap');

h1 { letter-spacing: normal; /* Ensure letter-spacing is normal */ }

body {
  font-family: 'Open Sans', sans-serif;
}
h1, h2, h3, h4, h5, h6 {
  font-family: 'Montserrat', sans-serif;
}
.main-content {
  padding-left: 20px; /* Ensure content is properly aligned from the sidebar */
  padding-right: 20px; /* Add right padding for consistency */
  transition: padding 0.3s;
}
@media (max-width: 768px) {
  .main-content {
    padding-left: 10px; /* Adjust for smaller screens */
    padding-right: 10px; /* Adjust for smaller screens */
  }
}
.dashboard-message {
  margin: 0 auto; /* Center align the message */
  max-width: 800px; /* Optional: Limit the maximum width */
  text-align: center; /* Center the text */
}
.sidebar {
  padding: 0;
  list-style-type: none;
  width: 350px; /* Sidebar width */
}
.sidebar li {
  margin-bottom: 10px;
}
.sidebar li a {
  display: block;
  padding: 10px;
  border-radius: 4px;
  background-color: #2c3e50; /* Darker color for background */
  color: white;
  text-decoration: none;
  transition: background-color 0.3s;
  white-space: nowrap; /* Ensure single line */
}
.sidebar li a:hover,
.sidebar li a.active {
  background-color: #e74c3c; /* Bright color for hover and active state */
}
.dashboard-button {
  font-weight: bold; /* Make the font bold */
}
.container-listing {
  background-color: #2c3e50;
  border-radius: 4px;
  margin-bottom: 10px;
  padding-top: 10px; /* Add padding above */
  padding-bottom: 10px; /* Add padding below */
  transition: background-color 0.3s;
}
.container-listing:hover {
  background-color: #e74c3c;
}
.category-container {
  background-color: #34495e; /* Different color for category container */
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 16px; /* Ensure more space at the bottom */
  margin-top: 10px; /* Add padding above */
  padding-bottom: 10px; /* Add padding below */
}
.tool-container {
  background-color: #1abc9c; /* Bright color for tool container */
  padding: 10px;
  padding-top: 10px; /* Add padding above */
  padding-bottom: 10px; /* Add padding below */
  border-radius: 4px;
  margin-bottom: 8px;
}
.category-container + .tool-container {
  margin-top: 10px; /* Ensure space between category container and first tool container */
}
.tool-container:hover {
  background-color: #16a085; /* Slightly darker shade on hover */
}
.tool-active {
  background-color: #2980b9 !important; /* Highlight color for selected tool */
}
</style>

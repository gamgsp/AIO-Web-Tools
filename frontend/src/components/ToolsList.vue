<template>
  <div class="container">
    <h1><strong>List of Tools</strong></h1>
    <div class="search-box">
      <input type="text" v-model="searchQuery" placeholder="Search for tools..." />
    </div>
    <div v-for="category in filteredCategories" :key="category.name" class="category-box">
      <h1><strong>{{ category.name }}</strong></h1>
      <div class="tools-grid">
        <div v-for="tool in category.tools" :key="tool.name" class="tool-box">
          <a :href="tool.link">{{ tool.name }}</a>
          <p>{{ tool.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      categories: [
        {
  name: 'Converters',
  tools: [
    { name: 'HTML to Markdown / Markdown to HTML Converter', description: 'Convert HTML to Markdown', link: '/html-markdown-converter' },
    { name: 'JSON to XML / XML to JSON Converter', description: 'Convert JSON to XML', link: '/json-xml-converter' },
    { name: 'CSV to JSON / JSON to CSV Converter', description: 'Convert CSV to JSON', link: '/csv-json-converter' },
    { name: 'Base64 Encoder/Decoder', description: 'Encode/Decode Base64', link: '/base64-encoder-decoder' },
    { name: 'URL Encoder/Decoder', description: 'Encode/Decode URLs', link: '/url-encoder-decoder' },
    { name: 'Hex to RGB / RGB to Hex Converter', description: 'Convert Hex to RGB', link: '/hex-rgb-converter' },
    { name: 'HTML Entities Encoder/Decoder', description: 'Encode/Decode HTML Entities', link: '/html-entities-encoder-decoder' },
    { name: 'Binary to Text / Text to Binary Converter', description: 'Convert Binary to Text', link: '/binary-text-converter' },
    { name: 'Text to ASCII / ASCII to Text Converter', description: 'Convert Text to ASCII', link: '/text-ascii-converter' },
    { name: 'Epoch Time Converter', description: 'Convert Epoch Time', link: '/epoch-time-converter' },
    { name: 'HTML to PHP / PHP to HTML Converter', description: 'Convert HTML to PHP', link: '/html-php-converter' },
    { name: 'RGB to HSL Converter', description: 'Convert RGB to HSL', link: '/rgb-to-hsl-converter' },
  ],

        },
        {
  name: 'Generators',
  tools: [
    { name: 'Meta Tags Generator', description: 'Generate meta tags for your website', link: '/meta-tags-generator' },
    { name: 'Robots.txt Generator', description: 'Generate a robots.txt file', link: '/robots-txt-generator' },
    { name: 'Sitemap Generator', description: 'Generate a sitemap', link: '/sitemap-generator' },
    { name: 'Lorem Ipsum Generator', description: 'Generate Lorem Ipsum text', link: '/lorem-ipsum-generator' },
    { name: 'Password Generator', description: 'Generate secure passwords', link: '/password-generator' },
    { name: 'UUID Generator', description: 'Generate UUIDs', link: '/uuid-generator' },
    { name: 'QR Code Generator', description: 'Generate QR codes', link: '/qr-code-generator' },
    { name: 'Barcode Generator', description: 'Generate barcodes', link: '/barcode-generator' },
    { name: 'Image Placeholder Generator', description: 'Generate image placeholders', link: '/image-placeholder-generator' },
    { name: 'CSS Box Shadow Generator', description: 'Generate CSS box shadows', link: '/box-shadow-generator' },
    { name: 'CSS Gradient Generator', description: 'Generate CSS gradients', link: '/gradient-generator' },
    { name: 'CSS Border Radius Generator', description: 'Generate CSS border radius', link: '/border-radius-generator' },
    { name: 'CSS Flexbox Generator', description: 'Generate CSS flexbox layouts', link: '/flexbox-generator' },
    { name: 'Color Palette Generator', description: 'Generate color palettes', link: '/color-palette-generator' },
    { name: 'Favicon Generator', description: 'Generate favicons', link: '/favicon-generator' },
    { name: 'Open Graph Tags Generator', description: 'Generate Open Graph tags', link: '/open-graph-tags-generator' },
    { name: 'Social Media Preview Card Generator', description: 'Generate social media preview cards', link: '/social-media-preview-card-generator' },
    { name: 'Fake Data Generator', description: 'Generate fake data', link: '/fake-data-generator' },
    { name: 'UTM Link Generator', description: 'Generate UTM links', link: '/utm-link-generator' },
  ],
},
        {
  name: 'Lookup Tools',
  tools: [
    { name: 'Whois Lookup', description: 'Retrieve Whois information for a given domain', link: '/whois-lookup' },
    { name: 'DNS Lookup', description: 'Perform a DNS lookup', link: '/dns-lookup' },
    { name: 'Reverse DNS Lookup', description: 'Perform a reverse DNS lookup', link: '/reverse-dns-lookup' },
    { name: 'IP Geolocation', description: 'Find the geographical location of an IP address', link: '/ip-geolocation' },
    { name: 'SSL Certificate Checker', description: 'Check SSL certificates', link: '/ssl-certificate-checker' },
    { name: 'HTTP Header Checker', description: 'Check HTTP headers', link: '/http-header-checker' },
    { name: 'Page Speed Tester', description: 'Test page speed', link: '/page-speed-tester' },
    { name: 'Domain Age Checker', description: 'Check the age of a domain', link: '/domain-age-checker' },
    { name: 'HTTP Status Code Checker', description: 'Check HTTP status codes', link: '/http-status-checker' },
    { name: 'Browser Information Lookup', description: 'Look up browser information', link: '/browser-info' },
  ],
},
{
  name: 'Validators',
  tools: [
    { name: 'HTML Validator', description: 'Validate HTML', link: '/html-validator' },
    { name: 'CSS Validator', description: 'Validate CSS', link: '/css-validator' },
    { name: 'JSON Validator', description: 'Validate JSON', link: '/json-validator' },
    { name: 'JavaScript Code Validator', description: 'Validate JavaScript code', link: '/javascript-code-validator' },
    { name: 'XML Validator', description: 'Validate XML', link: '/xml-validator' },
    { name: 'Email Address Validator', description: 'Validate email addresses', link: '/email-validator' },
    { name: 'URL Validator', description: 'Validate URLs', link: '/url-validator' },
    { name: 'Schema Markup Validator', description: 'Validate schema markup', link: '/schema-validator' },
    { name: 'Accessibility Checker (WCAG Compliance)', description: 'Check for WCAG compliance', link: '/accessibility-checker' },
  ],
},
{
  name: 'Minify/Unminify Tools',
  tools: [
    { name: 'HTML Minifier/Unminifier', description: 'Minify/Unminify HTML', link: '/html-minifier' },
    { name: 'CSS Minifier/Unminifier', description: 'Minify/Unminify CSS', link: '/css-minifier' },
    { name: 'JavaScript Minifier/Unminifier', description: 'Minify/Unminify JavaScript', link: '/js-minifier' },
    { name: 'JSON Minifier/Prettifier', description: 'Minify/Prettify JSON', link: '/json-formatter' },
  ],
},
{
  name: 'Code Formatters',
  tools: [
    { name: 'HTML Formatter', description: 'Format HTML code', link: '/html-formatter' },
    { name: 'CSS Formatter', description: 'Format CSS code', link: '/css-formatter' },
    { name: 'JavaScript Formatter', description: 'Format JavaScript code', link: '/js-formatter' },
    { name: 'SQL Formatter', description: 'Format SQL code', link: '/sql-formatter' },
    { name: 'Python Formatter', description: 'Format Python code', link: '/python-formatter' },
    { name: 'PHP Formatter', description: 'Format PHP code', link: '/php-formatter' },
  ],
},
{
  name: 'SEO Tools',
  tools: [
    { name: 'Keyword Density Checker', description: 'Check keyword density', link: '/keyword-density-checker' },
    { name: 'SEO Title & Description Analyzer', description: 'Analyze SEO title & description', link: '/seo-analyzer' },
    { name: 'SERP Preview Tool', description: 'Preview SERP', link: '/serp-preview-tool' },
    { name: 'Redirect Checker', description: 'Check redirects', link: '/redirect-checker' },
    { name: 'Broken Link Checker', description: 'Check for broken links', link: '/broken-link-checker' },
    { name: 'Website Uptime Checker', description: 'Check website uptime', link: '/website-uptime-checker' },
    { name: 'Content Word Counter', description: 'Count words in content', link: '/content-word-counter' },
    { name: 'Backlink Checker', description: 'Check backlinks', link: '/backlink-checker' },
  ],
},
{
  name: 'Security Tools',
  tools: [
    { name: 'Password Hash Generator', description: 'Generate password hashes', link: '/password-hash-generator' },
    { name: 'XSS Vulnerability Tester', description: 'Test for XSS vulnerabilities', link: '/xss-vulnerability-tester' },
    { name: 'CSRF Token Generator', description: 'Generate CSRF tokens', link: '/csrf-token-generator' },
    { name: 'Secure Token Generator', description: 'Generate secure tokens', link: '/secure-token-generator' },
    { name: 'Public Key/Private Key Generator', description: 'Generate public/private keys', link: '/key-pair-generator' },
  ],
},
{
  name: 'Image/File Utilities',
  tools: [
    { name: 'Image AIO Tool', description: 'All-in-one image tool', link: '/image-aio-tool' },
    { name: 'EXIF Data Viewer', description: 'View EXIF data', link: '/exif-data-viewer' },
    { name: 'SVG Optimizer', description: 'Optimize SVG files', link: '/svg-optimizer' },
  ],
},
{
  name: 'Database Utilities',
  tools: [
    { name: 'SQL Query Generator', description: 'Generate SQL queries', link: '/sql-query-generator' },
    { name: 'Database Schema Designer', description: 'Design database schemas', link: '/database-schema-designer' },
    { name: 'MongoDB Query Builder', description: 'Build MongoDB queries', link: '/mongodb-query-builder' },
    { name: 'SQLite Query Builder', description: 'Build SQLite queries', link: '/sqlite-query-builder' },
    { name: 'PostgreSQL Query Builder', description: 'Build PostgreSQL queries', link: '/postgresql-query-builder' },
  ],
},
{
  name: 'Miscellaneous Development Tools',
  tools: [
    { name: 'Unix Timestamp Generator', description: 'Generate Unix timestamps', link: '/unix-timestamp-generator' },
    { name: 'Unicode Character Lookup', description: 'Look up Unicode characters', link: '/unicode-character-lookup' },
    { name: 'Browser Fingerprinting Tool', description: 'Tool for browser fingerprinting', link: '/browser-fingerprinting-tool' },
    { name: 'Screen Resolution Tester', description: 'Test screen resolution', link: '/screen-resolution-tester' },
    { name: 'Time Zone Converter', description: 'Convert time zones', link: '/time-zone-converter' },
    { name: 'Unit Converter', description: 'Convert units', link: '/unit-converter' },
  ],
},
{
  name: 'Front-End Utilities',
  tools: [
    { name: 'SVG to CSS Converter', description: 'Convert SVG to CSS', link: '/svg-to-css-converter' },
    { name: 'Font Pairing Tool', description: 'Find font pairs', link: '/font-pairing-tool' },
    { name: 'Accessibility Contrast Checker', description: 'Check contrast for accessibility', link: '/accessibility-contrast-checker' },
    { name: 'CSS Clip Path Generator', description: 'Generate CSS clip paths', link: '/css-clip-path-generator' },
  ],
},
{
  name: 'Security-Focused Tools',
  tools: [
    { name: 'Subdomain Scanner', description: 'Scan for subdomains', link: '/subdomain-scanner' },
    { name: 'CSP Generator', description: 'Generate Content Security Policy (CSP)', link: '/csp-generator' },
  ],
}


      ],
    };
  },
  computed: {
    filteredCategories() {
      if (this.searchQuery === '') {
        return this.categories;
      }

      return this.categories.map(category => {
        const filteredTools = category.tools.filter(tool =>
          tool.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        return { ...category, tools: filteredTools };
      }).filter(category => category.tools.length > 0);
    },
  },
};
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



.container {
  max-width: 1200px;
  margin: auto;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
h1, h2 {
  color: #333;
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 16px; /* Ensure more space at the bottom */
  margin-top: 10px; /* Add padding above */
}
.tools-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.tool-box {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  width: calc(33.333% - 20px); /* Adjust the size as needed */
  box-sizing: border-box;
}
.tool-box a {
  color: #3498db;
  text-decoration: none;
  font-weight: bold;
}
.tool-box p {
  margin: 5px 0 0;
}
.search-box {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}
.search-box input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}



.tool-active {
  background-color: #2980b9 !important; /* Highlight color for selected tool */
}

</style>


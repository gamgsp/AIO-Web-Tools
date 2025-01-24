const express = require('express');
const whois = require('whois');
const cors = require('cors');
const dns = require('dns').promises;
const geoip = require('geoip-lite');
const whoisServers = require('./whoisServers'); // Import WHOIS servers
const axios = require('axios');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { exec } = require('child_process');
const { parse, differenceInYears } = require('date-fns');
const htmlValidator = require('html-validator');
const cssValidator = require('css-validator');
const cheerio = require('cheerio');
const crypto = require('crypto');
const sharp = require('sharp');
const multer = require('multer');
const schedule = require('node-schedule');
const exifParser = require('exif-parser');
const fs = require('fs');
const path = require('path');
const { optimize } = require('svgo');
const upload = multer({ dest: 'uploads/' });
const jsonpath = require('jsonpath');
const assert = require('assert');

const app = express();
app.use(cors());
app.use(express.json()); //

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../dist')));

const subdomains = [
  'www', 'mail', 'ftp', 'remote', 'blog', 'webmail', 'server', 'ns1', 'ns2', 'smtp', 'secure', 'vpn', 'm',
  'shop', 'imap', 'pop', 'pop3', 'dev', 'test', 'portal', 'beta', 'api', 'cpanel', 'mysql', 'staging'
];

app.post('/scan-subdomains', async (req, res) => {
  const { domain } = req.body;

  if (!domain) {
    return res.status(400).json({ error: 'Domain is required' });
  }

  const foundSubdomains = [];

  await Promise.all(
    subdomains.map(async (subdomain) => {
      const subdomainUrl = `${subdomain}.${domain}`;
      try {
        await dns.resolve(subdomainUrl);
        foundSubdomains.push(subdomainUrl);
      } catch (error) {
        // Ignore errors, subdomain might not exist
      }
    })
  );

  res.json({ subdomains: foundSubdomains });
});

app.post('/api/generate-curl-command', (req, res) => {
  try {
    const { url, method, body } = req.body;

    if (!url || !method) {
      throw new Error('URL and Method are required fields.');
    }

    let curlCommand = `curl -X ${method} "${url}"`;

    if (method !== 'GET' && body) {
      curlCommand += ` -d '${body}' -H "Content-Type: application/json"`;
    }

    res.json(curlCommand);
  } catch (error) {
    console.error('Error during Curl command generation:', error);
    res.status(500).json({ message: error.message });
  }
});


app.post('/api/test-api-response', async (req, res) => {
  try {
    const { url, method, body } = req.body;
    const config = {
      method,
      url,
    };
    if (method !== 'GET' && body) {
      config.data = body;
    }

    const response = await axios(config);
    res.json(response.data);
  } catch (error) {
    console.error('Error during API response testing:', error);
    res.status(500).json({ message: error.message });
  }
});

const generateRegex = (criteria) => {
  if (criteria.toLowerCase() === 'match any email address') {
    // If criteria is to match any email address
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  }
  if (criteria.toLowerCase() === 'match any phone number') {
    // If criteria is to match any phone number
    return /^\+?[1-9]\d{1,14}$/;
  }
  if (criteria.toLowerCase() === 'match a url') {
    // If criteria is to match a URL
    return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  }
  // Add more conditions to match different patterns based on criteria
  return 'No pattern matched your criteria. Please try different criteria.';
};

app.post('/api/generate-regex', (req, res) => {
  try {
    const { criteria } = req.body;
    const regex = generateRegex(criteria);
    res.json(regex.toString());
  } catch (error) {
    console.error('Error during Regex generation:', error);
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/test-regex', (req, res) => {
  try {
    const { inputString, regex } = req.body;
    const re = new RegExp(regex, 'g');
    const matches = [...inputString.matchAll(re)];
    const result = matches.map(match => match[0]);
    res.json(result);
  } catch (error) {
    console.error('Error during Regex evaluation:', error);
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/evaluate-jsonpath', (req, res) => {
  try {
      const { jsonData, jsonPath } = req.body;
      assert(jsonPath, 'JSONPath expression is required');
      const data = JSON.parse(jsonData);
      const result = jsonpath.query(data, jsonPath);
      res.json(result);
  } catch (error) {
      console.error('Error during JSONPath evaluation:', error);
      res.status(500).json({ message: error.message });
  }
});

const optimizeSVG = async (filePath, optimizedFilePath) => {
  console.log(`Optimizing SVG file: ${filePath}`);
  const svgContent = fs.readFileSync(filePath, 'utf8');
  const optimizedSVG = optimize(svgContent, {
      path: filePath,
      multipass: true,
  });
  fs.writeFileSync(optimizedFilePath, optimizedSVG.data);
  console.log(`Optimization completed: ${optimizedFilePath}`);
  return optimizedFilePath;
};

app.post('/api/optimize-svg', upload.single('file'), async (req, res) => {
  try {
      const filePath = req.file.path;
      const originalFileName = req.file.originalname;
      const extension = path.extname(originalFileName);
      const optimizedFileName = originalFileName.replace(extension, '-optimized' + extension);
      const optimizedFilePath = path.join(path.dirname(filePath), optimizedFileName);

      console.log(`Received file: ${filePath} for optimization`);
      await optimizeSVG(filePath, optimizedFilePath);
      console.log(`Sending optimized file: ${optimizedFilePath}`);
      
      res.download(optimizedFilePath, async (err) => {
          if (err) {
              console.error('Error sending file:', err);
              res.status(500).send('Error sending file');
          } else {
              await fs.promises.unlink(optimizedFilePath); // Remove the optimized file after sending
              await fs.promises.unlink(filePath); // Remove the original file after sending
          }
      });
  } catch (error) {
      console.error(`Error during optimization: ${error.message}`);
      res.status(500).json({ message: error.message });
  }
});

app.post('/api/exif-data', upload.single('image'), async (req, res) => {
  try {
      const filePath = req.file.path;
      const buffer = fs.readFileSync(filePath);
      let result;

      if (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/tiff') {
          const parser = exifParser.create(buffer);
          result = parser.parse();
      } else {
          return res.status(400).json({ message: 'Unsupported image format. Please upload a JPEG or TIFF image.' });
      }

      fs.unlinkSync(filePath); // Remove the file after processing

      // Check if EXIF data is present
      if (result.tags) {
          res.json(result);
      } else {
          res.status(400).json({ message: 'No EXIF data found. This format may not be supported.' });
      }
  } catch (error) {
      // Enhanced error handling
      if (error.message.includes('Invalid JPEG section offset') || error.message.includes('Format not recognized')) {
          res.status(400).json({ message: 'Invalid format or no EXIF data found. Please upload a valid image with EXIF data.' });
      } else {
          res.status(500).json({ message: error.message });
      }
  }
});

app.post('/api/resize-image', upload.single('image'), async (req, res) => {
  try {
      const { width, height, format, quality } = req.body;
      let transformer = sharp(req.file.path);

      // Only resize if width and height are provided
      if (width && height) {
          transformer = transformer.resize(parseInt(width), parseInt(height));
      }

      if (format) {
          transformer = transformer.toFormat(format, { quality: parseInt(quality) || 80 });
      }

      const resizedImageBuffer = await transformer.toBuffer();
      res.type(format || 'jpeg').send(resizedImageBuffer);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


app.post('/api/generate-keys', (req, res) => {
  try {
      const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
          modulusLength: 2048,
          publicKeyEncoding: {
              type: 'spki',
              format: 'pem'
          },
          privateKeyEncoding: {
              type: 'pkcs8',
              format: 'pem'
          }
      });
      console.log('Generated Keys:', { publicKey, privateKey }); // Log generated keys
      res.json({ publicKey, privateKey });
  } catch (error) {
      console.error('Error generating keys:', error.message); // Log error
      res.status(500).json({ message: error.message });
  }
});

app.post('/api/generate-token', (req, res) => {
  try {
      const length = req.body.length || 32; // Default token length is 32
      const token = crypto.randomBytes(length).toString('hex');
      res.json({ token });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.post('/api/test-xss', async (req, res) => {
  const { url } = req.body;
  try {
      const xssPayload = '<script>alert("XSS Vulnerability!");</script>';
      console.log(`Testing URL: ${url}`);  // Log the URL being tested
      const response = await axios.get(`${url}?test=${encodeURIComponent(xssPayload)}`, {
          headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
      });
      const isVulnerable = response.data.includes(xssPayload);
      console.log(`Response Data: ${response.data}`);  // Log the response data
      res.json({
          status: isVulnerable ? 'Vulnerable' : 'Not Vulnerable',
          message: isVulnerable ? 'The site is vulnerable to XSS attacks.' : 'The site is not vulnerable to XSS attacks.',
      });
  } catch (error) {
      console.error(`Error: ${error.message}`);  // Log the error
      res.status(500).json({ message: error.message });
  }
});

app.post('/api/check-backlinks', async (req, res) => {
  const { url } = req.body;
  try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const backlinks = [];
      $('a').each((i, elem) => {
          const link = $(elem).attr('href');
          if (link && link !== url) {
              backlinks.push(link);
          }
      });
      res.json({ backlinks });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.post('/api/check-uptime', async (req, res) => {
  const { url } = req.body;
  const startTime = Date.now();
  try {
      const response = await axios.get(url);
      const endTime = Date.now();
      res.json({
          status: response.status === 200 ? 'Up' : 'Down',
          responseTime: endTime - startTime,
      });
  } catch (error) {
      res.json({
          status: 'Down',
          responseTime: Date.now() - startTime,
          message: error.message,
      });
  }
});

app.post('/api/check-links', async (req, res) => {
  const { url } = req.body;
  console.log(`Received URL: ${url}`);  // Log received URL
  try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const links = $('a[href]').map((i, link) => $(link).attr('href')).get();
      const brokenLinks = [];
      console.log(`Found ${links.length} links`);  // Log number of links found

      await Promise.all(
          links.map(async (link) => {
              try {
                  console.log(`Checking link: ${link}`);  // Log link being checked
                  await axios.head(link);
              } catch (error) {
                  if (error.response && error.response.status >= 400) {
                      console.log(`Broken link found: ${link} - ${error.response.status}`);  // Log broken link
                      brokenLinks.push({ url: link, status: error.response.status });
                  }
              }
          })
      );

      res.json({ brokenLinks });
  } catch (error) {
      console.error(`Error checking links: ${error.message}`);  // Log error
      res.status(500).json({ message: error.message });
  }
});

app.post('/api/check-redirect', async (req, res) => {
  const { url } = req.body;
  console.log(`Received URL: ${url}`);  // Add this line to log the received URL
  try {
      const response = await axios.head(url, { maxRedirects: 0 });
      res.json({
          statusCode: response.status,
          finalUrl: url,
      });
  } catch (error) {
      if (error.response && error.response.status >= 300 && error.response.status < 400) {
          res.json({
              statusCode: error.response.status,
              finalUrl: error.response.headers.location,
          });
      } else {
          res.status(500).json({ message: error.message });
      }
  }
});

app.post('/cssvalidator', async (req, res) => {
  const { css } = req.body;
  if (!css) {
    return res.status(400).send({ error: 'CSS code is required' });
  }

  try {
    const result = await new Promise((resolve, reject) => {
      cssValidator({ text: css }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    res.send({ result: JSON.stringify(result) });
  } catch (error) {
    res.status(500).send({ error: 'Failed to validate CSS' });
  }
});

app.post('/htmlvalidator', async (req, res) => {
  const { html } = req.body;
  if (!html) {
    return res.status(400).send({ error: 'HTML code is required' });
  }

  try {
    const result = await htmlValidator({ data: html, format: 'text' });
    res.send({ result });
  } catch (error) {
    res.status(500).send({ error: 'Failed to validate HTML' });
  }
});

app.get('/httpstatus', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send({ error: 'URL is required' });
  }

  try {
    const response = await fetch(url);
    const result = {
      statusCode: response.status,
      statusMessage: response.statusText,
    };
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch status code' });
  }
});

app.get('/domainage', (req, res) => {
  const domain = req.query.domain;
  if (!domain) {
    return res.status(400).send({ error: 'Domain is required' });
  }

  whois.lookup(domain, (err, data) => {
    if (err) {
      return res.status(500).send({ error: 'Failed to fetch domain information' });
    }

    const registrationDateMatch = data.match(/Creation Date: (.+)/);
    if (!registrationDateMatch) {
      return res.status(500).send({ error: 'Failed to parse registration date' });
    }

    const registrationDateStr = registrationDateMatch[1];
    const registrationDate = new Date(registrationDateStr);
    const ageInYears = differenceInYears(new Date(), registrationDate);
    const age = `${ageInYears} years`;

    const result = {
      domain,
      registrationDate: registrationDate.toISOString().split('T')[0],
      age,
    };

    res.send(result);
  });
});

app.get('/whois', (req, res) => {
  const domain = req.query.domain;
  const tld = domain.split('.').pop();
  const server = whoisServers[tld];

  if (!server) {
    return res.status(400).send({ error: 'Unsupported TLD' });
  }

  whois.lookup(domain, { server }, (err, data) => {
    if (err) {
      res.status(500).send({ error: 'Whois lookup failed' });
    } else {
      res.send({ result: data });
    }
  });
});

app.get('/dnslookup', async (req, res) => {
  const domain = req.query.domain;
  const type = req.query.type || 'ANY';
  if (!domain) {
    return res.status(400).send({ error: 'Domain is required' });
  }

  try {
    let records;
    switch (type) {
      case 'A':
        records = await dns.resolve4(domain);
        break;
      case 'AAAA':
        records = await dns.resolve6(domain);
        break;
      case 'CNAME':
        records = await dns.resolveCname(domain);
        break;
      case 'MX':
        records = await dns.resolveMx(domain);
        break;
      case 'NS':
        records = await dns.resolveNs(domain);
        break;
      case 'TXT':
        records = await dns.resolveTxt(domain);
        break;
      case 'SRV':
        records = await dns.resolveSrv(domain);
        break;
      case 'PTR':
        records = await dns.resolvePtr(domain);
        break;
      case 'SOA':
        records = await dns.resolveSoa(domain);
        break;
      case 'CAA':
        records = await dns.resolveCaa(domain);
        break;
      case 'NAPTR':
        records = await dns.resolveNaptr(domain);
        break;
      case 'DNSKEY':
        records = await dns.resolveDnskey(domain);
        break;
      case 'DS':
        records = await dns.resolveDs(domain);
        break;
      case 'RRSIG':
        records = await dns.resolveRrsig(domain);
        break;
      case 'NSEC':
        records = await dns.resolveNsec(domain);
        break;
      case 'ANY':
      default:
        records = await dns.resolveAny(domain);
        break;
    }
    res.send({ records });
  } catch (err) {
    res.status(500).send({ error: 'Failed to lookup DNS records' });
  }
});

app.get('/reversedns', async (req, res) => {
  const ip = req.query.ip;
  if (!ip) {
    return res.status(400).send({ error: 'IP address is required' });
  }

  try {
    const domains = await dns.reverse(ip);
    res.send({ domains });
  } catch (err) {
    res.status(500).send({ error: 'Failed to perform reverse DNS lookup', details: err.message });
  }
});

app.get('/ipgeolocation', (req, res) => {
  const ip = req.query.ip;
  if (!ip) {
    return res.status(400).send({ error: 'IP address is required' });
  }

  const geo = geoip.lookup(ip);
  if (!geo) {
    return res.status(404).send({ error: 'No geolocation data found for this IP address' });
  }

  res.send(geo);
});

app.get('/sslcheck', (req, res) => {
  const domain = req.query.domain;
  if (!domain) {
    return res.status(400).send({ error: 'Domain is required' });
  }

  exec(`echo | openssl s_client -connect ${domain}:443 -servername ${domain} 2>/dev/null | openssl x509 -noout -issuer -dates`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send({ error: 'Failed to perform SSL check', details: error.message });
    }

    const output = stdout.trim().split('\n');
    const issuerMatch = output.find(line => line.startsWith('issuer='));
    const validFromMatch = output.find(line => line.startsWith('notBefore='));
    const validToMatch = output.find(line => line.startsWith('notAfter='));

    const essentialDetails = {
      issuer: issuerMatch ? issuerMatch.replace('issuer=', '').trim() : 'Unknown',
      validFrom: validFromMatch ? new Date(validFromMatch.replace('notBefore=', '').trim()).toISOString() : 'Unknown',
      validTo: validToMatch ? new Date(validToMatch.replace('notAfter=', '').trim()).toISOString() : 'Unknown',
      valid: validToMatch ? new Date(validToMatch.replace('notAfter=', '').trim()) > new Date() : false,
      daysRemaining: validToMatch ? Math.ceil((new Date(validToMatch.replace('notAfter=', '').trim()) - new Date()) / (1000 * 60 * 60 * 24)) : 0,
    };

    res.send(essentialDetails);
  });
});

app.get('/httpheaders', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send({ error: 'URL is required' });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const headers = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });
    res.send(headers);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch HTTP headers', details: err.message });
  }
});

app.get('/pagespeed', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send({ error: 'URL is required' });
  }

  const apiKey = 'Your_Google_Api_Key'; // Replace with your actual API key
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}`;

  try {
    console.log('Requesting PageSpeed data for URL:', url);
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Log the raw response data for debugging
    console.log('Raw API Response:', JSON.stringify(data, null, 2));

    if (!data.lighthouseResult || !data.lighthouseResult.categories) {
      return res.status(500).send({ error: 'Incomplete API response', details: data });
    }

    const lighthouseResult = data.lighthouseResult;
    const categories = lighthouseResult.categories;

    const result = {
      'Performance Score': categories.performance ? categories.performance.score * 100 : 'N/A',
      'Accessibility Score': categories.accessibility ? categories.accessibility.score * 100 : 'N/A',
      'Best Practices Score': categories['best-practices'] ? categories['best-practices'].score * 100 : 'N/A',
      'SEO Score': categories.seo ? categories.seo.score * 100 : 'N/A',
      'First Contentful Paint': lighthouseResult.audits['first-contentful-paint'] ? lighthouseResult.audits['first-contentful-paint'].displayValue : 'N/A',
      'Speed Index': lighthouseResult.audits['speed-index'] ? lighthouseResult.audits['speed-index'].displayValue : 'N/A',
      'Time to Interactive': lighthouseResult.audits['interactive'] ? lighthouseResult.audits['interactive'].displayValue : 'N/A',
      'Total Blocking Time': lighthouseResult.audits['total-blocking-time'] ? lighthouseResult.audits['total-blocking-time'].displayValue : 'N/A',
      'Largest Contentful Paint': lighthouseResult.audits['largest-contentful-paint'] ? lighthouseResult.audits['largest-contentful-paint'].displayValue : 'N/A',
    };

    res.send(result);
  } catch (err) {
    console.error('Error fetching PageSpeed data:', err.response ? err.response.data : err.message);
    res.status(500).send({ error: 'Failed to perform speed test', details: err.response ? err.response.data : err.message });
  }
});

// Schedule a job to delete files older than 24 hours every hour
schedule.scheduleJob('0 * * * *', () => {
  const uploadsDir = path.join(__dirname, 'uploads');

  fs.readdir(uploadsDir, (err, files) => {
      if (err) {
          console.error('Unable to scan directory:', err);
          return;
      }

      files.forEach((file) => {
          const filePath = path.join(uploadsDir, file);
          fs.stat(filePath, (err, stats) => {
              if (err) {
                  console.error('Unable to get file stats:', err);
                  return;
              }

              const now = Date.now();
              const fileAge = now - stats.ctimeMs; // File age in milliseconds
              const ageLimit = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

              if (fileAge > ageLimit) {
                  fs.unlink(filePath, (err) => {
                      if (err) {
                          console.error('Error deleting file:', err);
                      } else {
                          console.log(`Deleted old file: ${file}`);
                      }
                  });
              }
          });
      });
  });
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


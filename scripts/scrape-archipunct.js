const https = require('https');
const fs = require('fs');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const html = await fetchUrl('https://archipunct.com/');
  fs.writeFileSync('scripts/archipunct_home.html', html);

  const links = [...html.matchAll(/href=["'](https?:\/\/archipunct\.com[^"']*)["']/g)].map(m => m[1]);
  const imgs = [...html.matchAll(/src=["'](https?:\/\/archipunct\.com\/wp-content\/uploads\/[^"']*)["']/g)].map(m => m[1]);

  console.log('=== UNIQUE LINKS ===');
  console.log([...new Set(links)]);

  console.log('=== IMAGES (SAMPLE) ===');
  console.log([...new Set(imgs)].slice(0, 50));
}

run().catch(console.error);

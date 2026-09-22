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

function cleanHtml(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8217;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

async function scrapePages() {
  const pages = [
    'https://archipunct.com/',
    'https://archipunct.com/o-meni/',
    'https://archipunct.com/contact-us/',
    'https://archipunct.com/arhitektonsko-projektovanje/',
    'https://archipunct.com/enterijeri/',
    'https://archipunct.com/pejzazna-arhitektura/',
    'https://archipunct.com/adaptacije-i-renoviranje-novi-sad/',
    'https://archipunct.com/urbanizam/',
    'https://archipunct.com/3d-modeling/',
    'https://archipunct.com/projekti/',
    'https://archipunct.com/kompletni-projekti/'
  ];

  const results = {};

  for (const url of pages) {
    try {
      console.log('Fetching', url);
      const html = await fetchUrl(url);
      const cleaned = cleanHtml(html);
      
      // also extract images on that page
      const imgs = [...html.matchAll(/src=["'](https?:\/\/archipunct\.com\/wp-content\/uploads\/[^"']+\.(?:jpg|jpeg|png|webp))["']/gi)].map(m => m[1]);
      
      results[url] = {
        title: (html.match(/<title>(.*?)<\/title>/i) || [])[1] || '',
        text: cleaned.slice(0, 3000), // first 3000 chars of text
        images: [...new Set(imgs)]
      };
    } catch (e) {
      console.error('Error fetching', url, e.message);
    }
  }

  fs.writeFileSync('scripts/archipunct_scraped_data.json', JSON.stringify(results, null, 2));
  console.log('Scraping completed! Saved to scripts/archipunct_scraped_data.json');
}

scrapePages();

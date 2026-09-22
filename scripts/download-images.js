const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../public/images/archipunct');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const imagesToDownload = [
  'https://archipunct.com/wp-content/uploads/2015/03/Logo-header.png',
  'https://archipunct.com/wp-content/uploads/logo3.png',
  'https://archipunct.com/wp-content/uploads/LOGO.jpg',
  'https://archipunct.com/wp-content/uploads/LOGOSUN-342x280.png',
  'https://archipunct.com/wp-content/uploads/3web-1-1245x700.jpg',
  'https://archipunct.com/wp-content/uploads/3web-1.jpg',
  'https://archipunct.com/wp-content/uploads/before_adaptacija_stana_novi-_sad21.jpg',
  'https://archipunct.com/wp-content/uploads/after_adaptacija_stana_novi-_sad1.jpg',
  'https://archipunct.com/wp-content/uploads/uredjenje-kuce-1.jpg',
  'https://archipunct.com/wp-content/uploads/uredjenje-kuce-2.jpg',
  'https://archipunct.com/wp-content/uploads/uredjenje-kuce-3.jpg',
  'https://archipunct.com/wp-content/uploads/uredjenje-kuce-6.jpg',
  'https://archipunct.com/wp-content/uploads/Kupatilo_Lux2_web.jpg',
  'https://archipunct.com/wp-content/uploads/Kupatilo_Lux1_web.jpg',
  'https://archipunct.com/wp-content/uploads/kuhinja_renoviranje_3.jpg',
  'https://archipunct.com/wp-content/uploads/2-copy-before_web.jpg',
  'https://archipunct.com/wp-content/uploads/2-copy_web.jpg',
  'https://archipunct.com/wp-content/uploads/4_web-1.jpg',
  'https://archipunct.com/wp-content/uploads/2015/04/1-Gajdobra.jpg',
  'https://archipunct.com/wp-content/uploads/2015/04/perspective.jpg',
  'https://archipunct.com/wp-content/uploads/2015/02/ACCamera5.1_2.jpg',
  'https://archipunct.com/wp-content/uploads/2015/02/NOVA7-paint.jpg',
  'https://archipunct.com/wp-content/uploads/2015/02/Altobello_06.jpg',
  'https://archipunct.com/wp-content/uploads/2013/06/trg2-e1429271685905.jpg',
  'https://archipunct.com/wp-content/uploads/moderna-kuhinja-i-dnevni-boravak-arhitekta-novi-sad-beograd.jpg',
  'https://archipunct.com/wp-content/uploads/Renoviranje_Adaptacije_Stanova_Kuca_Novi_Sad.jpg',
  'https://archipunct.com/wp-content/uploads/Butik_Mister_Novi_Sad_Izvereno_Archipunct_Studio_1.jpg',
  'https://archipunct.com/wp-content/uploads/poslasticarnica_figaro_enterijer_91WEB.jpg',
  'https://archipunct.com/wp-content/uploads/1web2.jpg',
  'https://archipunct.com/wp-content/uploads/5web-1.jpg'
];

function downloadFile(url) {
  return new Promise((resolve) => {
    const filename = path.basename(url.split('?')[0]);
    const dest = path.join(targetDir, filename);

    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          const stats = fs.statSync(dest);
          if (stats.size > 0) {
            console.log(`✓ Downloaded ${filename} (${Math.round(stats.size / 1024)} KB)`);
            resolve(true);
          } else {
            fs.unlinkSync(dest);
            resolve(false);
          }
        });
      } else {
        // try without unscaled filename or fail gracefully
        // console.log(`x Failed (${res.statusCode}): ${url}`);
        resolve(false);
      }
    }).on('error', () => resolve(false));
  });
}

async function run() {
  for (const u of imagesToDownload) {
    await downloadFile(u);
  }
}

run();

// Notifies IndexNow search engines (Bing, Yandex, Seznam, Naver…) of every URL in the live sitemap.
// Google does not use IndexNow: use Search Console for Google.
// Usage: npm run indexnow  (optionally SITE_URL=https://delegis.online)
import { readdirSync } from 'node:fs';
import path from 'node:path';

const site = (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://delegis.online').replace(/\/$/, '');
const keyFile = readdirSync(path.join(process.cwd(), 'public')).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('No IndexNow key file (public/<32 hex>.txt) found.');
const key = keyFile.slice(0, -4);

const sitemap = await (await fetch(`${site}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) throw new Error('Sitemap is empty or unreachable.');

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${keyFile}`, urlList }),
});
console.log(`IndexNow: ${urlList.length} URLs submitted, HTTP ${res.status} ${res.statusText}`);
if (res.status >= 400) {
  console.error(await res.text());
  process.exit(1);
}

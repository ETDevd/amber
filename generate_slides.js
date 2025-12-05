#!/usr/bin/env node
// generate_slides.js
// Usage: node generate_slides.js <itch_url>
// Writes slides.json in the project root with parsed slide entries.

const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const DEFAULT_URL = 'https://ducky-dev.itch.io';
const outFile = path.join(__dirname, 'slides.json');
const inputUrl = process.argv[2] || DEFAULT_URL;

function absUrl(src, base) {
  try { return new URL(src, base).href; } catch (e) { return src; }
}

async function fetchAndParse(url) {
  console.log(`Fetching ${url} ...`);
  const res = await fetch(url, { headers: { 'User-Agent': 'node.js script' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // selectors used across different itch.io themes
  const selectors = ['.game-column', '.game_column', '.game_cell', '.project_cell', '.game_cell_wrapper'];
  let nodes = [];
  for (const sel of selectors) {
    const found = Array.from(doc.querySelectorAll(sel));
    if (found.length) {
      nodes = found;
      console.log(`Found ${found.length} nodes with selector: ${sel}`);
      break;
    }
  }

  if (!nodes.length) {
    // fallback to anchor links that look like game links
    nodes = Array.from(doc.querySelectorAll('a[href*="/games/"]'));
    console.log(`Fallback: found ${nodes.length} game link anchors`);
  }

  const slides = nodes.slice(0, 24).map(node => {
    const a = node.querySelector('a') || node.closest('a');
    const href = a ? a.href : url;
    const img = node.querySelector('img');
    const titleEl = node.querySelector('.title');
    const descEl = node.querySelector('.description');

    let imgsrc = img ? img.src : null;
    if (imgsrc && !/^https?:\/\//i.test(imgsrc)) imgsrc = absUrl(imgsrc, url);

    const title = titleEl ? titleEl.textContent.trim() : (a ? (a.title || a.textContent.trim()) : 'Untitled');
    const desc = descEl ? descEl.textContent.trim() : '';

    return { title, desc, img: imgsrc || null, url: href };
  }).filter(s => s && s.url);

  return slides;
}

(async () => {
  try {
    const slides = await fetchAndParse(inputUrl);
    if (!slides.length) {
      console.error('No slides found. Aborting.');
      process.exit(1);
    }

    fs.writeFileSync(outFile, JSON.stringify(slides, null, 2), 'utf8');
    console.log(`Wrote ${slides.length} slides to ${outFile}`);
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(2);
  }
})();

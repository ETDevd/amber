/**
 * Express proxy server for itch.io slideshow.
 * Fetches itch.io pages server-side to bypass CORS.
 * Exposes /api/slides?url=<itch_url> endpoint returning JSON.
 */

const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const { JSDOM } = require('jsdom');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname)));

/**
 * GET /api/slides?url=<itch_profile_url>
 * Fetches the itch.io page and returns JSON array of slides.
 */
app.get('/api/slides', async (req, res) => {
    const itchUrl = req.query.url || 'https://ducky-dev.itch.io';

    // Validate URL
    if (!itchUrl || !itchUrl.includes('itch.io')) {
        return res.status(400).json({ error: 'Invalid itch.io URL' });
    }

    try {
        console.log(`Fetching slides from: ${itchUrl}`);
        const response = await fetch(itchUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const html = await response.text();
        const dom = new JSDOM(html);
        const doc = dom.window.document;
        // itch.io html structure
        //<div class="column game_column"><div class="game_grid_widget base_widget user_game_grid"><div dir="auto" data-game_id="3963804" class="game_cell has_cover"><div style="background-color:#1e1300;" class="game_thumb"><a href="https://ducky-dev.itch.io/10-deadly-games" class="thumb_link game_link" data-action="game_grid" tabindex="-1" data-label="game:3963804:thumb"><img data-lazy_src="https://img.itch.zone/aW1nLzIzODI4NTUzLnBuZw==/315x250%23c/QUb%2FzH.png" class="lazy_loaded" height="250" width="315" src="https://img.itch.zone/aW1nLzIzODI4NTUzLnBuZw==/315x250%23c/QUb%2FzH.png"></a></div><div class="game_cell_data"><div class="game_title"><a href="https://ducky-dev.itch.io/10-deadly-games" class="title game_link" data-action="game_grid" data-label="game:3963804:title">Ten Deadly Games - Jamsepticeye</a></div><div title="Ten games based on a similar theme!" class="game_text">Ten games based on a similar theme!</div><div class="game_author"><a href="https://ducky-dev.itch.io" data-action="game_grid" data-label="user:1875170">Ducky Dev</a></div><div class="game_platform"><span aria-hidden="true" class="icon icon-windows8" title="Download for Windows"></span> </div></div></div><div dir="auto" data-game_id="2446621" class="game_cell has_cover"><div style="background-color:#3f2832;" class="game_thumb"><a href="https://ducky-dev.itch.io/exiled" class="thumb_link game_link" data-action="game_grid" tabindex="-1" data-label="game:2446621:thumb"><img data-lazy_src="https://img.itch.zone/aW1nLzE0NDk1OTIwLnBuZw==/315x250%23c/dV5rhT.png" class="lazy_loaded" height="250" width="315" src="https://img.itch.zone/aW1nLzE0NDk1OTIwLnBuZw==/315x250%23c/dV5rhT.png"></a></div><div class="game_cell_data"><div class="game_title"><a href="https://ducky-dev.itch.io/exiled" class="title game_link" data-action="game_grid" data-label="game:2446621:title">Exiled</a><div class="price_tag meta_tag" title="Pay $4.99 or more for this game"><div class="price_value">$4.99</div></div></div><div title="A compact puzzle-thriller full of monsters and mystery." class="game_text">A compact puzzle-thriller full of monsters and mystery.</div><div class="game_author"><a href="https://ducky-dev.itch.io" data-action="game_grid" data-label="user:1875170">Ducky Dev</a></div><div class="game_genre">Puzzle</div><div class="game_platform"><span aria-hidden="true" class="icon icon-windows8" title="Download for Windows"></span> <span aria-hidden="true" class="icon icon-tux" title="Download for Linux"></span> <span aria-hidden="true" class="icon icon-apple" title="Download for macOS"></span> <span aria-hidden="true" class="icon icon-android" title="Download for Android"></span> </div></div></div><div dir="auto" data-game_id="2201337" class="game_cell has_cover lazy_images"><div style="background-color:#1e1e1e;" class="game_thumb"><a href="https://ducky-dev.itch.io/kyle-is-famous-ce" class="thumb_link game_link" data-action="game_grid" tabindex="-1" data-label="game:2201337:thumb"><img data-lazy_src="https://img.itch.zone/aW1nLzEzMTM3MzAzLnBuZw==/315x250%23c/5g%2Bdnr.png" class="lazy_loaded" height="250" width="315"></a></div><div class="game_cell_data"><div class="game_title"><a href="https://ducky-dev.itch.io/kyle-is-famous-ce" class="title game_link" data-action="game_grid" data-label="game:2201337:title">Kyle is Famous: Complete Edition</a><div class="price_tag meta_tag" title="Pay $9.99 or more for this game"><div class="price_value">$9.99</div></div></div><div title="All Kyle, All Style" class="game_text">All Kyle, All Style</div><div class="game_author"><a href="https://ducky-dev.itch.io" data-action="game_grid" data-label="user:1875170">Ducky Dev</a></div><div class="game_genre">Adventure</div><div class="game_platform"><span aria-hidden="true" class="icon icon-windows8" title="Download for Windows"></span> <span aria-hidden="true" class="icon icon-tux" title="Download for Linux"></span> <span aria-hidden="true" class="icon icon-apple" title="Download for macOS"></span> </div></div></div><div dir="auto" data-game_id="505117" class="game_cell has_cover lazy_images"><div style="background-color:#ab3b3b;" class="game_thumb"><a href="https://ducky-dev.itch.io/kyle-is-famous" class="thumb_link game_link" data-action="game_grid" tabindex="-1" data-label="game:505117:thumb"><img data-lazy_src="https://img.itch.zone/aW1nLzI2Mzc1MDQucG5n/315x250%23c/uNIC0p.png" class="lazy_loaded" height="250" width="315"></a></div><div class="game_cell_data"><div class="game_title"><a href="https://ducky-dev.itch.io/kyle-is-famous" class="title game_link" data-action="game_grid" data-label="game:505117:title">Kyle is Famous</a></div><div title="Kyle prepares for his most important interview yet. Decide his path through 21 endings in this comedic adventure." class="game_text">Kyle prepares for his most important interview yet. Decide his path through 21 endings in this comedic adventure.</div><div class="game_author"><a href="https://ducky-dev.itch.io" data-action="game_grid" data-label="user:1875170">Ducky Dev</a></div><div class="game_genre">Interactive Fiction</div><div class="game_platform"><span class="web_flag">Play in browser</span><span aria-hidden="true" class="icon icon-windows8" title="Download for Windows"></span> <span aria-hidden="true" class="icon icon-tux" title="Download for Linux"></span> <span aria-hidden="true" class="icon icon-apple" title="Download for macOS"></span> <span aria-hidden="true" class="icon icon-android" title="Download for Android"></span> </div></div></div></div></div>

        // Try multiple selectors for game columns
        const selectors = ['.column game_column', '.game_column', '.game_grid_widget base_widget user_game_grid', '.game_cell', '.thumb_link game_link'];
        let nodes = [];

        for (const selector of selectors) {
            const found = Array.from(doc.querySelectorAll(selector));
            if (found.length) {
                nodes = found;
                console.log(`Found ${found.length} items with selector: ${selector}`);
                break;
            }
        }

        // Fallback: grab game links
        if (!nodes.length) {
            nodes = Array.from(doc.querySelectorAll('a[href*="/games/"]'));
            console.log(`Fallback: found ${nodes.length} game links`);
        }

        // Parse nodes into slides
        const slides = nodes.slice(0, 12).map(node => {
            const link = node.querySelector('a') || node.closest('a');
            const href = link ? link.href : itchUrl;
            const img = node.querySelector('img');
            const titleEl = node.querySelector('.title');
            const descEl = node.querySelector('.description');

            // Make relative URLs absolute
            let imgSrc = img ? img.src : null;
            if (imgSrc && !imgSrc.startsWith('http')) {
                imgSrc = new URL(imgSrc, itchUrl).href;
            }

            return {
                title: titleEl ? titleEl.textContent.trim() : (link ? link.title || link.textContent.trim() : 'Untitled'),
                desc: descEl ? descEl.textContent.trim() : '',
                img: imgSrc || null,
                url: href
            };
        }).filter(s => s && s.url);

        if (!slides.length) {
            throw new Error('No slides found on page');
        }

        res.json(slides);
    } catch (err) {
        console.error('Error fetching itch.io:', err.message);
        res.status(500).json({
            error: 'Failed to fetch slides',
            message: err.message,
            fallback: true
        });
    }
});

app.listen(PORT, () => {
    console.log(`\n🎮 Slideshow server running at http://localhost:${PORT}`);
    console.log(`📖 Open http://localhost:${PORT}/index.html in your browser\n`);
});

# 🎮 AmberPJ Itch.io Slideshow

A responsive, auto-looping slideshow that displays games from any itch.io profile or page. Features smooth transitions, keyboard controls, and a server-side proxy to bypass CORS restrictions.

## ✨ Features

- **Auto-looping slideshow** – Cycles through itch.io games every 5 seconds
- **Responsive design** – Adapts to mobile, tablet, and desktop screens
- **Smooth animations** – Fade and slide transitions between slides
- **Keyboard controls:**
  - **Arrow Left/Right** – Navigate between slides
  - **F2** – Change the itch.io profile/page URL (prompts for new URL)
- **Server-side proxy** – Handles CORS restrictions by fetching itch.io server-side
- **Fallback support** – Uses client-side fetch if server unavailable
- **Pause on hover** – Auto-advance stops when you hover over the image

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or later) and **npm**

### Installation

1. Navigate to the project folder:
   ```powershell
   cd c:\Users\etgma\Downloads\website\Amber
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Start the server:
   ```powershell
   npm start
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000/index.html
   ```

## 🎮 Usage

### Default Behavior
- The slideshow loads games from **https://ducky-dev.itch.io** by default
- Slides auto-advance every 5 seconds
- Click the bottom-right button to open the current game on itch.io

### Changing the Itch.io Profile
1. Press **F2** while viewing the slideshow
2. Enter a new itch.io URL (e.g., `https://your-name.itch.io`)
3. The slideshow reloads with games from the new profile

### Navigation
- Press **Left Arrow** to go to the previous slide
- Press **Right Arrow** to go to the next slide
- Hover over the image to pause auto-advance
- Move your mouse away to resume

## 📁 File Structure

```
Amber/
├── index.html        # Main HTML file
├── amber.css         # Styles (responsive, animations)
├── amber.js          # Client-side slideshow logic
├── server.js         # Express proxy server
├── package.json      # Node.js dependencies
├── README.md         # This file
├── icon.png          # Favicon
├── donate.png        # Donate button image
├── itemlink.png      # Item link button image
└── BG.jpg           # Fallback/background image

## 📣 GitHub Pages (Static Hosting)

This site is designed to work on GitHub Pages (which serves static files only). To make the slideshow work on GitHub Pages:

- A static `slides.json` file is used by default. The client (`amber.js`) will try to load `/slides.json` first. This avoids CORS and server requirements on GitHub Pages.
- Edit `slides.json` to point each slide to the images and itch.io URLs you want displayed.

Steps to deploy to GitHub Pages:

1. Commit and push the repository to GitHub (e.g., `main` branch).
2. In your repository settings, enable **Pages** and choose the branch (`main`) and folder (`/root`) to publish.
3. After GitHub builds the site (a few minutes), your site will be available at `https://<your-username>.github.io/<repo-name>/`.

Notes:

- If you want live scraping from itch.io, you cannot run the Express proxy on GitHub Pages. You'd need a separate server (Heroku, Vercel Serverless function, or your own VPS) that exposes `/api/slides`, then update `amber.js` to point at that API.
- For most static deployments, editing `slides.json` with the correct `img` and `url` entries is the simplest approach.
```

## 🛠️ How It Works

### Client-Side (amber.js)
- Attempts to fetch slides from the server API (`/api/slides`)
- Falls back to direct client-side fetch if the server is unavailable
- Updates slide title, description, image, and link on every transition
- Manages auto-advance, keyboard events, and hover behavior

### Server-Side (server.js)
- Express server listens on port 3000
- `/api/slides?url=<itch_url>` endpoint:
  - Fetches the itch.io page server-side (bypasses CORS)
  - Parses HTML to extract game columns (`.game-column`, etc.)
  - Returns JSON array of slides with `title`, `desc`, `img`, and `url`
- Serves static files (HTML, CSS, JS, images)

## 📱 Responsive Breakpoints

- **Desktop (1024px+):** Full-size 400×400 image with centered text
- **Tablet (768px–1023px):** 350×350 image, centered layout
- **Mobile (480px–767px):** 300×300 image, optimized padding
- **Small Mobile (<480px):** Up to 90vw width (max 280px), minimal padding

## ⚙️ Configuration

To change the default itch.io profile, edit `amber.js`:

```javascript
const DEFAULT_ITCH_URL = 'https://your-profile.itch.io';
```

To adjust the slide duration (auto-advance interval), edit:

```javascript
const AUTO_INTERVAL_MS = 5000; // 5 seconds
```

## 🐛 Troubleshooting

### "Cannot GET /api/slides"
- Make sure the server is running (`npm start`)
- Check that you're accessing `http://localhost:3000`, not `file://`

### Slides not loading from itch.io
- The itch.io page structure may have changed – contact the maintainer to update selectors
- Check the browser console for error messages
- Try a different itch.io profile URL

### Mobile layout looks off
- Ensure your browser zoom is set to 100%
- Try refreshing the page
- Check that your viewport meta tag is present in `index.html`

## 📦 Dependencies

- **express** – Web server framework
- **node-fetch** – Server-side HTTP client
- **jsdom** – DOM parser for HTML extraction

## 📄 License

MIT

## 👤 Author

**AmberPJ** – Handmade Crafts & Unique Gifts

---

**Enjoy your slideshow! 🎮✨**

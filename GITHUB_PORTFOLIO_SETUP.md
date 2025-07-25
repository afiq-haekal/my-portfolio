# 🚀 GitHub Portfolio Setup Guide

## Setup Instructions

### 1. Update GitHub Username
Buka file `src/components/GitHubPortfolio.js` dan ganti `YOUR_GITHUB_USERNAME` dengan username GitHub lu yang asli.

```javascript
// Di line ini:
<GitHubPortfolio username="YOUR_GITHUB_USERNAME" />

// Ganti jadi:
<GitHubPortfolio username="username_github_lu" />
```

### 2. Install Dependencies
**WAJIB** - Install semua dependencies yang dibutuhin:

```bash
# Masuk ke folder project dulu
cd c:\github\anomali\portofolio\my-portfolio

# Install semua dependencies
npm install

# Optional - kalau mau tambah features lain:
npm install axios  # Untuk HTTP requests yang lebih robust
npm install react-icons  # Untuk icons yang lebih keren
```

**Note**: Package.json udah include semua dependencies yang dibutuhin!

### 3. Customization Options

#### Filter Keywords
Untuk customize blockchain project detection, edit array `blockchainKeywords` di `GitHubService.js`:

```javascript
const blockchainKeywords = [
  'blockchain', 'crypto', 'web3', 'defi', 'nft', 
  // Tambah keywords yang sesuai dengan project lu
  'solana', 'ethereum', 'polygon', 'cosmos',
  'validator', 'node', 'testnet', 'mainnet',
  // Project names yang lu punya:
  'newton', 'nexus', 'miden', 'anoma', 'kuzco', 'destra'
];
```

#### Language Colors
Untuk customize warna bahasa pemrograman, edit object `languageColors` di `GitHubPortfolio.js`

#### Stats Display
Untuk customize stats yang ditampilkan, edit fungsi `getStats()` di `GitHubService.js`

### 4. Features Yang Udah Ready

✅ **Auto Fetch Repos** - Otomatis ambil semua repo dari GitHub API
✅ **Smart Filtering** - Filter by: All, Blockchain, Featured
✅ **Responsive Design** - Mobile-friendly layout
✅ **Stats Dashboard** - Total repos, stars, languages, dll
✅ **Real-time Data** - Data selalu up-to-date dari GitHub
✅ **Blockchain Detection** - Otomatis detect blockchain/crypto projects
✅ **Language Badges** - Tampilkan bahasa pemrograman dengan warna
✅ **Live Demo Links** - Kalau ada homepage, auto tampil link demo

### 5. Advanced Features (Coming Soon)

- [ ] Commit activity graphs
- [ ] Repository topics/tags filtering
- [ ] Search functionality
- [ ] Sorting options (stars, date, name, etc)
- [ ] Dark mode
- [ ] Export portfolio data

### 6. Troubleshooting

**Problem**: API Rate Limit
**Solution**: GitHub API limit 60 requests/hour tanpa auth. Kalau butuh lebih, bisa tambahin GitHub token.

**Problem**: CORS Error di development
**Solution**: Biasanya ga ada masalah, tapi kalau ada bisa pake proxy atau deploy ke production.

**Problem**: Repos ga muncul
**Solution**: 
1. Pastikan username GitHub benar
2. Pastikan repos public (private repos ga bisa diakses tanpa token)
3. Check console browser untuk error messages

### 7. How to Run

```bash
# 1. Masuk ke folder project
cd c:\github\anomali\portofolio\my-portfolio

# 2. Install dependencies (kalau belum)
npm install

# 3. Update username GitHub di src/components/GitHubPortfolio.js
# Ganti YOUR_GITHUB_USERNAME dengan username GitHub lu

# 4. Jalanin development server
npm start
```

Portfolio akan jalan di `http://localhost:3000`

**IMPORTANT**: Jangan pake `node src/App.js` - itu ga akan jalan! React butuh build process.

### 8. Manual Override (Optional)

Kalau mau tambahin repos manual atau customize description, bisa bikin file `src/data/manualRepos.js`:

```javascript
export const manualRepos = [
  {
    name: "Custom Project",
    description: "Special description for this project",
    url: "https://github.com/username/project",
    featured: true,
    category: "blockchain"
  }
];
```

Lalu integrate ke GitHubService.

## 🎯 Next Steps

1. **Update username** di GitHubPortfolio component
2. **Test** dengan `npm start`
3. **Customize** colors, keywords sesuai brand lu
4. **Deploy** ke Netlify/Vercel biar bisa diakses public

Happy coding, bro! 🔥

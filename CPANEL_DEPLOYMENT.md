# cPanel Deployment Guide for LA Marketing SPA

## 🚀 Deployment Steps

### 1. Build the Project
```bash
npm run build
```

### 2. Upload to cPanel
1. **Access cPanel File Manager**
2. **Navigate to public_html** (or your domain's root directory)
3. **Upload the entire `dist` folder contents** to public_html
4. **Upload the configuration files**:
   - `.htaccess` (for Apache servers)
   - `web.config` (for IIS servers)
   - `_redirects` (for Netlify-style redirects)

### 3. File Structure in cPanel
```
public_html/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other assets]
├── .htaccess
├── web.config
├── _redirects
└── [other static files]
```

## 🔧 Configuration Files

### .htaccess (Apache)
- **SPA routing fallback** - redirects all routes to index.html
- **HTTPS enforcement** - forces secure connections
- **www redirect** - ensures consistent domain
- **Security headers** - CSP, XSS protection, etc.
- **Compression** - gzip compression for better performance
- **Caching** - optimized cache headers for static assets

### web.config (IIS)
- **SPA routing for IIS servers**
- **Compression enabled**
- **Cache headers**
- **Security headers**

### _redirects (Netlify-style)
- **Fallback for Netlify-style hosting**
- **API route handling**
- **Static asset caching**

## ✅ Testing

### Test Direct URLs
1. Go to `https://yourdomain.com/influencers`
2. Refresh the page - should work without 404
3. Go to `https://yourdomain.com/about`
4. Refresh the page - should work without 404
5. Go to `https://yourdomain.com/contact`
6. Refresh the page - should work without 404

### Test Navigation
1. Navigate between pages using the menu
2. Use browser back/forward buttons
3. Bookmark any page and access it directly

## 🐛 Troubleshooting

### If 404 errors persist:
1. **Check .htaccess is uploaded** to public_html root
2. **Verify mod_rewrite is enabled** on your server
3. **Check file permissions** (644 for files, 755 for directories)
4. **Contact hosting provider** if mod_rewrite is disabled

### If assets don't load:
1. **Check base path** in vite.config.js is set to "./"
2. **Verify all files** are uploaded to correct locations
3. **Check browser console** for 404 errors on assets

## 📱 Mobile Testing
- Test on actual mobile devices
- Check all pages work with direct URLs
- Verify no "A problem repeatedly occurred" errors

## 🔒 Security Features
- **HTTPS enforcement** - all traffic redirected to HTTPS
- **www redirect** - consistent domain structure
- **Content Security Policy** - prevents XSS attacks
- **X-Frame-Options** - prevents clickjacking
- **X-Content-Type-Options** - prevents MIME sniffing
- **Strict Transport Security** - enforces HTTPS
- **Referrer Policy** - controls referrer information

## 🚀 Performance Features
- **Gzip compression** - reduces file sizes
- **Cache headers** - optimizes loading times
- **Asset optimization** - minified and chunked JavaScript/CSS
- **Image optimization** - proper caching for images

## 📋 Quick Commands
```bash
# Build for production
npm run build

# Run deployment helper
npm run deploy:cpanel

# Preview locally
npm run preview
```

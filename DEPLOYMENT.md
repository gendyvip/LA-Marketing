# Deployment Guide

This guide covers deploying the LA Marketing application to various hosting platforms.

## 🚀 Vercel Deployment

### Automatic Deployment
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the `vercel.json` configuration
3. The app will build using `npm run vercel-build`
4. All routes will be properly handled by the SPA configuration

### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Vercel Configuration
- **Framework**: Vite
- **Build Command**: `npm run vercel-build`
- **Output Directory**: `dist`
- **SPA Routing**: All routes redirect to `index.html`
- **Security Headers**: Included for better security
- **Caching**: Static assets cached for 1 year

## 🌐 Netlify Deployment

### Automatic Deployment
1. Connect your GitHub repository to Netlify
2. Netlify will use the `netlify.toml` configuration
3. Build command: `npm run build:prod`
4. Publish directory: `dist`

### Manual Deployment
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build:prod
netlify deploy --prod --dir=dist
```

## 📁 GitHub Pages Deployment

### Using GitHub Actions
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build:prod
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 🔧 Environment Variables

### Required for Production
- `VITE_GOOGLE_MAPS_API_KEY`: Your Google Maps API key
- `VITE_APP_URL`: Your production URL (e.g., `https://www.lamarketingae.com`)

### Setting in Vercel
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the required variables

## 📋 Pre-deployment Checklist

- [ ] Update `manifest.json` for production (use `npm run deploy:manifest`)
- [ ] Set environment variables
- [ ] Test the build locally: `npm run build:prod`
- [ ] Verify all routes work correctly
- [ ] Check that 404 page redirects properly
- [ ] Test PWA installation
- [ ] Verify SEO meta tags

## 🐛 Troubleshooting

### SPA Routing Issues
If direct navigation to routes returns 404:
1. Check that `vercel.json` or `netlify.toml` is properly configured
2. Verify the rewrite rules are in place
3. Ensure the build output includes `index.html`

### Build Issues
If build fails:
1. Check Node.js version (requires 18+)
2. Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
3. Check for TypeScript errors: `npm run lint`

### Performance Issues
If the site loads slowly:
1. Check that static assets are being cached
2. Verify image optimization is working
3. Check network tab for slow requests

## 📊 Performance Optimization

The application includes several performance optimizations:
- **Code Splitting**: React.lazy for route-based splitting
- **Image Optimization**: Lazy loading and proper sizing
- **Caching**: Static assets cached for 1 year
- **Critical CSS**: Inlined for faster first paint
- **Service Worker**: For offline functionality

## 🔒 Security

Security headers are included in the deployment configuration:
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: origin-when-cross-origin`
- `Permissions-Policy` for camera, microphone, and geolocation

#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 LA Marketing - cPanel Deployment Helper\n');

// Check if dist folder exists
if (!fs.existsSync('dist')) {
  console.error('❌ Error: dist folder not found. Please run "npm run build" first.');
  process.exit(1);
}

console.log('✅ Build folder found');
console.log('📁 Files ready for upload:\n');

// List all files in dist folder
function listFiles(dir, prefix = '') {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      console.log(`${prefix}📁 ${file}/`);
      listFiles(filePath, prefix + '  ');
    } else {
      const size = (stat.size / 1024).toFixed(2);
      console.log(`${prefix}📄 ${file} (${size} KB)`);
    }
  });
}

listFiles('dist');

console.log('\n📋 Deployment Instructions:');
console.log('1. Access your cPanel File Manager');
console.log('2. Navigate to public_html (or your domain root)');
console.log('3. Upload ALL contents from the dist/ folder');
console.log('4. Upload the configuration files:');
console.log('   - .htaccess (for Apache servers)');
console.log('   - web.config (for IIS servers)');
console.log('   - _redirects (for Netlify-style redirects)');

console.log('\n🔧 Configuration Files Location:');
console.log('📄 .htaccess → public/.htaccess');
console.log('📄 web.config → public/web.config');
console.log('📄 _redirects → public/_redirects');

console.log('\n✅ After upload, test these URLs:');
console.log('- https://yourdomain.com/');
console.log('- https://yourdomain.com/influencers');
console.log('- https://yourdomain.com/about');
console.log('- https://yourdomain.com/contact');
console.log('\n🔄 Refresh each page to ensure no 404 errors');

console.log('\n📱 Mobile Testing:');
console.log('- Test on actual mobile devices');
console.log('- Check all pages work with direct URLs');
console.log('- Verify no "A problem repeatedly occurred" errors');

console.log('\n🎉 Deployment complete! Your SPA should now work with proper routing.');
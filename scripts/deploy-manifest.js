#!/usr/bin/env node

/**
 * Script to replace manifest.json with production version for deployment
 * Usage: node scripts/deploy-manifest.js
 */

const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, '../public/manifest.production.json');
const targetFile = path.join(__dirname, '../public/manifest.json');

try {
    // Read production manifest
    const productionManifest = fs.readFileSync(sourceFile, 'utf8');

    // Write to manifest.json
    fs.writeFileSync(targetFile, productionManifest);

    console.log('✅ Production manifest deployed successfully!');
    console.log('📁 Updated: public/manifest.json');
    console.log('🌐 All URLs now use https://www.lamarketingae.com/');
} catch (error) {
    console.error('❌ Error deploying manifest:', error.message);
    process.exit(1);
}

// next.config.js
const withPWA = require('next-pwa')({
    dest: 'public', // Folder to store generated service worker and PWA files
    disable: process.env.NODE_ENV === 'development', // Disable in development mode
  });
  
  module.exports = withPWA({
    // Other Next.js config options can go here
  });
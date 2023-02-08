const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const nextConfiguration = {
};

module.exports = withPlugins([optimizedImages], nextConfiguration);

const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  'context': path.resolve(__dirname, './context'),
  'components': path.resolve(__dirname, './components'),
  'constants': path.resolve(__dirname, './constants'),
};

module.exports = config;
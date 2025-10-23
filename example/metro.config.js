const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const path = require('path');

const config = {
  resolver: {
    // Ensure a single copy of react and react-native
    disableHierarchicalLookup: true,
    unstable_enableSymlinks: true,
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../node_modules'),
    ],
  },
  watchFolders: [
    // Include the parent directory to watch for changes in the library
    path.resolve(__dirname, '..'),
  ],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

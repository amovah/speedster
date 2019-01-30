module.exports = {
  asar: false,
  files: [
    'build/**/*',
    'pacakge.json',
  ],
  linux: {
    target: 'deb',
    desktop: 'speedster.desktop',
    executableName: 'speedster',
    depends: ['arai2c'],
    category: 'Utility',
  },
};

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
    depends: ['aria2'],
    category: 'Utility',
  },
};

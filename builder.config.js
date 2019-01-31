module.exports = {
  asar: false,
  files: [
    'build/**/*',
    'pacakge.json',
  ],
  linux: {
    target: 'deb',
    executableName: 'speedster',
    depends: ['aria2'],
    category: 'Utility',
  },
};

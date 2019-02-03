let startJob;

export const start = () => {
  startJob = setTimeout(() => {
    console.log('started');
  }, 300);
};

export const stop = () => {
  clearTimeout(startJob);
};

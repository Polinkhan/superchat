const timeDifference = (time) => {
  const currentTime = new Date().getTime();
  let diff = currentTime - time;

  if ((diff /= 1000) < 60) return `${parseInt(diff)}s`;
  else if ((diff /= 60) < 60) return `${parseInt(diff)}m`;
  else if ((diff /= 60) < 24) return `${parseInt(diff)}h`;
  else return `${parseInt(diff / 24)}d`;
};

export { timeDifference };

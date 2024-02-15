export function getFormattedDate(dateString){
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
}

export function getFormattedTime(dateString){
  const date = new Date(dateString);
  return `${date.getHours()}:${date.getMinutes()}`
}

export function getDuration(startString, endString){
  const startDate = new Date(startString);
  const endDate = new Date(endString);
  const durationInSeconds = (endDate - startDate) / 1000;
  const minutes = Math.floor((durationInSeconds % (60 * 60)) / 60);
  const hours = Math.floor((durationInSeconds % (24 * 60 * 60)) / (60 * 60));
  return `${hours.toString().padStart(1, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export function getTime(timeRaw) {
  // Assuming each tick represents 100 nanoseconds
    const ticksPerSecond = 10000000;
    const seconds = timeRaw / ticksPerSecond;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
}
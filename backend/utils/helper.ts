export const convertTimeToSeconds = (timeString: string) => {
  if (timeString?.length < 3) {
    return timeString;
  } else {
    const [minutes, seconds] = timeString?.split(":").map(Number);
    return minutes * 60 + seconds;
  }
};
export const formatTime = (seconds?: number | string) => {
  if (seconds === undefined) {
    return "0:00";
  }

  const totalSeconds = parseInt(seconds.toString());
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

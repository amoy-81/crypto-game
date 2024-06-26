export function formatTime(seconds: number) {
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(secs).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

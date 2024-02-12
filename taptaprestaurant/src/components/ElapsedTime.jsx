import { useState, useEffect } from "react";

export default function ElapsedTime({ startTime }) {
  const [elapsedTime, setElapsedTime] = useState(null);
  const seconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const startTimestamp = new Date(startTime).getTime();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime(new Date().getTime() - startTimestamp);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTimestamp]);

  return (
    <span>
      {hours}:{minutes}:{seconds}
    </span>
  );
}

import { useState, useEffect } from "react";

export default function ElapsedTime({ startTime }) {
  const [elapsedTime, setElapsedTime] = useState(calculateElapsedTime());
  const startTimestamp = new Date(startTime).getTime();

  useEffect(() => {
    console.log(startTime, startTimestamp);

    const intervalId = setInterval(() => {
      setElapsedTime(calculateElapsedTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function calculateElapsedTime() {
    const currentTimestamp = new Date().getTime();
    const elapsed = currentTimestamp - startTimestamp;
    return elapsed;
  }

  const seconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  return (
    <span>
      {hours}:{minutes}:{seconds}
    </span>
  );
}

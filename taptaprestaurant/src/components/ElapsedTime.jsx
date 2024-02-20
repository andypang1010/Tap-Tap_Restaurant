import { useState, useEffect } from "react";

export default function ElapsedTime({ startTime }) {
  const [elapsedTime, setElapsedTime] = useState(null);
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTime]);

  const fillZeroes = (value) => ("0" + value).slice(-2);

  return (
    <span className="elapsed-time mono">
      {fillZeroes(hours)}:{fillZeroes(minutes)}:{fillZeroes(seconds)}
    </span>
  );
}

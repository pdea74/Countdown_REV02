import React, { useState, useEffect } from "react";
import "./styles.css";
import CountdownCircle from "./CountdownCircle";

export default function App() {
  const startDate = new Date(2026, 5, 1);
  const endDate = new Date(2026, 7, 28);

  const [timeLeft, setTimeLeft] = useState({});
  const [progress, setProgress] = useState(0);
  const [workingDays, setWorkingDays] = useState(0);

  const isHoliday = (date) => {
    const day = date.getDate();
    const month = date.getMonth();
    return day === 15 && month === 7;
  };

  const getWorkingDays = (start, end) => {
    let count = 0;
    let current = new Date(start);

    while (current <= end) {
      const day = current.getDay();
      if (day !== 0 && day !== 6 && !isHoliday(current)) {
        count++;
      }
      current.setDate(current.getDate() + 1);
    }

    return count;
  };

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();

      const totalTime = endDate - startDate;
      const elapsedTime = now - startDate;
      const remainingTime = endDate - now;

      const percent = Math.min((elapsedTime / totalTime) * 100, 100);
      setProgress(percent);

      const workDays = getWorkingDays(now, endDate);
      setWorkingDays(workDays);

      if (remainingTime <= 0) {
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
      const seconds = Math.floor((remainingTime / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(interval);
  }, []);

  if (timeLeft === null) {
    return (
      <div className="container">
        <h1 className="neon-pulse">🎉 Fine lavoro!</h1>
        <p className="motivation neon-pulse">Goditi la libertà 😎</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="neon-pulse">🚀 Countdown fine lavoro</h1>

      {/* 🔵 GRAFICO MIGLIORATO */}
      <CountdownCircle percentage={progress} />

      <div className="countdown">
        <span>
          {timeLeft.days}g {timeLeft.hours}h {timeLeft.minutes}m{" "}
          {timeLeft.seconds}s
        </span>
      </div>

      <p className="workdays">💼 {workingDays} giorni lavorativi</p>

      <p className="motivation neon-pulse">
        🔥 Ogni secondo sei più vicino alla libertà
      </p>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="progress-text neon-pulse">
        {progress.toFixed(1)}% completato
      </div>
    </div>
  );
}

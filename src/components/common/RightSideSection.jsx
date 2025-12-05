import { useEffect, useRef } from "react";
export default function RightSideSection({ isRunning, setIsRunning, seconds, setSeconds, handleReset }) { // ← Replaced individual setters with handleReset function
  const timerHandRef = useRef(null);
  // Effect: Handle timer interval - runs when isRunning changes
  useEffect(() => {
    let interval = null;
    
    if (isRunning) {
      // Start timer: increment seconds every 1000ms
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else {
      // Stop timer if not running
      clearInterval(interval);
    }
    
    // Cleanup: clear interval when component unmounts or isRunning changes
    return () => clearInterval(interval);
  }, [isRunning,  setSeconds]);
  // Effect: Rotate clock hand based on seconds - runs when seconds changes
  useEffect(() => {
    if (timerHandRef.current) {
      const degree = seconds * 6; // 360° / 60 seconds = 6° per second
      timerHandRef.current.style.transform = `translateX(-50%) rotate(${degree}deg)`;
    }
  }, [seconds]);
  // Format seconds into MM:SS display format
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60); // Get full minutes
    const secs = totalSeconds % 60; // Get remaining seconds
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  // Toggle timer between start and stop
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };
  // Reset timer to 0 and return hand to 12 o'clock position
  const handleResetClick = () => { // ← Renamed to avoid confusion, calls parent's handleReset
    handleReset(); // ← Calls parent function which now re-shuffles kanji
    
    if (timerHandRef.current) {
      timerHandRef.current.style.transform = 'translateX(-50%) rotate(0deg)';
    }
  };
  return (
    <div className="right-side-section">
      <div className="clock">
        <div className="clock-face">
          <div className="number"><span>1</span></div>
          <div className="number"><span>2</span></div>
          <div className="number"><span>3</span></div>
          <div className="number"><span>4</span></div>
          <div className="number"><span>5</span></div>
          <div className="number"><span>6</span></div>
          <div className="number"><span>7</span></div>
          <div className="number"><span>8</span></div>
          <div className="number"><span>9</span></div>
          <div className="number"><span>10</span></div>
          <div className="number"><span>11</span></div>
          <div className="number"><span>12</span></div>
        </div>
        <div className="timer-hand" ref={timerHandRef}></div>
      </div>
      <div className="time-counter">
        <p className="time-display">{formatTime(seconds)}</p>
      </div>
      <div className="action-buttons-wrapper">
        <button onClick={handleStartStop} className="timer-button start-stop-button">
          <p className="start-stop-indicator">
            {isRunning ? 'Stop' : 'Start'}
          </p>
        </button>
        
        <button onClick={handleResetClick} className="timer-button reset-button">
          Reset
        </button>
      </div>
    </div>
  );
}
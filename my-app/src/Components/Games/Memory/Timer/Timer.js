import './Timer.scss';
import { useEffect } from 'react';


const Timer = function Timer({timer, setTimer, timer_seconds, setTimerSeconds, gameOver, won }) {

  useEffect(() => {
            if (gameOver || won) {
                setTimerSeconds(0);
                setTimer(clearInterval(timer));
            } else {
              setTimer(setInterval(() => {
                setTimerSeconds(prev_time => prev_time + 1);
            }, 1000));

            }
  }, [gameOver, won]);

  return (
    <div className="timer_container_memory">
        <p className="numbers-timer_memory">
            { timer_seconds }
        </p>
    </div>
    
  );
};

export default Timer;
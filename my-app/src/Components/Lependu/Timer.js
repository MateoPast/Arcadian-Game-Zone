import '../Lependu/Timer.scss';
import { useEffect } from 'react';
//import timerHangman from '../../assets/images/timerHangman.png';

//const timerImage = [timerHangman]
const Timer = function Timer({timer, setTimer, timer_seconds, setTimerSeconds, gameOver, won }) {

  useEffect(() => {
            if (gameOver || won) {
                setTimerSeconds(false);
                setTimer(clearInterval(timer));
            } else {
              setTimer(setInterval(() => {
                setTimerSeconds(prev_time => prev_time + 1);
            }, 1000));

            }
  }, [gameOver, won]);

  return (
    
    <div className="timer_container">
      
        <p className="numbers-timer">
            <span className='couthang'> { timer_seconds }</span>
        </p>
    </div>
  
  );
};

export default Timer;
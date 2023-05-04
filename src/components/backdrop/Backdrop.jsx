import React, { useEffect, useState } from 'react';
import '../../styles/pages/backdrop.css';
import Countdown from '../countdown/Countdown';
import { initialLaunchCounter } from '../../constants/initDate';
import Fireworks from '../fireworks/Fireworks';

function Backdrop() {

    const getTime = () => (
        localStorage.getItem('startTime') ?
        JSON.parse(localStorage.getItem('startTime')) : new Date() 
    )

    const storeTime = () => {
        localStorage.getItem('startTime') ?
        JSON.parse(localStorage.getItem('startTime')) :
        localStorage.setItem('startTime', JSON.stringify(new Date()))
    };

    const [initialTime, setInitialTime] = useState(getTime())

    const initTimeLeft = () => {

        const terminalState = ((val) => val >= 0 ? val : 0)
        const countTime = new Date() - new Date(initialTime);
        const timerDuration = (
            initialLaunchCounter.Days * 1000 * 60 * 60 * 24
            + initialLaunchCounter.Hours * 1000 * 60 * 60
            + initialLaunchCounter.Minutes * 1000 * 60 
            + initialLaunchCounter.Seconds * 1000
        ) - countTime;
        return {
          days: terminalState(Math.floor((timerDuration / (1000 * 60 * 60 * 24)))),
          hours: terminalState(Math.floor((timerDuration / (1000 * 60 * 60)) % 24)),
          minutes: terminalState(Math.floor((timerDuration / 1000 / 60) % 60)),
          seconds: terminalState(Math.floor((timerDuration / 1000) % 60)),
        };
      };
    
      const [timeLeft, setTimeLeft] = useState(initTimeLeft());
      const timerHasRunOut = Object.keys(timeLeft).reduce((acc, curr) => acc + timeLeft[curr], 0) ? false : true;

      useEffect(() => {
        storeTime();
        setInitialTime(getTime());
      }, [])

      useEffect(() => {
        const timer = setTimeout(() => {
          setTimeLeft(initTimeLeft());
        }, 900);
    
        return () => clearTimeout(timer);
        
      });

  return (
    <div className="countdown">

    <div className="countdown__stars">
        {timerHasRunOut ? <h1>Grand Opening! Yay!</h1> :  <h1>we're launching soon</h1>}
    <div className="countdown__cards">
        {
            !timerHasRunOut &&
            Object.keys(timeLeft).map((key, index) => (
                <Countdown key={index} value={timeLeft[key]} duration_type={key}/>
            ))
        }
    </div>
    </div>
    <div className="countdown__mtns"></div>
        {timerHasRunOut && <Fireworks />}
</div>
  )
}

export default Backdrop

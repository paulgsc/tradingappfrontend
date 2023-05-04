import React from 'react';
import '../../styles/pages/countdown.css';

function Countdown({ value, duration_type }) {
  return (
        <div className='card'>
        <span className="number">
          <span className="topNumber" />
            {value}
        </span>
        <p>{duration_type}</p>
        </div>
  )
}

export default Countdown

import React from 'react';
import '../../styles/pages/firework.css';
import { v4 as uuidv4 } from 'uuid';

function Fireworks() {
  return (
    <>
        {
            Array(10).fill().map((_, i) => (

                <div key={uuidv4()} id={`firework${i+1}`} className="firework">
                    <div className="explosion"></div>
                    <div className="explosion"></div>
                    <div className="explosion"></div>
                    <div className="explosion"></div>
                    <div className="explosion"></div>
                    <div className="explosion"></div>
                    <div className="explosion"></div>
                    <div className="explosion"></div>
                    <div className="explosion"></div>
                    <div className="explosion"></div>
                    <div className="explosion"></div>
                    <div className="explosion"></div>
                </div>
            ))
        }
    </>
    
  )
}

export default Fireworks

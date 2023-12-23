import React, { useState, useEffect, useRef } from 'react';
import './Grid.css'

const getRandomColor = () => {
  const colors = ['red', 'green', 'blue', 'black'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const ColorBox = () => {
  const [gridColors, setGridColors] = useState(Array.from({ length: 10 }, () => Array.from({ length: 10 }, getRandomColor)));
  const [counter, setCounter] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const startInterval = () => {
    const id = setInterval(() => {
      setGridColors(prevColors =>
        prevColors.map(row =>
          row.map(() => getRandomColor())
        )
      );
    }, 1000);
    setIntervalId(id);
  };

  const stopInterval = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };



  const handleBoxClick = (rowIndex, colIndex) => {
    const clickedColor = gridColors[rowIndex][colIndex];
    if (clickedColor === 'blue') {
      setCounter(prevCounter => prevCounter + 10);
    } else if (clickedColor === 'red') {
      setCounter(prevCounter => prevCounter - 10);
    }
  };
  

  return (
    <div className='main'>
      <div>
        <p>Score: {counter}</p>
      </div>

      <div className='grid-container' >
        {gridColors.map((row, rowIndex) =>
          row.map((color, colIndex) => (
            <div className='grid-item' 
              key={`${rowIndex}-${colIndex}`}
              style={{backgroundColor: color}}
              onClick={()=> {if(intervalId !== null){handleBoxClick(rowIndex, colIndex)}; }}
            />
          ))
        )}
      </div>

      
      <div>
        <button className='start' onClick={startInterval} >Start</button>
        <button className='stop' onClick={stopInterval} >Pause</button>
        <button className='reset' onClick={()=>{setCounter(0)}} >Restart</button>
      </div>

    </div>
  );
};

export default ColorBox;

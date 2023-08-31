'use client';
import Image from 'next/image';
import { useRef, useEffect, useState, MouseEventHandler } from 'react';
import useDraw from './utils/hooks';
import { drawLine } from './utils/drawLine';

import { io } from 'socket.io-client';
const socket = io('http://localhost:3001');

export default function Home() {
  const { canvasRef, onMouseDown } = useDraw(createDrawLine);

  const [color, setcolor] = useState('');

  const pickColor: MouseEventHandler<HTMLButtonElement> = (e) => {
    const colorHex = e.currentTarget.value;
    if (!colorHex) return;
    setcolor(colorHex);
    console.log(color);
  };

  function createDrawLine({ ctx, prevPoint, currentPoint }: Draw) {
    socket.emit('draw-line', { color, prevPoint, currentPoint });
    drawLine({ prevPoint, currentPoint, color, ctx });
  }

  return (
    <div>
      <h2>Canvas App</h2>
      <div>
        <canvas
          onMouseDown={onMouseDown}
          ref={canvasRef}
          width={500}
          height={500}
          className="border-2 border-black"
        />
        <div>
          <div>
            <h2>choose color:</h2>
            <div className="flex gap-2 ">
              <button
                onClick={pickColor}
                value={'#FF0000'}
                className=" bg-red-600 w-16 h-16"
              ></button>
              <button
                onClick={pickColor}
                className=" bg-blue-500 w-16 h-16 "
                value="#0000FF"
              ></button>
              <button
                onClick={pickColor}
                className=" bg-green-500  w-16 h-16"
                value="#008000"
              ></button>
              <button
                onClick={pickColor}
                className=" bg-black w-16 h-16"
                value="#000"
              ></button>
              <button
                onClick={pickColor}
                className=" border-2  border-black w-16 h-16 "
                value="#FFF"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

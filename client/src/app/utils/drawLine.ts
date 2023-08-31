type DrawLineProps = Draw & {
    color:string
}

export  const drawLine = ({ ctx, prevPoint, currentPoint, color }: DrawLineProps)=> {
  const { x: currX, y: currY } = currentPoint;
  console.log(
    '🚀 ~ file: page.tsx:11 ~ drawLine ~ currentPoint;:',
    currentPoint
  );

//   let color = colorState;
  let size = 5;

  let startPoint = prevPoint ?? currentPoint;

  ctx.beginPath();
  ctx.lineWidth = size;
  ctx.strokeStyle = color;

  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(currX, currY);
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.beginPath();

  ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
  ctx.fill();
}

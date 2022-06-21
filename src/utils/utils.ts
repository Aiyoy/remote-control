import robot from 'robotjs';

export const drawRectangle = (width: number, height: number) => {
  const { x, y } = robot.getMousePos();
  
  robot.mouseToggle('down', 'left');
  robot.moveMouseSmooth(x - height, y);
  robot.moveMouseSmooth(x - height, y + width);
  robot.moveMouseSmooth(x, y + width);
  robot.moveMouseSmooth(x, y);
  robot.mouseToggle('up', 'left');
}

export const drawCircle = (radius: number) => {
  const { x, y } = robot.getMousePos();
  
  robot.moveMouse(x - radius, y);
  robot.mouseToggle('down', 'left');

  for (let i = 0; i <= 360; i++) {
    let newX = Math.cos(2 * Math.PI * i / 360) * radius + x;
    let newY = Math.sin(2 * Math.PI * i / 360) * radius + y;

    robot.moveMouseSmooth(newX, newY);
  }
  
  robot.mouseToggle('up', 'left');
}

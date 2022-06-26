import robot from 'robotjs';

export const drawSquare = (width: number): void => {
  const { x, y } = robot.getMousePos();
  
  robot.mouseToggle('down', 'left');
  robot.moveMouseSmooth(x - width, y);
  robot.moveMouseSmooth(x - width, y + width);
  robot.moveMouseSmooth(x, y + width);
  robot.moveMouseSmooth(x, y);
  robot.mouseToggle('up', 'left');
}

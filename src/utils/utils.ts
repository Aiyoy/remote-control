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

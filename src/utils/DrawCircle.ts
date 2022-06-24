import robot from 'robotjs';

export const drawCircle = (radius: number): void => {
  const { x, y } = robot.getMousePos();
  
  let startX = Math.cos(2 * Math.PI * 0 / 360) * radius + x;
  let startY = Math.sin(2 * Math.PI * 0 / 360) * radius + y;
  robot.moveMouse(startX, startY);
  
  robot.mouseToggle('down', 'left');

  for (let i = 1; i <= 360; i++) {
    let newX = Math.cos(2 * Math.PI * i / 360) * radius + x;
    let newY = Math.sin(2 * Math.PI * i / 360) * radius + y;

    robot.moveMouse(newX, newY);
  }
  
  robot.mouseToggle('up', 'left');
}

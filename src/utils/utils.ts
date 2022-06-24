import robot from 'robotjs';
import Jimp from 'jimp';

export const drawRectangle = (width: number, height: number): void => {
  const { x, y } = robot.getMousePos();
  
  robot.mouseToggle('down', 'left');
  robot.moveMouseSmooth(x - height, y);
  robot.moveMouseSmooth(x - height, y + width);
  robot.moveMouseSmooth(x, y + width);
  robot.moveMouseSmooth(x, y);
  robot.mouseToggle('up', 'left');
}

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

export const printScreen = async () => {
  return new Promise(async (resolve, reject): Promise<void> => {
    try {
      const { x, y } = robot.getMousePos();
      const size = 200;

      const bitmap = robot.screen.capture(x, y, size, size);

      var image = new Jimp(bitmap.width, bitmap.height);
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
        var color = bitmap.colorAt(x, y);
        var red = parseInt(color[0] + color[1], 16);
        var green = parseInt(color[2] + color[3], 16);
        var blue = parseInt(color[4] + color[5], 16);

        image.bitmap.data[idx + 0] = Number(red);
        image.bitmap.data[idx + 1] = Number(green);
        image.bitmap.data[idx + 2] = Number(blue);
        image.bitmap.data[idx + 3] = 255;
      });
      image.resize(200, 200);

      const base64 = await image.getBase64Async(Jimp.MIME_PNG);

      resolve(base64.split(',')[1]);
    } catch (e) {
        console.error(e);
        reject(e);
    }
  });
}

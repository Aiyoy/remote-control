import robot from 'robotjs';
import Jimp from 'jimp';

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

import Jimp from 'jimp';
import {httpServer} from './src/http_server/index';
import robot from 'robotjs';
import { WebSocketServer, createWebSocketStream } from 'ws';
import { create } from 'ts-node';

import { drawRectangle } from './src/utils/utils';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', ws => {
  console.log('Connection accepted!');

  const stream = createWebSocketStream(ws, { encoding: 'utf8' });
  stream.on('data', (data) => {
    const [command, param1, param2, ...params] = data.split(' ');

    const { x, y } = robot.getMousePos();

    if (command === 'mouse_up') {
      robot.moveMouse(x, y - +param1);
    } else   if (command === 'mouse_down') {
      robot.moveMouse(x, y + +param1);
    } else   if (command === 'mouse_left') {
      robot.moveMouse(x - +param1, y);
    } else   if (command === 'mouse_right') {
      robot.moveMouse(x + +param1, y);
    } else   if (command === 'mouse_position') {
      console.log(`Mouse position: x - ${x}, y - ${y}`);
      ws.send(`mouse_position ${x},${y}`);
    } else   if (command === 'draw_circle') {
      console.log('draw_circle');
    } else   if (command === 'draw_rectangle') {
      drawRectangle(+param2, +param1);
    } else   if (command === 'draw_square') {
      drawRectangle(+param1, +param1);
    } else   if (command === 'prnt_scrn') {
      console.log('prnt_scrn');
    } else {
      console.log('else', command);
    }
  })
})

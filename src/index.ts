import Jimp from 'jimp';
import {httpServer} from './http_server/index';
import robot from 'robotjs';
import { WebSocketServer, createWebSocketStream } from 'ws';
import { create } from 'ts-node';

import { drawRectangle } from './utils/DrawRectangle';
import { drawCircle } from './utils/DrawCircle';
import { printScreen } from './utils/PrintScreen';
import { drawSquare } from './utils/DrawSquare';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', ws => {
  console.log('Connection accepted!');

  const stream = createWebSocketStream(ws, { encoding: 'utf8' });
  stream.on('data', async (data) => {
    const [command, param1, param2, ...params] = data.split(' ');

    const { x, y } = robot.getMousePos();

    if (command === 'mouse_up') {
      robot.moveMouse(x, y - +param1);
      ws.send(`${command}\0`);
    } else   if (command === 'mouse_down') {
      ws.send(`${command}\0`);
      robot.moveMouse(x, y + +param1);
    } else   if (command === 'mouse_left') {
      ws.send(`${command}\0`);
      robot.moveMouse(x - +param1, y);
    } else   if (command === 'mouse_right') {
      ws.send(`${command}\0`);
      robot.moveMouse(x + +param1, y);
    } else   if (command === 'mouse_position') {
      ws.send(`mouse_position ${x},${y}\0`);
    } else   if (command === 'draw_circle') {
      ws.send(`${command}\0`);
      drawCircle(+param1);
    } else   if (command === 'draw_rectangle') {
      ws.send(`${command}\0`);
      drawRectangle(+param2, +param1);
    } else   if (command === 'draw_square') {
      ws.send(`${command}\0`);
      drawSquare(+param1);
    } else   if (command === 'prnt_scrn') {
      const image = await printScreen();
      ws.send(`prnt_scrn ${image}\0`);
    }
  })
})

process.on('SIGINT', () => {
  console.log('Websocket close!');
  wss.close();
  process.exit(0);
});

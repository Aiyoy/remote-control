"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./http_server/index");
const robotjs_1 = __importDefault(require("robotjs"));
const ws_1 = require("ws");
const DrawRectangle_1 = require("./utils/DrawRectangle");
const DrawCircle_1 = require("./utils/DrawCircle");
const PrintScreen_1 = require("./utils/PrintScreen");
const DrawSquare_1 = require("./utils/DrawSquare");
const HTTP_PORT = 3000;
console.log(`Start static http server on the ${HTTP_PORT} port!`);
index_1.httpServer.listen(HTTP_PORT);
const wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on('connection', ws => {
    console.log('Connection accepted!');
    const stream = (0, ws_1.createWebSocketStream)(ws, { encoding: 'utf8' });
    stream.on('data', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const [command, param1, param2, ...params] = data.split(' ');
        const { x, y } = robotjs_1.default.getMousePos();
        if (command === 'mouse_up') {
            robotjs_1.default.moveMouse(x, y - +param1);
        }
        else if (command === 'mouse_down') {
            robotjs_1.default.moveMouse(x, y + +param1);
        }
        else if (command === 'mouse_left') {
            robotjs_1.default.moveMouse(x - +param1, y);
        }
        else if (command === 'mouse_right') {
            robotjs_1.default.moveMouse(x + +param1, y);
        }
        else if (command === 'mouse_position') {
            ws.send(`mouse_position ${x},${y}`);
        }
        else if (command === 'draw_circle') {
            (0, DrawCircle_1.drawCircle)(+param1);
        }
        else if (command === 'draw_rectangle') {
            (0, DrawRectangle_1.drawRectangle)(+param2, +param1);
        }
        else if (command === 'draw_square') {
            (0, DrawSquare_1.drawSquare)(+param1);
        }
        else if (command === 'prnt_scrn') {
            const image = yield (0, PrintScreen_1.printScreen)();
            ws.send(`prnt_scrn ${image}`);
        }
    }));
});
//# sourceMappingURL=index.js.map
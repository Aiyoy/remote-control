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
exports.printScreen = exports.drawCircle = exports.drawRectangle = void 0;
const robotjs_1 = __importDefault(require("robotjs"));
const jimp_1 = __importDefault(require("jimp"));
const drawRectangle = (width, height) => {
    const { x, y } = robotjs_1.default.getMousePos();
    robotjs_1.default.mouseToggle('down', 'left');
    robotjs_1.default.moveMouseSmooth(x - height, y);
    robotjs_1.default.moveMouseSmooth(x - height, y + width);
    robotjs_1.default.moveMouseSmooth(x, y + width);
    robotjs_1.default.moveMouseSmooth(x, y);
    robotjs_1.default.mouseToggle('up', 'left');
};
exports.drawRectangle = drawRectangle;
const drawCircle = (radius) => {
    const { x, y } = robotjs_1.default.getMousePos();
    let startX = Math.cos(2 * Math.PI * 0 / 360) * radius + x;
    let startY = Math.sin(2 * Math.PI * 0 / 360) * radius + y;
    robotjs_1.default.moveMouse(startX, startY);
    robotjs_1.default.mouseToggle('down', 'left');
    for (let i = 1; i <= 360; i++) {
        let newX = Math.cos(2 * Math.PI * i / 360) * radius + x;
        let newY = Math.sin(2 * Math.PI * i / 360) * radius + y;
        robotjs_1.default.moveMouse(newX, newY);
    }
    robotjs_1.default.mouseToggle('up', 'left');
};
exports.drawCircle = drawCircle;
const printScreen = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { x, y } = robotjs_1.default.getMousePos();
            const size = 200;
            const bitmap = robotjs_1.default.screen.capture(x, y, size, size);
            var image = new jimp_1.default(bitmap.width, bitmap.height);
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
            const base64 = yield image.getBase64Async(jimp_1.default.MIME_PNG);
            resolve(base64.split(',')[1]);
        }
        catch (e) {
            console.error(e);
            reject(e);
        }
    }));
});
exports.printScreen = printScreen;
//# sourceMappingURL=utils.js.map
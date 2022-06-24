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
exports.printScreen = void 0;
const robotjs_1 = __importDefault(require("robotjs"));
const jimp_1 = __importDefault(require("jimp"));
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
//# sourceMappingURL=PrintScreen.js.map
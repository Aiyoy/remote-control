"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawRectangle = void 0;
const robotjs_1 = __importDefault(require("robotjs"));
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
//# sourceMappingURL=DrawRectangle.js.map
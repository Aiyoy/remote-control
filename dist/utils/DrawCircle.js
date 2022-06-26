"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawCircle = void 0;
const robotjs_1 = __importDefault(require("robotjs"));
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
//# sourceMappingURL=DrawCircle.js.map
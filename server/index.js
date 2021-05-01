"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const WebSocket = __importStar(require("ws"));
const http_1 = require("http");
const promises_1 = require("fs/promises");
const rootPath = path_1.resolve(__dirname, '..');
process.chdir(rootPath);
const app = express_1.default();
const httpServer = http_1.createServer(app);
const wss = new WebSocket.Server({ server: httpServer });
const widgetsFile = path_1.resolve(rootPath, 'widget.json');
wss.on('connection', async (ws) => {
    ws.on('message', async (message) => {
        if (message.toString() !== "request")
            await promises_1.writeFile(widgetsFile, message.toString());
        const content = await promises_1.readFile(widgetsFile, 'utf8');
        for (const client of wss.clients)
            client.send(content);
        console.log("Content was send to clients.");
    });
});
app.get('/', (_req, _res) => {
    console.log("Here!");
});
app.use(express_1.default.static(path_1.resolve(rootPath, 'public')));
httpServer.listen(8000, () => console.log('Port 8000'));
//# sourceMappingURL=index.js.map
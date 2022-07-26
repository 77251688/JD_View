import { WebSocketServer } from "ws";
import { wsport } from "../setting";
export const wss = () => {
    return new WebSocketServer({ port: wsport });
};





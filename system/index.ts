import { wss } from "../ws";
import { System } from "../utils";
import { time } from "../setting";
const WS = wss();
const sys = () => {
    let boolean = true;
    let T: string | number | NodeJS.Timer | undefined;
    WS.on("connection", (ws: any) => {
        console.log("connectioned!");
        if (boolean) {
            boolean = false;
            T = setInterval(async () => {
                const mem = System.m();
                const cpu = await System.c();
                const sys = { cpu: cpu, mem: mem };
                ws.send(JSON.stringify(sys));
            }, time);
        }
        ws.on("close", () => {
            clearInterval(T);
            boolean = true;
            console.log("closed");
        });
    });
};
export default sys;
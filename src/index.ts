import * as path from "path";
import * as express from "express";
import * as bodyParser from "body-parser";
import { port } from "../setting";
import { router } from "../router";
import { start } from "../cron";
import sys from "../system";
const app = express();
app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public', "index.html"));
});
app.listen(port, () => {
    console.log(`running at ${port} port`);
});
start();
sys();

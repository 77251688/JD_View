import * as path from "path";
import { readFileSync } from "fs";
import * as express from "express";
import { getdata, getenv, delenv, enable, disabled, Adduser, Editlenv } from "../file";
export const router = express.Router();

router.get("/", (req, res) => {
    const html = readFileSync(path.join(__dirname, "../public/index.html"));
    res.end(html);
});

router.get("/getdata", (req, res) => {
    const userdata = getdata.get();
    res.send(userdata);
});

router.get("/getday", (req, res) => {
    const daydata = getdata.getday();
    res.send(daydata);
});

router.post("/getuser", (req, res) => {
    const param = JSON.parse(JSON.stringify(req.body));
    console.log(param);
    console.log(Array.isArray(param));

    const res_ = getdata.user(param);
    if (res_ === 400)
        return res.send({ code: 400, message: "param is not an array!" });
    res.send(res_);
});

router.get("/userItem", (req, res) => {
    const userItem = getdata.userItem;
    res.send(userItem);
});

router.post("/userday", (req, res) => {
    const param = JSON.parse(JSON.stringify(req.body));
    const res_ = getdata.userday(param);
    if (res_ === 400)
        return res.send({ code: 400, message: "param is not an array!" });
    res.send(res_);
});

router.get("/api/user", (req, res) => {
    res.send(getenv.env());
});

router.delete("/user", (req, res) => {
    const param = JSON.parse(JSON.stringify(req.body));
    const res_ = delenv.del(param);
    if (res_ === 400) {
        res.send({ code: 400, message: "param is not an array!" });
        return;
    }
    res.send(res_);
});

router.post("/user", (req, res) => {
    const param = JSON.parse(JSON.stringify(req.body));
    const res_ = Adduser.Add(param);
    if (res_ === 400) {
        res.send({ code: 400, message: "param is not an array!" });
        return;
    }
    res.send(res_);
});

router.put("/user/enable", (req, res) => {
    const param = JSON.parse(JSON.stringify(req.body));
    const res_ = enable.en(param);
    if (res_ === 400) {
        res.send({ code: 400, message: "param is not an array!" });
        return;
    }
    res.send(res_);
});

router.put("/user/disabled", (req, res) => {
    const param = JSON.parse(JSON.stringify(req.body));
    const res_ = disabled.d(param);
    if (res_ === 400) {
        res.send({ code: 400, message: "param is not an array!" });
        return;
    }
    res.send(res_);
});

router.put("/user", (req, res) => {
    const param = JSON.parse(JSON.stringify(req.body));
    const res_ = Editlenv.edit(param);
    if (res_ === 400) {
        res.send({ code: 400, message: "param is not an array!" });
        return;
    }
    res.send(res_);
});
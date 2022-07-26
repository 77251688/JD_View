import * as path from "path";
import fetch from "node-fetch";
import { readdirSync, mkdirSync } from "fs";
import { getenv, disabled } from "../../file";
import { check } from "../checkCookie";
import { Init, Timestamp, ReturnFile, Write } from "../../utils";

interface eType {
    id: number
    name: string
    val: string
}
interface IntrType {
    time: string
    Allbeans: number
    income: number
}

export class Inquire {
    public static async inquire() {
        try {
            const beanurl = `https://api.m.jd.com/client.action?functionId=personinfoBusiness&clientVersion=10.0.8&client=android&uuid=e579e5683157084a&st=1658505276610&sign=3f5cdfdd13f20bbd5116d87d295bcbe4&sv=100&body=%7B%22callCJH%22:%221%22,%22callNPS%22:%221%22,%22closeJX%22:%220%22,%22locationArea%22:%220_0_0_0%22,%22menuStaticSource%22:%220%22,%22menuTimeStamp%22:%221624274226499%22,%22refreshEnable%22:%221%22%7D`;
            const env = getenv.env();
            const cookieArr = env.filter((e: eType) => e.name === "JD_COOKIE");
            cookieArr.forEach(async e => {
                const username = await check.c(e.val);
                if (!username) {
                    disabled.d([{ id: e.id }]);
                }
                else {
                    const data_ = await fetch(beanurl, {
                        method: "POST",
                        headers: {
                            cookie: e.val
                        },
                        // body: JSON.stringify({ "pageNo": 1, "pageSize": 20 })
                    });
                    const data = await data_.json();
                    // const beans = data.others.jingBeanBalance.jingBeanCount;
                    const beans = data.floors[3].data.encStr.jindou.numContent;
                    const month = Timestamp.month();
                    const day = Timestamp.day();
                    const files = readdirSync(path.join(__dirname, "../../db/data"));
                    if (!files.includes(username))
                        mkdirSync(path.join(__dirname, "../../db/data", `${username}`));
                    const monthdir = readdirSync(path.join(__dirname, "../../db/data", `${username}`));
                    if (!monthdir.includes(month)) {
                        mkdirSync(path.join(__dirname, "../../db/data", `${username}`, month));
                    }
                    const daydir = readdirSync(path.join(__dirname, "../../db/data", `${username}`, month));
                    if (!daydir.includes(day))
                        mkdirSync(path.join(__dirname, "../../db/data", `${username}`, `${month}`, `${day}`));
                    const datadir = readdirSync(path.join(__dirname, "../../db/data", `${username}`, `${month}`, `${day}`));
                    if (!datadir.includes("data.json"))
                        Init.init(path.join(__dirname, "../../db/data", `${username}`, `${month}`, `${day}`, "data.json"));
                    const time = Timestamp.hour();
                    const min = Timestamp.m();
                    const userdata = ReturnFile.file(username);
                    console.log(userdata);
                    const length = userdata.data.length;
                    let income;
                    if (length) {
                        income = beans - userdata.data[length - 1].Allbeans;
                    }
                    else {
                        const yesterday = ReturnFile.yesterday(username);
                        if (yesterday)
                            income = yesterday.dayAllincome - beans;
                        else
                            income = 0;
                    }
                    const initdata = { time: time, min: min, Allbeans: beans, income: income };
                    let Allincome = 0;
                    userdata.data.forEach(e => {
                        Allincome += e.income;
                    });
                    userdata.dayAllincome = Allincome;
                    userdata.data.push(initdata);
                    Write.file(username, userdata);
                }
            });

        }
        catch (e) {
            console.log(e);
        }
    }
}
Inquire.inquire();
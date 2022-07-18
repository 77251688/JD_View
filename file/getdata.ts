import * as path from "path";
import { readdirSync } from "fs";
import { ReturnFile, Timestamp } from "../utils";
export class getdata {
    public static get() {
        try {
            const userlist = readdirSync(path.join(__dirname, "../db/data"));
            const userdata: { user: string; data: { min: null; income: null; }[]; }[] = [];
            userlist.forEach(e => {
                const { data } = ReturnFile.file(e);
                const init = {
                    user: e,
                    data: [],
                };
                data.forEach(e => {
                    const d = { min: null, income: null };
                    d.min = e.min;
                    d.income = e.income;
                    init.data.push(d);
                });
                userdata.push(init);
            });
            return userdata;
        }
        catch (err) {
            console.log(err);
            return "no data";
        }
    }
    public static getday() {
        const m = Timestamp.month();
        const userlist = readdirSync(path.join(__dirname, "../db/data"));
        const userday: any[] = [];
        userlist.forEach(k => {
            const daydata = { user: k, day: [], income: [] };
            const daylist = readdirSync(path.join(__dirname, "../db/data", k, m));
            daylist.forEach((e, index: number) => {
                const dayAllincome = ReturnFile.dayfile(k, daylist[index]);
                daydata.day.push(e);
                daydata.income.push(dayAllincome);
            });
            userday.push(daydata);
        });
        return userday;
    }
    public static get userItem(): any[] {
        const useritem = readdirSync(path.join(__dirname, "../db/data"));
        return useritem;
    }
    public static user(username: string) {
        try {
            if (!Array.isArray(username)) {
                return 400;
            }
            const username_ = username[0];
            const userdata: { user: string; data: { min: null; income: null; }[]; }[] = [];
            const { data } = ReturnFile.file(username_);
            const init = {
                user: username,
                data: [],
            };
            data.forEach(e => {
                const d = { min: null, income: null };
                d.min = e.min;
                d.income = e.income;
                init.data.push(d);
            });
            userdata.push(init);
            return userdata;
        }
        catch (err) {
            console.log(err);
            return "no data";
        }
    }
    public static userday(username: string) {
        try {
            if (!Array.isArray(username)) {
                return 400;
            }
            const username_ = username[0];
            const m = Timestamp.month();
            const userday: any[] = [];
            const daydata = { user: username_, day: [], income: [] };
            const daylist = readdirSync(path.join(__dirname, "../db/data", username_, m));
            daylist.forEach((e, index: number) => {
                const dayAllincome = ReturnFile.dayfile(username_, daylist[index]);
                daydata.day.push(e);
                daydata.income.push(dayAllincome);
            });
            userday.push(daydata);
            return userday;
        }
        catch (err) {
            console.log(err);
            return err;
        }
    }
}
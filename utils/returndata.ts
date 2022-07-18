import * as path from "path";
import { readFileSync } from "fs";
import { Timestamp } from "./timestamp";
export class ReturnFile {
    /**
     * @param username
     * @return data
     */
    public static file(username: string): { data: any[], dayAllincome: any } {
        const month = Timestamp.month();
        const day = Timestamp.day();
        const res_ = readFileSync(path.join(__dirname, "../db/data", `${username}`, `${month}`, `${day}`, "data.json"), "utf-8");
        const res = JSON.parse(res_);
        return res;
    }
    /**
     * @param username 
     * @param day 
     * @return dayAllincome
     */
    public static dayfile(username: string, day: string): number {
        const month = Timestamp.month();
        const res_ = readFileSync(path.join(__dirname, "../db/data", `${username}`, `${month}`, `${day}`, "data.json"), "utf-8");
        const { dayAllincome } = JSON.parse(res_);
        return dayAllincome;
    }
    /**
     * @param username string
     * @return yesterdaydata
     */
    public static yesterday(username: string): { data: any[], dayAllincome: any } | boolean {
        const month = Timestamp.month();
        const day = Timestamp.yesterday();
        const dir = path.join(__dirname, "../db/data", `${username}`, `${month}`);
        if (!dir.includes(day))
            return false;
        const res_ = readFileSync(path.join(__dirname, "../db/data", `${username}`, `${month}`, `${day}`, "data.json"), "utf-8");
        const res = JSON.parse(res_);
        return res;
    }
}


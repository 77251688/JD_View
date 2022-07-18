import * as path from "path";
import { writeFileSync } from "fs";
import { Timestamp } from "./timestamp";
export class Write {
    /**
     * @param username string
     * @param data object
     * @return data
     */
    public static file(username: string, data_: object) {
        const month = Timestamp.month();
        const day = Timestamp.day();
        const data = JSON.stringify(data_, null, "\t");
        writeFileSync(path.join(__dirname, "../db/data", `${username}`, `${month}`, `${day}`, "data.json"), data);
    }
}





import { readFileSync, writeFileSync } from "fs";
import * as path from "path";

export class write {
    /**
     * 
     * @param param env
     * @returns 200
     */
    static writeFlie(param: []) {
        const db_ = readFileSync(path.join(__dirname, "../db/env.json"), "utf-8");
        const db = JSON.parse(db_);
        db.env = param;
        writeFileSync(path.join(__dirname, "../db/env.json"), JSON.stringify(db, null, "\t"));
        return 200;
    }
}
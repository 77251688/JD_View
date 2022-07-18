import { readFileSync } from "fs";
import * as path from "path";
export class getenv {
    static env(): [] {
        const res = readFileSync(path.join(__dirname, "../db/env.json"), "utf-8");
        const { env } = JSON.parse(res);
        return env;
    }
}
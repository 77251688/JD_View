import { writeFileSync } from "fs";
export class Init {
    /**
     * 
     * @param path :string path.join(__dirname,"../db/data",`${res}`,`${month}`,`${day}`)
     * @returns void
     */
    public static init(path: string) {
        const init = JSON.stringify({ data: [], dayAllincome: null }, null, "\t");
        writeFileSync(path, init);
    }
}


import { getenv } from "./getenv";
import { write } from "./writeEnv";

interface e {
    id: number,
    name: string,
    val: string,
    isdisabled: boolean
}
export class Editlenv {
    static edit(param: []) {
        if (!Array.isArray(param)) {
            return 400;
        }
        const env = getenv.env();
        const { id, name, val, remark } = param[0];
        if (name)
            env[id - 1].name = name;
        if (val)
            env[id - 1].val = val;
        if (remark)
            env[id - 1].remark = remark;
        write.writeFlie(env);
        return env;
    }
}
import { getenv } from "./getenv";
import { write } from "./writeEnv";
export class Adduser {
    /**
     * @param Array
     * @retuen newEnv
     */
    static Add(param: []) {
        if (!Array.isArray(param)) {
            return 400;
        }
        const env = getenv.env();
        const id = env.length + 1;
        const { name, val, remark } = param[0];
        const obj = { id: id, name: name, val: val, remark: remark, isdisabled: false };
        env.push(obj);
        write.writeFlie(env);
        return env;
    }
}
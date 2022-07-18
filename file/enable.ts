import { getenv } from "./getenv";
import { write } from "./writeEnv";

export class enable {
    static en(param: []) {
        if (!Array.isArray(param)) {
            return 400;
        }
        const env = getenv.env();
        const { id } = param[0];
        env[id - 1].isdisabled = false;
        write.writeFlie(env);
        return env;
    }
}
import { getenv } from "./getenv";
import { write } from "./writeEnv";

export class disabled {
    static d(param: [{ id: number }]) {
        if (!Array.isArray(param)) {
            return 400;
        }
        const env = getenv.env();
        const { id } = param[0];
        env[id - 1].isdisabled = true;
        write.writeFlie(env);
        return env;
    }
}
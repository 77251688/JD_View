import { getenv } from "./getenv";
import { write } from "./writeEnv";

interface e {
    id: number,
    name: string,
    val: string,
    isdisabled: boolean
}
export class delenv {
    static del(param: []) {
        if (!Array.isArray(param)) {
            return 400;
        }
        const env = getenv.env();
        const { id } = param[0];
        env.splice(id - 1, 1);
        env.map((e, index: number) => {
            env[index].id = index + 1;
        });
        write.writeFlie(env);
        return env;
    }
}

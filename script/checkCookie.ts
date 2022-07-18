import fetch from "node-fetch";
import { getenv, disabled } from "../file";
export class check {
    static async c(cookie: string) {
        try {
            const data_ = await fetch("https://api.m.jd.com/?functionId=newUserInfo&clientVersion=10.0.8&client=android&uuid=e579e5683157084a&st=1655630067165&sign=c3373428247c433d47a56e92d5eff794&sv=102&body={%22flag%22%3A%22nickname%22%2C%22fromSource%22%3A1%2C%22sourceLevel%22%3A1}", {
                method: "POST",
                headers: {
                    cookie: cookie
                }
            });
            const data = await data_.json();
            const arr = Object.keys(data);
            if (arr.length === 0) return 0;
            if (!data.userInfoSns.petName)
                return false;
            return data.userInfoSns.petName;
        }
        catch (err) {
            console.log(err);
        }
    }
}
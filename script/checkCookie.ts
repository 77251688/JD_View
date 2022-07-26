import fetch from "node-fetch";
export class check {
    static async c(cookie: string) {
        try {
            const data_ = await fetch("https://api.m.jd.com/client.action?functionId=personinfoBusiness&clientVersion=10.0.8&client=android&uuid=e579e5683157084a&st=1658505276610&sign=3f5cdfdd13f20bbd5116d87d295bcbe4&sv=100&body=%7B%22callCJH%22:%221%22,%22callNPS%22:%221%22,%22closeJX%22:%220%22,%22locationArea%22:%220_0_0_0%22,%22menuStaticSource%22:%220%22,%22menuTimeStamp%22:%221624274226499%22,%22refreshEnable%22:%221%22%7D", {
                method: "POST",
                headers: {
                    cookie: cookie
                }
            });
            const data = await data_.json();
            // const arr = Object.keys(data);
            const r = data.floors[1].data.userInfoSns.title;
            if (r === undefined) return 0;
            // if (!data.userInfoSns.petName)
            //     return false;
            return data.floors[1].data.userInfoSns.title;
        }
        catch (err) {
            console.log(err);
        }
    }
}
import { CronJob } from "cron";
import { Inquire } from "../script/query";
import { crontime } from "../setting";
const cronjob = new CronJob(crontime, function () {
    Inquire.inquire();
}, null, false, 'Asia/Chongqing');
export function start() {
    cronjob.start();
    console.log("定时任务已启动");
}
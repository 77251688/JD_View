import * as os from 'os';
import * as osUtils from "os-utils";
class systen {
    /** cpu */
    static cpu() {
        const cpus = os.cpus();
        /** arch */
        const arch = os.arch();
        /** core */
        const core = cpus.length;
        /** model */
        const cpumodel = cpus[0].model;
        return { arch, core, cpumodel };
    }

    /** memory */
    static memory() {
        /** All mem */
        const memory_ = os.totalmem();
        const memory__ = memory_ / 1024 / 1024 / 1024;
        const memory = slice_(memory__);
        /** Free mem */
        const freemem_ = os.freemem();
        const _freemem = freemem_ / 1024 / 1024 / 1024;
        const freemem__ = _freemem > 1 ? _freemem : _freemem * 1024;
        const freemem = slice_(freemem__);
        /** Uesd mem */
        const usedmem_ = (memory_ - freemem_) / 1024 / 1024 / 1024;
        const usedmem__ = usedmem_ > 1 ? usedmem_ : usedmem_ * 1024;
        const usedmem = slice_(usedmem__);
        /** percent */
        const usepercent__ = usedmem__ / memory__ * 100;
        const usepercent = slice_(usepercent__);
        return { memory, freemem, usedmem, usepercent };
    }

    /** OS */
    static OStype() {
        const sys = os.type();
        switch (sys) {
            case `Windows_NT`:
                return `Windows`;
            case `Linux`:
                return `Linux`;
            case `Darwin`:
                return `Mac`;
        }
    }
}

const slice_ = (e: number) => {
    const str = e.toString();
    const index_ = str.indexOf(".") + 3;
    const result = str.slice(0, index_);
    return result;
};

export class System {
    public static c() {
        return new Promise(res => {
            osUtils.cpuUsage((v: number) => {
                res(Math.trunc(v * 100));
            });
        });
    }
    public static m() {
        const { arch, core, cpumodel } = systen.cpu();
        const { memory, usedmem, usepercent } = systen.memory();
        const OStype = systen.OStype();
        const usedmemory = parseInt(usedmem) < parseInt(memory) ? usedmem + "G" : usedmem + "G";
        const msg_ = [];
        msg_.push(`cpu架构: ${arch}\n`);
        msg_.push(`操作系统: ${OStype}\n`);
        msg_.push(`cpu: ${cpumodel} ${core}核\n`);
        msg_.push(`内存: ${usedmemory}/${memory}G ${usepercent}%`);
        return { All: memory, used: usedmemory, percent: usepercent };
    }
}
/**
 * @method month
 * @method day
 * @method hour
 * @method yesterday
 */
export class Timestamp {
    /**
     * 
     * @returns Y+M 2022-7 
     */
    public static month() {
        const date = new Date();
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        return Y + M;
    }
    /**
     * 
     * @returns M+D 7-13
     */
    public static day(): string {
        const date = new Date();
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        return M + D;
    }
    /**
     * 
     * @returns H+M+S 21:28:00
     */
    public static hour(): string {
        const date = new Date();
        const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        const s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return h + m + s;
    }
    /**
     * 
     * @returns H+M 13:33
     */
    public static m(): string {
        const date = new Date();
        const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        return h + m;
    }
    public static yesterday() {
        const date = new Date();
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = (date.getDate() < 10 ? '0' + (date.getDate() - 1) : date.getDate() - 1);
        return M + D;
    }
}
/**
 * Created by 79078_000 on 2016/10/30.
 */

export class RYStorage {

    static clear(): void {
        window.localStorage.clear();
    }

    static getItem(key: string): string|any {
        return window.localStorage.getItem(key);
    }

    static key(index: number): string|any {
        return window.localStorage.key(index);
    }

    static removeItem(key: string): void {
        window.localStorage.removeItem(key);
    }

    static setItem(key: string, data: string): void {
        window.localStorage.setItem(key, data);
    }
}

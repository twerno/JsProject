"use strict";

namespace Collection {

    export interface IStringMap<T> { [key: string]: T }
    export interface INumberMap<T> { [key: number]: T }


    export class StringMap<T> {

        private _map: IStringMap<T> = {};

        put(key: string, val: T): void {
            this._map[key] = val;
        }

        get(key: string): T {
            return this._map[key] || null;
        }

        has(key: string): boolean {
            return this._map.hasOwnProperty(key);
        }

        delete(key: string): void {
            delete this._map[key];
        }

        clear(): void {
            this._map = {};
        }
    }


    export class NumberMap<T> {

        private _map: INumberMap<T> = {};

        put(key: number, val: T): void {
            this._map[key] = val;
        }

        get(key: number): T {
            return this._map[key] || null;
        }

        has(key: number): boolean {
            return this._map.hasOwnProperty(key);
        }

        delete(key: number): void {
            delete this._map[key];
        }

        clear(): void {
            this._map = {};
        }
    }



    export function removeFrom(array: Object[], element: Object): void {
        array.splice(array.indexOf(element));
    }
}
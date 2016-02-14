"use strict";

namespace jsLogic {

	/**
	 * randomInt
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	 *
	 */
    export function randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    /**
      * randomizeArray
      * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
      *
      */
    export function randomizeArray(source: Object[]): void {
        let j: number;
        let tmp: Object;

        for (let i = source.length - 1; i > 0; i--) {
            j = randomInt(0, i);
            tmp = source[i];
            source[i] = source[j];
            source[j] = tmp;
        }
    }


    //    export function test_RandomizeArray(source: number[], n: number): Object[][] {
    //        let result: number[][] = [];
    //        let tmp: number[] = [];
    //
    //
    //        for (let i = 0; i < n; i++) {
    //            randomizeArray(source);
    //
    //            for (let j = 0; j < source.length; j++) {
    //                tmp = (result[source[j]] || []);
    //                tmp[j] = (tmp[j] || 0) + 1;
    //                result[source[j]] = tmp;
    //            }
    //        }
    //
    //        return result;
    //    }
}

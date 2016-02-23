"use strict";

namespace MathUtils {

	/**
	 * randomInt; min (included) and max (included)
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

}

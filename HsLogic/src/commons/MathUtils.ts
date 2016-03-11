"use strict";

namespace MathUtils {

	/**
	 * randomNumber; min (included) and max (included)
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	 *
	 */
    export function randomNumber(min: number, max: number): number {
        return Math.random() * (max - min + 1) + min;
    }

	/**
	 * randomInt; min (included) and max (included)
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	 *
	 */
    export function randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
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

    export interface IElementWithWeight<T> {
        element: T,
        weight: number
    }

    export interface ISelectAtRandomProperties {
        amount: number,
        withRepetitions: boolean
    }

    export function selectAtRandom<T>(sourceSet: T[], props: ISelectAtRandomProperties): T[] {
        let
            tmpSet: T[] = sourceSet.slice(),
            result: T[] = [],
            random: number,
            limit: number = Math.min(props.amount || 0, sourceSet.length);

        for (let i = 0; i < limit; i++) {
            random = randomInt(0, tmpSet.length - 1);

            result.push(sourceSet[random]);
            !props.withRepetitions && Collection.removeFrom(tmpSet, i);
        }

        return result;
    }

    export function selectAtRandomWithWeights<T>(sourceSet: IElementWithWeight<T>[], props: ISelectAtRandomProperties): T[] {
        let
            tmpSet: ITmpElementWithWeights<T>[] = processOptions<T>(sourceSet),
            maxValue: number = (tmpSet && tmpSet.length > 0 ? tmpSet[tmpSet.length - 1].maxValue : 0),
            result: T[] = [],
            random: number,
            option: ITmpElementWithWeights<T>,
            limit: number = Math.min(props.amount || 0, sourceSet.length);

        for (let i = 0; i < limit; i++) {
            random = randomNumber(0, maxValue);

            for (let j = 0; j < tmpSet.length; j++) {
                option = tmpSet[j];
                if (option.minValue <= random && (random < option.maxValue || random === maxValue)) {
                    result.push(option.element);
                    !props.withRepetitions && Collection.removeFrom(tmpSet, j);
                    break;
                }
            }
        }

        return result;
    }

    interface ITmpElementWithWeights<T> {
        element: T,
        minValue: number,
        maxValue: number
    }

    function processOptions<T>(sourceSet: IElementWithWeight<T>[]): ITmpElementWithWeights<T>[] {
        let result: ITmpElementWithWeights<T>[] = [],
            value: number = 0,
            option: IElementWithWeight<T>;

        for (let i = 0; i < sourceSet.length; i++) {
            option = sourceSet[i];
            result.push(
                {
                    element: option.element,
                    minValue: value,
                    maxValue: value + option.weight
                });
            value += option.weight
        }

        return result;
    }

}

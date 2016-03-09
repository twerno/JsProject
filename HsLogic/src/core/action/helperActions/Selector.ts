"use strict";

namespace jsLogic {

    export interface SelectorParam<O> {
        options: O[],
        amount: number,
        removeSelectedFromOptions: boolean
    }

    /**
     * Selector 
     *
     */
    export class RandomSelector<T extends IExtContext, O> extends IAction<T> {


        resolve(_this_: RandomSelector<T, O>, context: T): PromiseOfActions<T> {
            return new Promise<IAction<T>[]>(
                (resolve, reject): void => {

                    let limit: number = Math.min(_this_.selectorParam.options.length, _this_.selectorParam.amount);

                    for (let i = 0; i < limit; i++) {
                        _this_.resultSet.push(_this_._selectElementAtRandom());
                    }

                    resolve(null);
                });
        }


        private _selectElementAtRandom(): O {
            let result: O = null;
            let options: O[] = this.selectorParam.options;

            if (options.length != 0) {
                let idx: number = MathUtils.randomInt(0, options.length - 1);
                result = options[idx];
                this.selectorParam.removeSelectedFromOptions && options.splice(idx);
            }

            return result;
        }


        constructor(source: IAction<T>, public selectorParam: SelectorParam<O>, public resultSet: O[]) {
            super(source);
        };
    }
}
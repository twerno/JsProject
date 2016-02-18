///<reference path="../HsAction.ts"/>

"use strict";

namespace HSLogic {
	
    /**
     * Fatigue
     *
 	 */
    export class Fatigue extends HsAction {

        resolve(_this_: Fatigue, param: HsActionParam): PromiseOfActions {
            return new Promise<HsAction[]>(
                (resolve, reject): void => {

                    let counters: number = (++_this_.target.counters[FatigueCounter.type].value);
                    let dealDamageAction: DamageWrapper = new DamageWrapper(
                        {
                            source: _this_,
                            target: new TargetPlayer(_this_.target),
                            amount: counters
                        });

                    resolve([dealDamageAction]);
                });
        }

        constructor(source: jsLogic.IAction<HsActionParam>, public target: Player) {
            super(source);
        };
    }
}
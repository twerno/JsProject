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
                    let dealDamageAction: Damage = new Damage(
                        {
                            source: null,
                            target: new TargetPlayer(_this_.target),
                            sourceAction: _this_,
                            amount: counters,
                            type: HEALTH_MOD_TYPE.DIRECT,
                            sourceType: SOURCE_TYPE.FATIGUE
                        });

                    resolve([dealDamageAction]);
                });
        }

        constructor(source: jsLogic.IAction<HsActionParam>, public target: Player) {
            super(source);
        };
    }
}
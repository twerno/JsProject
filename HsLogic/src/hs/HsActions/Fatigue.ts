///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HSLogic {

    /**
     * Fatigue
     *
 	 */
    export class Fatigue extends HsAction {

        resolve(_this_: Fatigue, gameCtx: HsGameCtx): PromiseOfActions {
            return new Promise<HsAction[]>(
                (resolve, reject): void => {

                    let counters: number = (++_this_.target.counters[FatigueCounter.type].value);
                    let damageParam: DamageParam = {
                        source: null,
                        target: new TargetPlayer(_this_.target),
                        sourceAction: _this_,
                        amount: counters,
                        type: HEALTH_MOD_TYPE.DIRECT,
                        sourceType: SOURCE_TYPE.FATIGUE,
                        cancelDamage: false
                    };

                    resolve([gameCtx.actionFactory.damage(damageParam)]);
                });
        }

        constructor(source: jsLogic.IAction<HsGameCtx>, public target: Player) {
            super(source);
        };
    }
}
///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HSLogic {


    /**
     * Fatigue
     *
 	 */
    export class Fatigue<P extends PlayerParam> extends HsAction<P> {

        resolve(_this_: Fatigue<P>, gameCtx: HsGameCtx): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                (resolve, reject): void => {

                    let counters: number = (++_this_.param.player.counters[FatigueCounter.type].value);
                    let damageParam: DamageParam = {
                        source: null,
                        target: new TargetPlayer(_this_.param.player),
                        sourceAction: _this_,
                        amount: counters,
                        type: HEALTH_MOD_TYPE.DIRECT,
                        sourceType: SOURCE_TYPE.FATIGUE,
                        cancelDamage: false
                    };

                    resolve([gameCtx.actionFactory.damage(damageParam)]);
                });
        }
    }
}
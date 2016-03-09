///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HSLogic {

    export interface FatigueParam extends HsActionParam {
        target: Player
    }

    /**
     * Fatigue
     *
 	 */
    export class Fatigue<P extends FatigueParam> extends HsAction<P> {

        resolve(_this_: Fatigue<P>, gameCtx: HsGameCtx): PromiseOfActions {
            return new Promise<HsAction<P>[]>(
                (resolve, reject): void => {

                    let counters: number = (++_this_.param.target.counters[FatigueCounter.type].value);
                    let damageParam: DamageParam = {
                        source: null,
                        target: new TargetPlayer(_this_.param.target),
                        sourceAction: _this_,
                        amount: counters,
                        type: HEALTH_MOD_TYPE.DIRECT,
                        sourceType: SOURCE_TYPE.FATIGUE,
                        cancelDamage: false
                    };

                    resolve([gameCtx.actionFactory.damage(damageParam)]);
                });
        }

        //constructor(source: jsLogic.IAction<HsGameCtx>, public target: Player) {
        //    super(source);
        //};
    }
}
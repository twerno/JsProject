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
                    let param: P = _this_.param,
                        counters: number = (++param.player.counters[FatigueCounter.type].value),
                        damageParam: DamageParam = {
                            source: param.source,
                            sourceType: SOURCE_TYPE.FATIGUE,
                            damageType: DAMAGE_TYPE.DIRECT,
                            baseDamage: counters,
                            target: param.player,
                            cancelDamage: false
                        };

                    resolve([gameCtx.actionFactory.damage.damage(damageParam)]);
                });
        }
    }
}
///<reference path="../../core/HsAction.ts"/>

"use strict";

namespace HSLogic {


    /**
     * Fatigue
     *
 	 */
    export class Fatigue<P extends TargetPlayerParam> extends HsAction<P> {

        resolve( _this_: Fatigue<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = _this_.param;

                    resolve( [
                        gameCtx.actionFactory.damage.damage( {
                            damageType: DAMAGE_TYPE.FATIGUE,
                            source: param.source,
                            target: param.player,
                            baseDamage: ++param.player.counters[FatigueCounter.type].value
                        })
                    ] );
                }
            );
        }
    }
}
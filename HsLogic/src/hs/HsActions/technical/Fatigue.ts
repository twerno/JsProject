/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {


    /**
     * Fatigue
     *
 	 */
    export class Fatigue<P extends TargetPlayerParam> extends Action<P> {

        resolve( self: Fatigue<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param;

                    resolve( [
                        //gameCtx.actionFactory.damage.damage( {
                        //    damageType: Def.DAMAGE_TYPE.FATIGUE,
                        //    source: param.source,
                        //    target: param.player,
                        //    baseDamage: ++param.player.counters[FatigueCounter.type].value
                        //})
                    ] );
                }
            );
        }
    }
}
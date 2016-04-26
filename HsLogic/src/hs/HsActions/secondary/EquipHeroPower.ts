/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {


    export interface EquipHeroPowerParam extends IActionParam {
        targetPlayer: Player,
        heroPower: HeroPower
    }


    export class EquipHeroPower<P extends EquipHeroPowerParam> extends Action<P> {

        resolve( self: EquipHeroPower<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param;

                    param.targetPlayer.heroPower = param.heroPower;

                    resolve( jsAction.NO_CONSEQUENCES );
                }
            );
        }
    }

}
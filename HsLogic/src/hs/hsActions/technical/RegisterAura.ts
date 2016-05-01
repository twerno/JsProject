/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {


    export interface RegisterAuraParam extends IActionParam {
        auras: Aura[],
        //rebuildImmediately: boolean
    }


    export class RegisterAura<P extends RegisterAuraParam> extends Action<P> {

        resolve( self: RegisterAura<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param;

                    for ( let aura of param.auras )
                        gameCtx.gameBoard.auras.push( aura );

                    resolve( jsAction.NO_CONSEQUENCES );
                }
            );
        }
    }

}
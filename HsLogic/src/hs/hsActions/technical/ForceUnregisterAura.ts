/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {

    export class ForceUnregisterAura<P extends RegisterAuraParam> extends Action<P> {

        resolve( self: RegisterAura<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let actions: ActionType[] = [],
                        param: P = self.param;

                    for ( let aura of param.auras ) {
                        Collection.removeFrom( gameCtx.gameBoard.auras, aura );
                        actions = actions.concat( removeAura( aura, gameCtx ) );
                    }

                    resolve( actions );
                }
            );
        }
    }

}
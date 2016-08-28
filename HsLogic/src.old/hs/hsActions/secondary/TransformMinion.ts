/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {

    export interface TransformMinionParam extends IActionParam {
        target: Minion,
        transformInto: Minion,
        doDispathSummonEvent?: boolean
    }

    export class TransformMinion<P extends TransformMinionParam> extends Action<P> {

        resolve( self: TransformMinion<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];

                    gameCtx.gameBoard.zonesOf( param.target.owner )
                        .battlefield
                        .replace( param.target, param.transformInto );

                    if ( param.doDispathSummonEvent )
                        gameCtx.eventMgr.save( new event.Summon( {
                            source: param.source,
                            card: param.transformInto,
                            position: 0
                        }) );

                    resolve( actions );
                }
            );
        }
    }

}
/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {


    export interface DrawCardsParam extends IActionParam {
        targetPlayer: Player,
        amount: number,
        drawnCards?: Card[]
    }


    export class DrawCards<P extends DrawCardsParam> extends Action<P> {

        resolve( self: DrawCards<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];

                    for ( let i = 0; i < param.amount; i++ ) {
                        let drawParam: DrawParam = { source: param.source, targetPlayer: param.targetPlayer };

                        actions.push( gameCtx.actionFactory.drawCard( param ) );
                        actions.push( gameCtx.techActionFactory.inlineAction(
                            ( resolve, reject ) => {
                                if ( drawParam.drawnCard )
                                    param.drawnCards.push( drawParam.drawnCard );
                                resolve( jsAction.NO_CONSEQUENCES );
                            }
                        ) );
                    }

                    resolve( actions );
                }
            );
        }
    }


}
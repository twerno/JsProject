/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {


    export interface RemoveTagParam extends IActionParam {
        targets: ( Card | Player )[],
        tag: Tag
    }


    export class RemoveTag<P extends RemoveTagParam> extends Action<P> {

        resolve( self: RemoveTag<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param;

                    for ( let target of param.targets )
                        target.tags.remove( param.tag );

                    resolve( jsAction.NO_CONSEQUENCES );
                }
            );
        }
    }

}
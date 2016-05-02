/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {


    export interface AddTagParam extends IActionParam {
        targets: ( Card | Player )[],
        tag: Tag
    }


    export class AddTag<P extends AddTagParam> extends Action<P> {

        resolve( self: AddTag<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param;

                    for ( let target of param.targets )
                        target.tags.add( param.tag );

                    resolve( jsAction.NO_CONSEQUENCES );
                }
            );
        }
    }

}
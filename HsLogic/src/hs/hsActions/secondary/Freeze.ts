/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {

    export class Freeze<P extends TargetCharactersParam> extends Action<P> {

        resolve( self: Freeze<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];

                    actions.push( gameCtx.techActionFactory.addTag( {
                        source: param.source,
                        tag: new Def.Freeze_Tag( param.source ),
                        targets: acquireTargets<Character>( param.targets, param.source, gameCtx )
                    }) );

                    resolve( actions );
                }
            );
        }
    }

}
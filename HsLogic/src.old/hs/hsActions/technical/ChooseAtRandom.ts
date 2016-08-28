/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {


    export interface ChooseAtRandomParam<T extends Entity> extends IActionParam {
        sourceSet: T[],
        resultSet: T[],
        options: MathUtils.ISelectAtRandomProperties
    }


    /**
     * MakeChoiceAtRandom
     *
 	 */
    export class ChooseAtRandom<T extends Entity, P extends ChooseAtRandomParam<T>> extends Action<P> {

        resolve( self: ChooseAtRandom<T, P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param;

                    param.resultSet.splice( 0 );
                    param.resultSet.push.apply( param.resultSet, MathUtils.selectAtRandom<T>( param.sourceSet, param.options ) );

                    resolve( jsAction.NO_CONSEQUENCES );
                });
        }
    }
}
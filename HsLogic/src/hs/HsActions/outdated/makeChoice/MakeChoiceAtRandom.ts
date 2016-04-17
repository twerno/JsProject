/// <reference path="../../../core/action.ts" />
"use strict";

namespace HsLogic {

    export interface IChooseActionParamSets<T extends Entity> {
        source: T[],
        result: T[]
    }

    export interface MakeAChoiceAtRandomParam<T extends Entity> extends IActionParam {
        sets: IChooseActionParamSets<T>,
        props: MathUtils.ISelectAtRandomProperties
    }


    /**
     * MakeChoiceAtRandom
     *
 	 */
    export class MakeChoiceAtRandom<T extends Entity, P extends MakeAChoiceAtRandomParam<T>> extends Action<P> {
        resolve( self: MakeChoiceAtRandom<T, P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param;

                    param.sets.result.concat( MathUtils.selectAtRandom<T>( param.sets.source, param.props ) );

                    resolve( jsAction.NO_CONSEQUENCES );
                });
        }
    }
}
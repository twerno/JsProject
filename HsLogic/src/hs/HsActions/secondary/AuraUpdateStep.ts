/// <reference path="../../core/action.ts" />
/// <reference path="../../core/ActionEvent.ts" />
"use strict";

namespace HsLogic {


    export interface IAuraUpdateParam extends IActionParam {
        auraType: Def.AURA_TYPE,
    }

    /**
     * AuraUpdateStep
     *
 	 */
    export class AuraUpdateStep<P extends IAuraUpdateParam> extends Action<P> {

        resolve( self: AuraUpdateStep<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    resolve( null );
                });
        }
    }
}

namespace HsLogic.event {

    export class AuraUpdateEvent<P extends IAuraUpdateParam> extends ActionEvent<P> { }

}
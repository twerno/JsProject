"use strict";

namespace HsLogic {

    export enum AURA_UPDATE_MODE {
        ATTACK_HEALTH,
        OTHER
    }

    export interface IAuraUpdateParam extends IActionParam {
        auraUpdateMode: AURA_UPDATE_MODE,
    }

    /**
     * AuraUpdateStep
     *
 	 */
    export class AuraUpdateStep<P extends IAuraUpdateParam> extends Action<P> {

        resolve( self: AuraUpdateStep<P>, context: HsGameCtx ): PromiseOfActions {
            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    resolve( null );
                });
        }
    }
}
"use strict";

namespace HsLogic {

    export enum AURA_UPDATE_MODE {
        ATTACK_HEALTH,
        EVERYTHING
    }

    export interface IAuraUpdateParam extends IActionParam {
        mode: AURA_UPDATE_MODE,
    }

    /**
     * AuraUpdateStep
     *
 	 */
    export class AuraUpdateStep<P extends IAuraUpdateParam> extends Action<P> {

        resolve( self: AuraUpdateStep<P>, context: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    resolve( null );
                });
        }
    }
}
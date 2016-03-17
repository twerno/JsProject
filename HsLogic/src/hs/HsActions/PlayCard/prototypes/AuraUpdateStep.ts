"use strict";

namespace HsLogic {


    /**
     *  http://hearthstone.gamepedia.com/Advanced_rulebook#Death_Phases_and_consequences_of_Death
     *  Rule 4c
     */
    export enum AURA_UPDATE_MODE {
        ATTACK_HEALTH,
        OTHER /* Baron Rivendare, Auchenai Soulpriest, Brann Bronzebeard, Mal'Ganis's Immune effect, Prophet Velen. */
    }

    export interface IAuraUpdateParam extends IHsActionParam {
        mode: AURA_UPDATE_MODE,
    }

    /**
     * AuraUpdateStep
     *
 	 */
    export class AuraUpdateStep<P extends IAuraUpdateParam> extends HsAction<P> {

        resolve( _this_: AuraUpdateStep<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    resolve( null );
                });
        }
    }
}
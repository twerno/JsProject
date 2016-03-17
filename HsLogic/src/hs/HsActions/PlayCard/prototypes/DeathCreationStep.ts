"use strict";

namespace HsLogic {

    /**
     * DeathCreationStep
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Death_Phases_and_consequences_of_Death
     *
     * 1. Aura Update (Health/Attack)
     * 2. Looks for all mortally wounded (0 or less Health)/pending destroy (hit with a destroy effect) and remove them from play
     * 3. Aura Update (Other)
 	 */
    export class DeathCreationStep<P extends IActionParam> extends Action<P> {

        resolve( self: DeathCreationStep<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: jsLogic.IAction<HsGameCtx>[] = [];

                    // 1. aura Update (Health/Attack) Step
                    actions.push( new AuraUpdateStep( {
                        source: param.source,
                        mode: AURA_UPDATE_MODE.ATTACK_HEALTH
                    }) );

                    // 2. Death Creation Step 
                    //@TODO
                    //                    actions.push(new DeathCreationStep({
                    //                        source: param.source
                    //                    }));

                    // 3. aura Update (Other) Step
                    actions.push( new AuraUpdateStep( {
                        source: param.source,
                        mode: AURA_UPDATE_MODE.EVERYTHING
                    }) );

                    resolve( null );
                });
        }
    }
}
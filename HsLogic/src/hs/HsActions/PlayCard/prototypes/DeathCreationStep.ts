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

        resolve( self: DeathCreationStep<P>, context: HsGameCtx ): PromiseOfActions {

            //resolvable( context: HsGameCtx ): boolean {
            //    return context.eventMgr.has(event.) .summon.length !== 0;
            //}

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];

                    // 1. aura Update (Health/Attack) Step
                    actions.push( new AuraUpdateStep( {
                        source: param.source,
                        auraUpdateMode: AURA_UPDATE_MODE.ATTACK_HEALTH
                    }) );

                    // 2. Death Creation Step 
                    //@TODO
                    //                    actions.push(new DeathCreationStep({
                    //                        source: param.source
                    //                    }));

                    // 3. aura Update (Other) Step
                    actions.push( new AuraUpdateStep( {
                        source: param.source,
                        auraUpdateMode: AURA_UPDATE_MODE.OTHER
                    }) );

                    actions.push( new InlineAction(( resolve, reject ): void => {
                        resolve( true ? new DeathCreationStep( param ) : jsLogic.NO_CONSEQUENCES );
                    }) );

                    resolve( null );
                });
        }
    }
}
/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {


	/**
	 * SummonMinion
	 *
	 *  http://hearthstone.gamepedia.com/Advanced_rulebook#Playing.2Fsummoning_a_minion
	 *  1. Pre-summon reaction bug
	 *  2. Minion enters battlefield
	 *  3. Create Summoning event
	 *  4. After summon phase event
	 */
    export class SummonMinion<P extends SummonMinionParam> extends Action<P> {

        resolve( self: SummonMinion<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];;

                    // pre summon reaction bug
                    // http://hearthstone.gamepedia.com/Advanced_rulebook#Cobalt_Guardian.2FMurloc_Tidecaller_Pre-Summon_Reaction_Bug
                    actions.push( new event.PreSummonReactionBugEvent( param ).dispatch( gameCtx ) );

                    // register auras, DO NOT REFRESH THEM YET
                    actions.push( gameCtx.techActionFactory.registerAura( {
                        source: param.source, auras: param.card.auras
                    }) );

                    // 2. enters the battlefied
                    actions.push( new InlineAction(( resolve, reject ): void => {
                        gameCtx.gameBoard.zonesOf( param.card.owner ).battlefield.addEntity( param.card, param.position );
                        resolve( jsAction.NO_CONSEQUENCES );
                    }) );

                    // 3. create SummonEvent 
                    gameCtx.eventMgr.save( new event.Summon( param ) );

                    actions.push( new DispatchEvent( new event.AfterSummon( param ) ) );

                    resolve( jsAction.NO_CONSEQUENCES );
                }
            );
        }
    }

}
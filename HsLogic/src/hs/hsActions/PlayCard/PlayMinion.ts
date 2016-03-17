///<reference path="../../core/HsAction.ts"/>
///<reference path="../../../core/action/abstractActions/CancelableAction.ts"/>

"use strict";

namespace HsLogic {

    export class SummonEvent extends HsActionEvent<PlayCardParam> {
        static get type(): string { return SummonEvent.name }
    }

    export class AfterPlayPhase extends HsActionEvent<PlayCardParam> {
        static get type(): string { return AfterPlayPhase.name }
    }

    export class AfterSummonPhase extends HsActionEvent<PlayCardParam> {
        static get type(): string { return AfterSummonPhase.name }
    }

    /**
     * PlayMinion
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Playing.2Fsummoning_a_minion
     *
     * Phases:
     *   1. pay & remove from hand - outside action: PlayCard
     *   2. enters the battlefied 
     *   3. create SummonEvent 
     *   4. onPlayPhase            - OnPlayPhaseEvent
     *   5. Battlecry Phase        - 
     *   6. After Play Phase       - 
     *   7. After Summon Phase     - 
     *   8. win/loss check         - outside action: PlayCard?
 	 */
    export class PlayMinion<P extends PlayMinionParam> extends HsAction<P> {

        resolve( _this_: PlayMinion<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(

                ( resolve, reject ): void => {
                    let param: P = _this_.param,
                        actions: jsLogic.IAction<HsGameCtx>[] = [];

                    //@TODO interrupt following phases if then minion dies (battlecry still goes)

                    // 2. enters the battlefied  
                    //@TODO - positiong
                    gameCtx.zonesOf( param.card.owner ).battlefield.addEntity( param.card );


                    // 3. create SummonEvent 
                    gameCtx.pendingEvents.summon.push( new SummonEvent( param ) );


                    // 4. onPlayPhase
                    actions.push( gameCtx.actionFactory.dispatch( new OnPlayPhaseEvent( param ) ) );
                    actions.push( new SummonResolutionStep( { source: param.source }) );
                    actions.push( new DeathCreationStep( { source: param.source }) );


                    // 5. Battlecry Phase
                    actions.push( new Battlecry( param ) );
                    actions.push( new SummonResolutionStep( { source: param.source }) );
                    actions.push( new DeathCreationStep( { source: param.source }) );

                    // the Death Creation Step and Summon Resolution Step are skipped

                    // 6. After Play Phase
                    actions.push( gameCtx.actionFactory.dispatch( new OnPlayPhaseEvent( param ) ) );

                    // 7. After Summon Phase
                    actions.push( gameCtx.actionFactory.dispatch( new AfterSummonPhase( param ) ) );

                    resolve( actions );
                }

            ); // return new Promise
        } // resolve(_this_: PlayMinion

    } // export class PlayMinion
}
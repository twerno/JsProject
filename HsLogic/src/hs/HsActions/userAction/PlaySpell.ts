///<reference path="../../core/HsAction.ts"/>
///<reference path="../../../core/action/abstractActions/CancelableAction.ts"/>

"use strict";

namespace HsLogic {


    export class OnSpellPlaying<P extends PlayCardParam> extends HsActionEvent<P> {
        static get type(): string { return OnSpellPlaying.name }
    }

    export class OnSpellPlayed<P extends PlayCardParam> extends HsActionEvent<P> {
        static get type(): string { return OnSpellPlayed.name }
    }

    export class OnSpellTargetingPhase extends HsActionEvent<PlayCardParam> {
        static get type(): string { return OnSpellTargetingPhase.name }
    }

    /**
     * PlaySpell
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Playing_a_spell
     *
     * Phases:
     *    onBeforePlaySpell - automatic event, before resolve is executed
     *    onTargetingPhase
     *    spellTextPhase
     *    onAfterPlaySpell  - automatic event, after resolve is executed
     *    win/loss check    - inside outer wrapper?
 	 */
    export class PlaySpell<P extends PlayCardParam> extends jsLogic.CancelableAction<HsGameCtx, P> {

        cancelAction( eventParam: P ): boolean { return eventParam.cancelAction.value }
        cancelOnAfterEvent( eventParam: P ): boolean { return eventParam.cancelAction.value }

        onBeforeEventBuilder( param: P ): HsActionEvent<P> { return new OnSpellPlaying( param ) }
        onAfterEventBuilder( param: P ): HsActionEvent<P> { return new OnSpellPlayed( param ) }


        resolve( _this_: PlaySpell<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(

                ( resolve, reject ): void => {
                    let spell: Spell = <Spell>_this_.param.card;

                    let actions: jsLogic.IAction<HsGameCtx>[] = [
                        gameCtx.actionFactory.dispatch<HsGameCtx, PlayCardParam>( new OnSpellTargetingPhase( _this_.param ) )
                    ];

                    //for (let i = 0; i < spell.spellActions.length; i++)
                    //    actions.push(spell.spellActions[i].build(_this_.param, gameCtx));

                    resolve( actions );
                }
            );
        }
    }
}
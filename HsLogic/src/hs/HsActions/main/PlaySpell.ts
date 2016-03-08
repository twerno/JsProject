///<reference path="../../core/HsAction.ts"/>
///<reference path="../../core/HsActionEvent.ts"/> 
///<reference path="../../../core/action/abstractActions/CancelableAction.ts"/>

"use strict";

namespace HSLogic {


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
    export class PlaySpell extends jsLogic.CancelableAction<HsGameCtx, PlayCardParam> {

        static ON_TARGETING_PHASE = 'onTargetingPhase';

        cancelAction(eventParam: PlayCardParam): boolean {
            return eventParam.cancelAction;
        }


        cancelOnAfterEvent(eventParam: PlayCardParam): boolean {
            return eventParam.cancelAction;
        }


        resolve(_this_: PlaySpell, gameCtx: HsGameCtx): PromiseOfActions {
            return new Promise<HsAction[]>(

                (resolve, reject): void => {
                    let spell: Spell = <Spell>_this_.param.card;

                    let actions: jsLogic.IAction<HsGameCtx>[] = [
                        gameCtx.actionFactory.dispatchEvent<HsGameCtx, PlayCardParam>(PlaySpell.ON_TARGETING_PHASE, _this_.param)
                    ];

                    for (let i = 0; i < spell.spellActions.length; i++)
                        actions.push(spell.spellActions[i].build(_this_.param, gameCtx));

                    resolve(actions);
                }
            );
        }
    }
}
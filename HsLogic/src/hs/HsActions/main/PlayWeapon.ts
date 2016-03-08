///<reference path="../../core/HsAction.ts"/>
///<reference path="../../core/HsActionEvent.ts"/> 
///<reference path="../../../core/action/abstractActions/CancelableAction.ts"/>

"use strict";

namespace HSLogic {


    /**
     * PlayCard
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Playing_a_weapon
     *
 	 */
    export class PlayWeapon extends jsLogic.CancelableAction<HsGameCtx, PlayCardParam> {

        cancelAction(eventParam: PlayCardParam): boolean {
            return eventParam.cancelAction;
        }


        cancelOnAfterEvent(eventParam: PlayCardParam): boolean {
            return eventParam.cancelAction;
        }


        resolve(_this_: PlayWeapon, gameCtx: HsGameCtx): PromiseOfActions {
            return new Promise<HsAction[]>(

                (resolve, reject): void => {
                    let weapon: Weapon = <Weapon>_this_.param.card;

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
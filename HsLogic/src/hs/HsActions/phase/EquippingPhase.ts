///<reference path="../../core/HsAction.ts"/>
///<reference path="../../../core/action/abstractActions/CancelableAction.ts"/>

"use strict";

namespace HSLogic {


    /**
     * PlayCard
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Playing_a_weapon
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Instant_weapon_destruction
     *
 	 */
    export class EquippingPhase extends jsLogic.IAction<HsGameCtx> {

        constructor(public param: PlayCardParam) { super(param.source.action) }


        resolve(_this_: EquippingPhase, gameCtx: HsGameCtx): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(

                (resolve, reject): void => {
                    let weapon: Weapon = <Weapon>_this_.param.card;

                    // destroy old weapon
                    // equip new weapon
                    // new weapon battlecry triggers
                    // old weapon deathrattle triggers

                    let actions: jsLogic.IAction<HsGameCtx>[] = [];

                    resolve(actions);
                }
            );
        }
    }
}
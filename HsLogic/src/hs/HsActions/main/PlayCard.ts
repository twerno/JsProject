///<reference path="../../core/HsAction.ts"/>
///<reference path="../../../core/action/abstractActions/CancelableAction.ts"/>

"use strict";

namespace HSLogic {

    export interface PlayCardParam extends HsActionParam {
        card: Card,
        player: Player,
        targets?: Target[],
        cancelAction: boolean
    }

    export interface PlayMinionParam extends PlayCardParam {
        position: number
    }


    /**
     * PlayCard
     *
 	 */
    export class PlayCard extends jsLogic.IAction<HsGameCtx> {

        constructor(public param: PlayCardParam) { super(param.sourceAction) }

        resolve(_this_: PlayCard, gameCtx: HsGameCtx): PromiseOfActions {
            return new Promise<HsAction[]>(

                (resolve, reject): void => {

                    let actions: jsLogic.IAction<HsGameCtx>[] = [
                        gameCtx.actionFactory.payCostAndRemoveFromHand(_this_.param) // pay cost & remove from hand
                    ];

                    // delegate to playSpell, playMinon or playWeapon action
                    if (_this_.param.card.type === CARD_TYPE.MINION)
                        actions.push(gameCtx.actionFactory.playMinion(<PlayMinionParam>_this_.param));

                    if (_this_.param.card.type === CARD_TYPE.SPELL)
                        actions.push(gameCtx.actionFactory.playSpell(_this_.param));

                    if (_this_.param.card.type === CARD_TYPE.WEAPON)
                        actions.push(gameCtx.actionFactory.playWeapon(_this_.param));

                    resolve(actions);
                }
            );
        }
    }
}
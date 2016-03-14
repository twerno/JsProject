///<reference path="../../core/HsAction.ts"/>
///<reference path="../../../core/action/abstractActions/CancelableAction.ts"/>

"use strict";

namespace HSLogic {

    export interface PlayCardParam extends IHsActionParam {
        card: Minion | Weapon | Spell,
        player: Player,
        cardActionTargets: Array<HsEntity[]>,
        cancelAction?: { value: boolean }
    }

    export interface PlayMinionParam extends PlayCardParam {
        position: number
    }


    /**
     * PlayCard
     *
 	 */
    export class PlayCard extends HsAction<PlayCardParam> {


        resolve( _this_: PlayCard, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(

                ( resolve, reject ): void => {
                    let param: PlayCardParam = _this_.param,
                        actions: jsLogic.IAction<HsGameCtx>[] = [],
                        targetBaseActions: ICardActionDefs = [],
                        acquireTargetsParam: IAcquireTargetsParam = null;

                    ////acquire targets
                    //if (param.card instanceof Minion)
                    //    targetBaseActions = (<Minion>param.card).battlecry;
                    //else if (param.card instanceof Weapon)
                    //    targetBaseActions = (<Weapon>param.card).battlecry;
                    //else if (param.card instanceof Spell)
                    //    targetBaseActions = (<Spell>param.card).spellActions;

                    //if (targetBaseActions && targetBaseActions.length > 0) {
                    //    acquireTargetsParam = {
                    //        source: param.source,
                    //        cardActions: targetBaseActions,
                    //        sets: [],
                    //        cancelAction: param.cancelAction
                    //    };

                    //    actions.push(new AcquireTargets(acquireTargetsParam));
                    //}

                    // pay cost & remove from hand
                    gameCtx.actionFactory.payCostAndRemoveFromHand( param );


                    // delegate to playSpell, playMinon or playWeapon action
                    if ( param.card instanceof Minion ) {
                        actions.push( gameCtx.actionFactory.playMinion( <PlayMinionParam>param ) );
                    }

                    if ( _this_.param.card.cardType === CARD_TYPE.SPELL )
                        actions.push( gameCtx.actionFactory.playSpell( _this_.param ) );

                    if ( _this_.param.card.cardType === CARD_TYPE.WEAPON )
                        actions.push( gameCtx.actionFactory.playWeapon( _this_.param ) );

                    resolve( actions );
                }
            );
        }
    }
}
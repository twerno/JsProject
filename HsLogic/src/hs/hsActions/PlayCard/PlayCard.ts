///<reference path="../../core/HsAction.ts"/>


"use strict";

namespace HsLogic {

    export interface PlayCardParam extends IHsCancelableParam {
        card: Minion | Weapon | Spell,
        acquiredTargets: Def.ITargets[]
    }

    export interface PlayMinionParam extends PlayCardParam {
        position: number
    }

    export interface IEquipWeaponParam extends PlayCardParam {
        player: Player
    }


    /**
     * PlayCard
     *
 	 */
    export class PlayCard extends Action<PlayCardParam> {

        resolve( self: PlayCard, context: HsGameCtx ): PromiseOfActions {
            if ( self.param.cancelAction.value )
                return Promise.resolve( jsLogic.NO_CONSEQUENCES );

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: PlayCardParam = self.param,
                        actions: ActionType[] = [];

                    //                    actions.push(context.actionFactory.acquireTargets({
                    //                        source: param.source,
                    //                        targets: param.acquiredTargets,
                    //                        defActions: param.card.playActions,
                    //                        cancelAction: param.cancelAction
                    //                    }));

                    // delegate to playSpell, playMinon or playWeapon action
                    if ( param.card instanceof Minion )
                        actions.push( context.actionFactory.playMinion( <PlayMinionParam>param ) );

                    else if ( param.card instanceof Spell )
                        actions.push( context.actionFactory.playSpell( param ) );

                    else if ( param.card instanceof Weapon )
                        actions.push( context.actionFactory.playWeapon( <IEquipWeaponParam>param ) );

                    else
                        reject( new Error( `Unsuported object class: ${param.card}` ) );

                    resolve( actions );
                }
            ); // return new Promise

        } // resolve( self: PlayCard

    } // export class PlayCard

}
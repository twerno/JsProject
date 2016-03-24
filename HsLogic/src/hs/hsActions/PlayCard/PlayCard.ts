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

        resolve( self: PlayCard, gameCtx: HsGameCtx ): PromiseOfActions {
            if ( self.param.cancelAction.value )
                return Promise.resolve( jsLogic.NO_CONSEQUENCES );

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: PlayCardParam = self.param,
                        actions: jsLogic.IAction<HsGameCtx>[] = [];

                    //                    actions.push(gameCtx.actionFactory.acquireTargets({
                    //                        source: param.source,
                    //                        targets: param.acquiredTargets,
                    //                        defActions: param.card.playActions,
                    //                        cancelAction: param.cancelAction
                    //                    }));

                    // delegate to playSpell, playMinon or playWeapon action
                    if ( param.card instanceof Minion )
                        actions.push( gameCtx.actionFactory.playMinion( <PlayMinionParam>param ) );

                    else if ( param.card instanceof Spell )
                        actions.push( gameCtx.actionFactory.playSpell( param ) );

                    else if ( param.card instanceof Weapon )
                        actions.push( gameCtx.actionFactory.playWeapon( <IEquipWeaponParam>param ) );

                    else
                        reject( new Error( `Unsuported object class: ${param.card}` ) );

                    resolve( actions );
                }
            ); // return new Promise

        } // resolve( self: PlayCard

    } // export class PlayCard

}
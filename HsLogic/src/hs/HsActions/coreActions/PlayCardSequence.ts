
"use strict";

namespace HsLogic {

    export interface PlayCardParam extends IHsCancelableParam {
        card: Minion | Weapon | Spell,
        targets: Permanent[]
    }

    export interface PlayMinionParam extends PlayCardParam {
        card: Minion,
        position: number
    }

    export interface PlayWeaponParam extends PlayCardParam {
        card: Weapon,
        player: Player
    }

    export interface PlaySpellParam extends PlayCardParam {
        card: Spell
    }


    /**
     * PlayCard
     *
 	 */
    export class PlayCardSequence extends Action<PlayCardParam> {

        resolve( self: PlayCardSequence, context: HsGameCtx ): PromiseOfActions {
            if ( self.param.cancelAction.value )
                return Promise.resolve( jsLogic.NO_CONSEQUENCES );

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: PlayCardParam = self.param,
                        actions: ActionType[] = [];

                    // delegate to playSpell, playMinon or playWeapon action
                    if ( param.card instanceof Minion )
                        actions.push( context.actionFactory.playMinion( <PlayMinionParam>param ) );

                    else if ( param.card instanceof Spell )
                        actions.push( context.actionFactory.playSpell( <PlaySpellParam>param ) );

                    else if ( param.card instanceof Weapon )
                        actions.push( context.actionFactory.playWeapon( <PlayWeaponParam>param ) );

                    else
                        reject( new Error( `Unsuported object class: ${param.card}` ) );

                    resolve( actions );
                }
            ); // return new Promise

        } // resolve( self: PlayCard

    } // export class PlayCard

}
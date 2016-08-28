/// <reference path="../../core/action.ts" />
/// <reference path="../../core/ActionEvent.ts" />
"use strict";

namespace HsLogic {


    // http://hearthstone.gamepedia.com/Advanced_rulebook#Combat
    export class CombatPhase<P extends CombatParam> extends Action<P> {

        resolvable( gameCtx: HsGameCtx ): boolean {
            return gameCtx.gameBoard.isInPlay( this.param.attacker )
                && gameCtx.gameBoard.isInPlay( this.param.defender );
        }

        resolve( self: CombatPhase<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<ActionType | ActionType[]>(

                ( resolve, reject ): void => {
                    let actions: ActionType[] = [],
                        param: P = this.param;

                    // Damage is dealt simultaneously in the order (attack, counterattack) and resolved
                    actions.push( gameCtx.actionFactory.multistepDamage( {
                        source: param.source,
                        notifyMode: NOTIFY_MODE.AFTER_ALL_ACTIONS,
                        steps: [
                            {
                                source: param.attacker.getSource(),
                                amount: calculatePower( param.attacker, gameCtx ),
                                damageType: Def.DAMAGE_TYPE.COMBAT,
                                targets: [param.defender]
                            },
                            {
                                source: param.defender.getSource(),
                                amount: calculatePower( param.defender, gameCtx ),
                                damageType: Def.DAMAGE_TYPE.COMBAT,
                                targets: [param.attacker]
                            },
                        ]
                    }) );

                    actions.push( new event.AttackEvent( param ).dispatch( gameCtx ) );

                    actions.push( new event.AfterAttackEvent( param ).dispatch( gameCtx ) );

                    resolve( actions );
                });
        }
    }
}
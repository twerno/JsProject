/// <reference path="../../core/action.ts" />
/// <reference path="../../core/ActionEvent.ts" />
"use strict";

namespace HsLogic {

    export interface CombatPreparationPhaseParam extends IActionParam {
        attacker: Character,
        defender: Character,
        newDefender: Character
    }

    // http://hearthstone.gamepedia.com/Advanced_rulebook#Combat
    export class CombatPreparationPhase<P extends CombatPreparationPhaseParam> extends Action<P> {

        resolve( self: CombatPreparationPhase<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<ActionType | ActionType[]>(

                ( resolve, reject ): void => {
                    let actions: ActionType[] = [],
                        param: P = this.param;

                    param.newDefender = null;

                    actions.push( new event.ProposedAttackEvent( param ).dispatch( gameCtx ) );

                    actions.push( gameCtx.techActionFactory.inlineAction(
                        ( resolve, reject ) => {
                            let innerActions: ActionType[] = [];

                            if ( param.defender !== param.newDefender ) {
                                param.defender = param.newDefender;
                                param.newDefender = null;
                                innerActions.push( gameCtx.phaseActionFactory.combatPreparationPhase( param ) );
                            }

                            resolve( innerActions );
                        })
                    );

                    resolve( actions );
                });
        }
    }
}
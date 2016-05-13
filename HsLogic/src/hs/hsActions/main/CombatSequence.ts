/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {


    export interface CombatParam extends IActionParam {
        attacker: Character,
        defender: Character
    }


    export class CombatSequence<P extends CombatParam> extends Action<P> {

        resolve( self: CombatSequence<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [],
                        prepPhaseParam: CombatPreparationPhaseParam;

                    prepPhaseParam = {
                        source: param.source,
                        attacker: param.attacker,
                        defender: param.defender,
                        newDefender: null
                    };

                    actions.push( gameCtx.phaseActionFactory.combatPreparationPhase( prepPhaseParam ) );

                    actions.push( gameCtx.techActionFactory.inlineAction(
                        ( resolve, reject ) => {
                            let innerActions: ActionType[] = [];

                            param.defender = prepPhaseParam.defender;

                            innerActions.push( gameCtx.techActionFactory.winLossCheck( param ) );

                            // As with other Sequences, if the attacker or defender leaves play for any reason, 
                            // the current Phase will finish resolving but the Sequence will end early afterwards.
                            innerActions.push( gameCtx.phaseActionFactory.combatPhase( param ) );

                            innerActions.push( gameCtx.techActionFactory.winLossCheck( param ) );

                            resolve( innerActions );
                        }
                    ) );

                    resolve( actions );
                }
            );
        }
    }


}
/// <reference path="../model/zone.ts" />

"use strict";

namespace HsLogic {


    export class PhaseActionFactory {

        combatPhase( param: CombatParam ): jsAction.IActionType {
            return new CombatPhase( param );
        }

        combatPreparationPhase( param: CombatPreparationPhaseParam ): jsAction.IActionType {
            return new CombatPreparationPhase( param );
        }

        auraUpdateStep( param: IAuraUpdateParam ): jsAction.IActionType {
            return new AuraUpdateStep( param );
        }

        deathCreationStep( param: IActionParam ): jsAction.IActionType {
            return new DeathCreationStep( param );
        }

        deathPhase( param: IAuraUpdateParam ): jsAction.IActionType {
            return new DeathPhase( param );
        }

        outermostPhaseEnd( param: IAuraUpdateParam ): jsAction.IActionType {
            return new OutermostPhaseEnd( param );
        }

        playPhase( param: PlayCardParam ): jsAction.IActionType {
            return new PlayPhase( param );
        }

    }
}
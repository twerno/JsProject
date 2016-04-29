/// <reference path="../model/zone.ts" />

"use strict";

namespace HsLogic {


    export class PhaseActionFactory {

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
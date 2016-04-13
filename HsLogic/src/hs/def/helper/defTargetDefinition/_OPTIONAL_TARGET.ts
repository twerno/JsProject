"use strict";

namespace Def {

    export class OPTIONAL_TARGET {

        static get SINGLE_FRIENDLY_MINION(): SimpleTargetDefinition {
            return new SimpleTargetDefinition( {
                availableTargets: TargetFinder.FRIENDLY_MINION,
                availibleTargetsRequiredNumber: 0,
                numberOfTargets: 1,
                pickMode: PICK_MODE.USER_CHOICE
            });
        }

    }

}
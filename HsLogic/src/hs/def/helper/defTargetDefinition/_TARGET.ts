"use strict";

namespace Def {

    export class TARGET {

        static get SINGLE_CHARACTER(): SimpleTargetDefinition {
            return new SimpleTargetDefinition( {
                availableTargets: TargetFinder.ANY_CHARACTER,
                availibleTargetsRequiredNumber: 1,
                numberOfTargets: 1,
                pickMode: PICK_MODE.USER_CHOICE
            });
        }

    }

}
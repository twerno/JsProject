"use strict";

namespace HSLogic {

    export class DefAction_ {

        static get destroy_target(): ITargetedActionFactory<HsGameCtx, ParamWithTargetFilter> {
            return (sourceAction: jsLogic.IAction<HsGameCtx>, param: ParamWithTargetFilter, gameCtx: HsGameCtx): jsLogic.IAction<HsGameCtx> => {
                //return gameCtx.actionFactory.markAsDestroyed(param.;
                return null;
            }
        }

    }

}
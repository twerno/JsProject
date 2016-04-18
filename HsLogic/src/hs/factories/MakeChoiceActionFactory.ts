"use strict";

namespace HsLogic {

    export class MakeChoiceActionFactory<T extends HsGameCtx> {

        atRandom( param: MakeAChoiceAtRandomParam<Entity> ): jsAction.IAction<T> {
            return new MakeChoiceAtRandom( param );
        }



        //        allTargets(param: IChooseSingleTargetParam<HsEntity>): jsLogic.IAction<T> {
        //            return new ChooseSingleTarget(param);
        //        }
    }
}
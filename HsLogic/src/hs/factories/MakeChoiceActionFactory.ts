"use strict";

namespace HsLogic {

    export class MakeChoiceActionFactory<T extends HsGameCtx> {

        atRandom( param: MakeAChoiceAtRandomParam<HsEntity> ): jsLogic.IAction<T> {
            return new MakeChoiceAtRandom( param );
        }

        singleTarget( param: IChooseSingleTargetParam<HsEntity> ): jsLogic.IAction<T> {
            return new ChooseSingleTarget( param );
        }

        //        allTargets(param: IChooseSingleTargetParam<HsEntity>): jsLogic.IAction<T> {
        //            return new ChooseSingleTarget(param);
        //        }
    }
}
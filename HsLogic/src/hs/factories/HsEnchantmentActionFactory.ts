"use strict";

namespace HSLogic {

    export interface ITargetsParam extends IHsActionParam {
        targets: HsEntity[],
    }

    export interface ICharactersParam extends IHsActionParam {
        targets: ( Player | Minion )[],
    }

    export interface ISingleTargetParam extends IHsActionParam {
        target: HsEntity,
    }

    export interface ISingleCharacterParam extends IHsActionParam {
        target: Player | Minion,
    }



    export class HsEnchantmentActionFactory<T extends HsGameCtx> {

        freeze( param: ICharactersParam ): jsLogic.IAction<T> {
            return null;
        }
    }
}
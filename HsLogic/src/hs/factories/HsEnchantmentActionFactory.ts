/// <reference path="../core/action.ts" />
/// <reference path="../core/action.ts" />
"use strict";

namespace HsLogic {

    export interface ITargetsParam extends IActionParam {
        targets: Entity[],
    }

    export interface ICharactersParam extends IActionParam {
        targets: ( Player | Minion )[],
    }

    export interface ISingleTargetParam extends IActionParam {
        target: Entity,
    }

    export interface ISingleCharacterParam extends IActionParam {
        target: Player | Minion,
    }



    export class HsEnchantmentActionFactory<T extends HsGameCtx> {

        freeze( param: ICharactersParam ): jsAction.IAction<T> {
            return null;
        }
    }
}
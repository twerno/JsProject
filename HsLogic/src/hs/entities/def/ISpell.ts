"use strict";

namespace HSLogic {

    //export interface IActionFactory<T extends jsLogic.IHasHandlersAndFactory, P extends jsLogic.IEventParam<T>> {
    //    build(param: P, gameCtx: T): jsLogic.IAction<T>;
    //}

    export interface ISpell extends ICard {
        spellActions: IActionFactory<HsGameCtx, HsActionParam>[];
    }
}
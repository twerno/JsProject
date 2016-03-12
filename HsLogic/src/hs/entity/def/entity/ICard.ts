"use strict";

namespace HSLogic {

    //export interface IActionFactory<T extends jsLogic.IExtContext, P extends jsLogic.IActionParam> {
    //    build(param: P, gameCtx: T): jsLogic.IAction<T>;
    //}


    export interface ICard extends IHsEntity {
        cost: number;
    }


}
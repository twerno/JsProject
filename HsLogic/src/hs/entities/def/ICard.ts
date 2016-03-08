﻿"use strict";

namespace HSLogic {

    export interface IActionFactory<T extends jsLogic.IActionContext, P extends jsLogic.IActionParam<T>> {
        build(param: P, gameCtx: T): jsLogic.IAction<T>;
    }


    export interface ICard extends IHsEntity {
        cost: number;
    }


}
///<reference path="../core/action/IAction.ts"/>


"use strict";

namespace HSLogic {

    export type PromiseOfActions = Promise<jsLogic.IAction<HsActionParam>[]>;

    export abstract class HsAction extends jsLogic.IAction<HsActionParam> { };

    export abstract class HsBaseAction extends jsLogic.BaseAction<HsActionParam> { };

}
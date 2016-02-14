///<reference path="../core/Action.ts"/>


"use strict";

namespace HSLogic {

    export abstract class HsAction<T> extends jsLogic.IAction<T> { };
    	
    export abstract class HsBaseAction<T> extends jsLogic.BaseAction<T> { };

}
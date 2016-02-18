///<reference path="../core/event/Event.ts"/>
///<reference path="HsActionParam.ts"/>

"use strict";

namespace HSLogic {

    export class HsActionEvent extends jsLogic.ActionEvent<HsActionParam> {
        constructor(source: jsLogic.IAction<HsActionParam>) {
            super(source);
        }
    }
}
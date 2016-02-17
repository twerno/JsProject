///<reference path="../core/event/Event.ts"/>

"use strict";

namespace HSLogic {

    export interface HsActionParam extends jsLogic.IActionParam {

    }

    export class HsActionEvent extends jsLogic.ActionEvent<HsActionParam> {
        constructor(source: jsLogic.IAction<HsActionParam>) {
            super(source);
        }
    }
}
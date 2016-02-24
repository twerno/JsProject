///<reference path="../../core/event/Event.ts"/>
///<reference path="../../core/event/EventHandler.ts"/>
///<reference path="HsActionParam.ts"/>

"use strict";

namespace HSLogic {

    export abstract class HsActionEvent extends jsLogic.ActionEvent<HsActionParam> {

        constructor(source: jsLogic.IAction<HsActionParam>) {
            super(source);
        }

    }


    export abstract class HsEventHandler extends jsLogic.EventHandler<HsActionParam> {

    }
}
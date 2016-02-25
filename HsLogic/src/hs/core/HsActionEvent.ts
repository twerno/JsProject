///<reference path="../../core/event/Event.ts"/>
///<reference path="../../core/event/EventHandler.ts"/>
///<reference path="HsActionParam.ts"/>

"use strict";

namespace HSLogic {

    export interface HsEventParam extends jsLogic.IEventParam<HsActionParam> {

    }



    export abstract class HsActionEvent<P extends HsEventParam> extends jsLogic.ActionEvent<HsActionParam, P> {

        constructor(param: P) {
            super(param);
        }

    }



    export abstract class HsEventHandler extends jsLogic.EventHandler<HsActionParam, HsEventParam> {

    }
}
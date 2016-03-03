///<reference path="../../core/event/Event.ts"/>
///<reference path="../../core/event/EventHandler.ts"/>
///<reference path="HsGameEnv.ts"/>

"use strict";

namespace HSLogic {

    export interface HsEventParam extends jsLogic.IEventParam<HsGameEnv> {

    }



    export abstract class HsActionEvent<P extends HsEventParam> extends jsLogic.ActionEvent<HsGameEnv, P> {

        constructor(param: P) {
            super(param);
        }

    }



    export abstract class HsEventHandler extends jsLogic.EventHandler<HsGameEnv, HsEventParam> {

    }
}
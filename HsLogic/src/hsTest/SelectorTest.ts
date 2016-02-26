///////////<reference path="../hs/core/HsAction.ts"/>
///////////<reference path="../hs/HsCard.ts"/>
///////////<reference path="../hs/core/HsZone.ts"/>
///////////<reference path="../hs/core/HsActionParam.ts"/>
///////////<reference path="../core/action/ActionStack.ts"/>
///////////<reference path="../hs/trigger/OnAfterDamageTrigger.ts"/>
///////////<reference path="../hs/trigger/OnBeforeDamageTrigger.ts"/>
///////////<reference path="../hs/trigger/OnAfterCardDrawTrigger.ts"/>

"use strict";

namespace HSLogic {

    export class SelectorResultToConsole<O> extends HsBaseAction {

        protected baseActionResolver(_this_: SelectorResultToConsole<O>, param: HsActionParam): void {
            console.log(`Selector result: ${_this_.selectorResult.join(', ')}`, _this_.selectorResult);
        }

        constructor(source: jsLogic.IAction<HsActionParam>, public selectorResult: O[]) {
            super(source);
        };

    }

}
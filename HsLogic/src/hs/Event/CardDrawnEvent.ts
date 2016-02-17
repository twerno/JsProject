///<reference path="../HsActionEvent.ts"/>

"use strict";

namespace HSLogic {

    export class CardDrawnEvent extends HsActionEvent {

        constructor(source: jsLogic.IAction<HsActionParam>, public target: Player, public card: Card) {
            super(source);
        };

    }
}
///<reference path="../core/Entity.ts"/>
////////<reference path="../core/Zone.ts"/>

"use strict";

namespace HSLogic {

    export class Player extends jsLogic.Entity {

        constructor() {
            super(null);
            this.counters[FatigueCounter.type] = new FatigueCounter(0);
        }
    }

    export class Card extends jsLogic.Entity {

        constructor(owner: Player) {
            super(owner);
        }
    }
}
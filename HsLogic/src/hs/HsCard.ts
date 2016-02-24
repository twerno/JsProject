///<reference path="../core/Entity.ts"/>
///<reference path="core/HsCounter.ts"/>

"use strict";

namespace HSLogic {

    export class LivingEntity extends jsLogic.Entity {
        constructor() {
            super(null);
            this.counters[HpCounter.type] = new HpCounter(30);
        }
    }

    export class Player extends LivingEntity {

        constructor() {
            super();
            this.counters[FatigueCounter.type] = new FatigueCounter(0);
        }
    }

    export class Card extends jsLogic.Entity {

        constructor(owner: Player) {
            super(owner);
        }
    }
}
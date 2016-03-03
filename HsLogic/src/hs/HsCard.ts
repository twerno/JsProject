///<reference path="../core/Entity.ts"/>
///<reference path="core/HsCounter.ts"/>

"use strict";

namespace HSLogic {

    export class LivingEntity extends jsLogic.Entity {

        hp: number;

        maxHp: number;

        constructor() {
            super(null);
            // this.counters[HpCounter.type] = new HpCounter(30);
        }
    }

    export class Player extends LivingEntity {

        constructor(public name: string) {
            super();
            this.hp = this.maxHp = 30;
            this.counters[FatigueCounter.type] = new FatigueCounter(0);
        }
    }

    export class Card extends jsLogic.Entity {

        constructor(owner: Player) {
            super(owner);
        }
    }
}
"use strict";

namespace HSLogic {

    export interface ITarget {
        targetInRightZone(): boolean;
    }


    export class Target implements ITarget {

        targetInRightZone(): boolean {
            return this.targetZone.has(this.target);
        }

        constructor(public target: jsLogic.Entity, public targetZone: HsZone) {
        }
    }


    export class LivingTarget implements ITarget {

        targetInRightZone(): boolean {
            return this.targetZone.has(this.target);
        }

        constructor(public target: LivingEntity, public targetZone: HsZone) {
        }
    }


    export class TargetPlayer extends LivingTarget {

        targetInRightZone(): boolean {
            return true;
        }

        constructor(public player: Player) {
            super(player, null);
        }
    }
}
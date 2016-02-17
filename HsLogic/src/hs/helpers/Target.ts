"use strict";

namespace HSLogic {

    export class Target {

        targetInRightZone(): boolean {
            return this.zoneOfTarget.has(this.target);
        }

        constructor(public target: jsLogic.Entity, public zoneOfTarget: HsZone) {
        }
    }

    export class TargetPlayer extends Target {

        targetInRightZone(): boolean {
            return true;
        }

        constructor(target: jsLogic.Entity) {
            super(target, null);
        }
    }

    export class DrawTarget {

        targetInRightZone(): boolean {
            return true;
        }

        constructor(public player: Player, public zones: HsZones) {
        }
    }

}
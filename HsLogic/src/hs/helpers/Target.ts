"use strict";

namespace HSLogic {

    export interface ITarget {
        targetInRightZone(): boolean;
    }



    export class Target implements ITarget {

        targetInRightZone(): boolean {
            return this.targetZone.has( <Card>this.target );
        }

        constructor( public target: Card, public targetZone: HsZone ) {
        }
    }



    export class LivingTarget implements ITarget {

        targetInRightZone(): boolean {
            if ( this.target instanceof Player )
                return true;
            else
                return this.targetZone.has( <Minion>this.target );
        }

        constructor( public target: Minion | Player, public targetZone: HsZone ) {
        }
    }


    export class TargetPlayer extends LivingTarget {

        targetInRightZone(): boolean {
            return true;
        }

        constructor( public player: Player ) {
            super( player, null );
        }
    }
}
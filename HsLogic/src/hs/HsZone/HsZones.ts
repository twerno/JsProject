///<reference path="../../core/Entity.ts"/>
///<reference path="../../core/Zone.ts"/>
///<reference path="../HsCard.ts"/>

"use strict";

namespace HSLogic {

    export namespace ZoneConsts {
        export const HAND_ZONE = 'HAND_ZONE';
        export const GAME_ZONE = 'GAME_ZONE';
        export const SECRET_ZONE = 'SECRET_ZONE';
        export const REMOVED_ZONE = 'REMOVED_ZONE';
        export const GRAVEYARD_ZONE = 'GRAVEYARD_ZONE';
        export const DECK_ZONE = 'DECK_ZONE';

        export const UNLIMITED = -1;
    }

    export class HsZone extends jsLogic.Zone<Card> {
        maxElements: number = -1; // -1 - unlimited
        
        isFull(): boolean {
            if (this.maxElements === -1)
                return false;
            else
                return this.count >= this.maxElements;
        }

        isEmpty(): boolean {
            return this._entities.length === 0;
        }

        constructor(owner: jsLogic.Entity, zoneId: string, maxElements: number) {
            super(owner, zoneId);
            this.maxElements = ((maxElements || 0) >= 0) ? (maxElements || 0) : -1;
        }
    }

    export class HsZones {

        hand: HsZone;
        deck: HsZone;
        graveyard: HsZone;

        hero: HsZone;
        weapon: HsZone;
        heroPower: HsZone;

        minion: HsZone;
        secret: HsZone;

        constructor(public owner: Player) {
            this.hand = new HsZone(owner, ZoneConsts.HAND_ZONE, 10);
            this.deck = new HsZone(owner, ZoneConsts.DECK_ZONE, 80);
            this.minion = new HsZone(owner, ZoneConsts.GAME_ZONE, 7);
            this.secret = new HsZone(owner, ZoneConsts.SECRET_ZONE, 5);
            this.graveyard = new HsZone(owner, ZoneConsts.GRAVEYARD_ZONE, ZoneConsts.UNLIMITED);
        }

    }


    //    export function buildHsZoneMap(owner: jsLogic.Entity): jsLogic.ZoneMap<Card> {
    //        let result: jsLogic.ZoneMap<Card> = new jsLogic.ZoneMap<Card>();
    //
    //        result.register();
    //        result.register(new HsZone(owner, ZoneConsts., 7));
    //        result.register(new HsZone(owner, ZoneConsts., ));
    //        result.register(new HsZone(owner, ZoneConsts.REMOVED_ZONE, ZoneConsts.UNLIMITED));
    //        result.register(new HsZone(owner, ZoneConsts., ZoneConsts.UNLIMITED));
    //        result.register();
    //
    //        return result;
    //    }
}
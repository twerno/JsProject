///<reference path="../../core/Entity.ts"/>
///<reference path="../../core/Zone.ts"/>
///<reference path="../entities/Card.ts"/>

"use strict";

namespace HSLogic {

    export namespace ZoneConsts {
        export const HAND_ZONE = 'HAND_ZONE';
        export const GAME_ZONE = 'GAME_ZONE';
        export const SECRET_ZONE = 'SECRET_ZONE';
        export const REMOVED_FROM_PLAY_ZONE = 'REMOVED_ZONE';
        export const GRAVEYARD_ZONE = 'GRAVEYARD_ZONE';
        export const DECK_ZONE = 'DECK_ZONE';
        export const HERO_ZONE = 'HERO_ZONE';
        export const WEAPON_ZONE = 'WEAPON_ZONE';
        export const HERO_POWER_ZONE = 'HERO_POWER_ZONE';


        export const UNLIMITED = -1;
    }

    export class HsZone extends jsLogic.Zone<Card> {
        maxElements: number = -1; // -1 - unlimited

        isFull(): boolean {
            if (this.maxElements === -1)
                return false;
            else
                return this.length >= this.maxElements;
        }

        isEmpty(): boolean {
            return this._entities.length === 0;
        }

        constructor(public zones: HsZones, zoneId: string, maxElements: number) {
            super(zones, zoneId);
            this.maxElements = ((maxElements || 0) >= 0) ? (maxElements || 0) : -1;
            zones.register(this);
        }
    }

    export class HsZones extends jsLogic.ZoneMap<Card, HsZone>{

        hand: HsZone;
        deck: HsZone;
        graveyard: HsZone;
        removed_from_play: HsZone;

        hero: HsZone;
        weapon: HsZone;
        heroPower: HsZone;

        battlefield: HsZone;
        secret: HsZone;

        constructor(public owner: Player) {
            super(owner);

            this.hand = new HsZone(this, ZoneConsts.HAND_ZONE, 10);
            this.deck = new HsZone(this, ZoneConsts.DECK_ZONE, 80);
            this.graveyard = new HsZone(this, ZoneConsts.GRAVEYARD_ZONE, ZoneConsts.UNLIMITED);
            this.removed_from_play = new HsZone(this, ZoneConsts.REMOVED_FROM_PLAY_ZONE, ZoneConsts.UNLIMITED);

            this.hero = new HsZone(this, ZoneConsts.HERO_ZONE, 1);
            this.weapon = new HsZone(this, ZoneConsts.WEAPON_ZONE, 1);
            this.heroPower = new HsZone(this, ZoneConsts.HERO_POWER_ZONE, 1);

            this.battlefield = new HsZone(this, ZoneConsts.GAME_ZONE, 7);
            this.secret = new HsZone(this, ZoneConsts.SECRET_ZONE, 5);
        }
    }
}
/// <reference path="card/genentity.ts" />
///<reference path="../../core/Zone.ts"/>

"use strict";

namespace HsLogic {

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


    export class Zone<T extends Card> extends jsAction.Zone<T> {
        maxElements: number = -1; // -1 - unlimited

        isFull(): boolean {
            if ( this.maxElements === -1 )
                return false;
            else
                return this.length >= this.maxElements;
        }

        isEmpty(): boolean {
            return this._entities.length === 0;
        }

        constructor( public zones: Zones, zoneId: string, maxElements: number ) {
            super( zones, zoneId );
            this.maxElements = ( ( maxElements || 0 ) >= 0 ) ? ( maxElements || 0 ) : -1;
            zones.register( this );
        }
    }


    export class Zones extends jsAction.ZoneMap<Card, Zone<Card>>{

        hand: Zone<Card>;
        deck: Zone<Card>;
        graveyard: Zone<Card>;
        removed_from_play: Zone<Card>;

        hero: Zone<Card>;
        weapon: Zone<Weapon>;
        heroPower: Zone<Card>;

        battlefield: Zone<Card>;
        secret: Zone<Card>;

        constructor( public owner: Player ) {
            super( owner );

            this.hand = new Zone( this, ZoneConsts.HAND_ZONE, 10 );
            this.deck = new Zone( this, ZoneConsts.DECK_ZONE, 80 );
            this.graveyard = new Zone( this, ZoneConsts.GRAVEYARD_ZONE, ZoneConsts.UNLIMITED );
            this.removed_from_play = new Zone( this, ZoneConsts.REMOVED_FROM_PLAY_ZONE, ZoneConsts.UNLIMITED );

            this.hero = new Zone( this, ZoneConsts.HERO_ZONE, 1 );
            this.weapon = new Zone<Weapon>( this, ZoneConsts.WEAPON_ZONE, 1 );
            this.heroPower = new Zone( this, ZoneConsts.HERO_POWER_ZONE, 1 );

            this.battlefield = new Zone( this, ZoneConsts.GAME_ZONE, 7 );
            this.secret = new Zone( this, ZoneConsts.SECRET_ZONE, 5 );
        }
    }
}
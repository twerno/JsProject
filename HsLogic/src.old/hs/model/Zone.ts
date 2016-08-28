/// <reference path="card/genentity.ts" />
"use strict";

namespace HsLogic {


    export class Zone<T extends Entity> {
        protected _entities: T[] = [];

        add( entity: T ): void {
            this._entities.push( entity );
        }

        remove( entity: T ): void {
            Collection.removeFrom( this._entities, entity );
        }

        pop(): T {
            return this._entities.pop();
        }

        replace( oldEntity: T, newEntity: T ): void {
            let index: number = this._entities.indexOf( oldEntity );
            if ( index === -1 )
                throw new Error( `Entity: ${oldEntity} does not exist in ${this}` );

            this._entities[index] = newEntity;
        }

        isEmpty(): boolean {
            return this._entities.length === 0;
        }

        contains( entity: T ): boolean {
            return this._entities.indexOf( entity ) > -1;
        }

        get length(): number { return this._entities.length; }

        get entities(): T[] { return this._entities.slice() }

        constructor( public owner: Player ) { }
    }


    export class Battlefield<T extends Minion> extends Zone<T> {

        add( entity: T ): void {
            throw new Error( 'use addAt instead' );
        }

        addAt( entity: T, position: number ): void {
            this._entities.splice( this._fixPosition( position ), 0, entity );
            this.updateMinionsPosition();
        }

        remove( entity: T ): void {
            super.remove( entity );
            this.updateMinionsPosition();
        }

        replace( oldEntity: T, newEntity: T ): void {
            super.replace( oldEntity, newEntity );
            this.updateMinionsPosition();
        }

        private _fixPosition( position: number ): number {
            return Math.min( Math.max( position || this.length, 0 ), this.length );
        }

        updateMinionsPosition(): void {
            for ( let i = 0; i < this._entities.length; i++ )
                this._entities[i].position = i;
        }

    }







    export class Zones {

        hand: Zone<Card>;
        deck: Zone<Card>;
        graveyard: Zone<Card>;
        removed_from_play: Zone<Card>;

        hero: Zone<Hero>;
        weapon: Zone<Weapon>;
        heroPower: Zone<HeroPower>;

        battlefield: Battlefield<Minion>;
        secret: Zone<Card>;

        constructor( public owner: Player ) {

            this.hand = new Zone<Card>( owner );
            this.deck = new Zone<Card>( owner );
            this.graveyard = new Zone<Card>( owner );
            this.removed_from_play = new Zone<Card>( owner );

            this.hero = new Zone<Hero>( owner );
            this.weapon = new Zone<Weapon>( owner );
            this.heroPower = new Zone<HeroPower>( owner );

            this.battlefield = new Battlefield<Minion>( owner );
            this.secret = new Zone<Card>( owner );
        }
    }
}
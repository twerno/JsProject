"use strict";

namespace HsLogic {

    export class CardSet<T extends Def.ICard> {

        private _map: Map<string, T> = new Map<string, T>();

        registerCard<C extends T>( card: C ): C {
            if ( this._map.has( card.name ) )
                throw new Error( `Attempt to duplicate value: ${card}` );

            Object.freeze( card );
            this._map.set( card.name, card );
            return card;

            //validacja typu i obiektu
        }


        count(): number {
            return this._map.size;
        }


        cards(): IterableIterator<T> {
            return this._map.values();
        }


        constructor( public name: string ) { }
    }
}
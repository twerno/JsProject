///<reference path="../core/HsEntity.ts"/>
///<reference path="def/entity/ICard.ts"/>

"use strict";

namespace HSLogic {

    export class CardSet<T extends IHsEntity> {

        private _map: Map<string, T> = new Map<string, T>();

        registerCard(card: T): void {
            if (this._map.has(card.name))
                throw new Error(`Attempt to duplicate value: ${card}`);

            Object.freeze(card);
            this._map.set(card.name, card);
        }


        count(): number {
            return this._map.size;
        }


        cards(): IterableIterator<T> {
            return this._map.values();
        }


        constructor(public name: string) { }
    }
}
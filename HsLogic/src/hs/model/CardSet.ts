"use strict";

namespace HsLogic {

    export class CardSet {

        private _map: Map<string, Def.ICard> = new Map<string, Def.ICard>();

        private registerCard( card: Def.ICard ): Def.ICard {
            if ( this._map.has( card.name ) )
                console.warn( `Duplicate value ${card.name}`, card );

            if ( card.metadata.cardType === Def.UNDEFINED )
                throw new Error( `Type of card "${card.name}" of set "${this.name}" is UNDEFINED` );

            card.metadata.set = this.name;
            Object.freeze( card );
            this._map.set( card.name, card );
            return card;
        }


        registerMinion( minionDef: Def.IMinion ): Def.IMinion {
            minionDef.metadata.cardType = Def.CARD_TYPE.MINION;
            this.registerCard( minionDef );
            return minionDef;
        }


        registerSpell( spellDef: Def.ISpell ): Def.ISpell {
            spellDef.metadata.cardType = Def.CARD_TYPE.SPELL;
            this.registerCard( spellDef );
            return spellDef;
        }


        count(): number {
            return this._map.size;
        }


        cards(): IterableIterator<Def.ICard> {
            return this._map.values();
        }


        constructor( public name: string ) { }
    }
}
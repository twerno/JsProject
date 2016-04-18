"use strict";

namespace HsLogic {


    export abstract class Enchantment<T extends Permanent> {

        type: Def.AURA_TYPE;
        priority: number = 1;
        orderOfPlay: number;

        constructor( public source: ISource, public target: T, public isAura: boolean = false ) {
            this.orderOfPlay = orderOfPlayGen();

            if ( !this.validateTarget )
                throw new Error( `Target ${target} is not valid for enchantment ${ClassUtils.getNameOfClass( this )}.` );
        }

        protected abstract validateTarget(): boolean;
        abstract apply(): void;
        abstract replaceOfRemove(): Enchantment<T>;


        compare( a: Enchantment<Permanent>, b: Enchantment<Permanent> ): number {
            if ( a.priority === b.priority )
                return a.orderOfPlay - b.orderOfPlay;
            else
                return a.priority - b.priority;
        }
    }
}
"use strict";

namespace HsLogic {


    export abstract class Enchantment<T extends PermanentExt> extends OrderableEntity {

        priority: number = 1;

        constructor( public source: ISource, public target: T, public isAura: boolean = false ) {

            super( null );

            if ( !this.validateTarget )
                throw new Error( `Target ${target} is not valid for enchantment ${ClassUtils.getNameOfClass( this )}.` );
        }

        protected abstract validateTarget(): boolean;
        abstract apply(): void;
        abstract remove(): void;

        eq( enchant: Enchantment<PermanentExt> ): boolean {
            return this.priority === enchant.priority
                && this.target === enchant.target
                && this.isAura === enchant.isAura
                && this.source.entity === enchant.source.entity;
        }

        compare( a: Enchantment<T>, b: Enchantment<T> ): number {
            if ( a.priority === b.priority )
                return a.orderOfPlay.getTime() - b.orderOfPlay.getTime();
            else
                return a.priority - b.priority;
        }

        get owner(): Player { return this.target.owner }
        set owner( dummy: Player ) { /* dummy */ }
    }
}
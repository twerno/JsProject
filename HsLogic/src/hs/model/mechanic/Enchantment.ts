"use strict";

namespace HsLogic {


    export abstract class Enchantment<T extends PermanentExt> {

        priority: number = 1;
        orderOfPlay: Date = new Date();

        constructor( public source: ISource, public target: T, public isAura: boolean = false ) {

            if ( !this.validateTarget )
                throw new Error( `Target ${target} is not valid for enchantment ${ClassUtils.getNameOfClass( this )}.` );
        }

        protected abstract validateTarget(): boolean;
        abstract apply(): void;
        abstract remove(): void;


        compare( a: Enchantment<T>, b: Enchantment<T> ): number {
            if ( a.priority === b.priority )
                return a.orderOfPlay.getTime() - b.orderOfPlay.getTime();
            else
                return a.priority - b.priority;
        }
    }
}
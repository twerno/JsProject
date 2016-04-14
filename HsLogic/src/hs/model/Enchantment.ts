"use strict";

namespace HsLogic {


    export abstract class Enchantment<T extends Permanent> {

        type: Def.ENCHANTMENT_TYPE;
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

    export interface ISetter { set: number };
    export interface AttackHealthEnchantmentParam {
        attack: number | ISetter,
        health: number | ISetter
    }


    export class AttackHealthEnchantment extends Enchantment<Character> {

        protected param: AttackHealthEnchantmentParam;

        constructor( source: ISource, target: Character, public isAura: boolean = false ) {
            super( source, target, isAura );

            this.type = Def.ENCHANTMENT_TYPE.ATTACH_HEALTH;

            if ( this.isAura )
                this.priority = 2;
        }

        protected validateTarget(): boolean {
            return this.target instanceof Player
                || this.target instanceof Minion;
        }

        init( param: AttackHealthEnchantmentParam ): AttackHealthEnchantment {
            this.param = param;
            return this;
        }

        apply(): void {

            // attack
            if ( isDelta( this.param.attack ) )
                this.target.attack += <number>this.param.attack;

            else if ( isSetter( this.param.attack ) )
                this.target.attack = ( <ISetter>this.param.attack ).set;


            // health
            if ( isDelta( this.param.health ) )
                this.target.health += <number>this.param.health;

            else if ( isSetter( this.param.health ) ) {
                this.target.health = ( <ISetter>this.param.health ).set;
                this.target.damages = 0;
            }

        }

        replaceOfRemove(): AttackHealthEnchantment {
            let param: AttackHealthEnchantmentParam = { attack: 0, health: 0 };

            if ( isSetter( this.param.attack ) )
                param.attack = { set: this.target.def.attack };

            if ( isSetter( this.param.health ) )
                param.health = { set: this.target.def.health };

            if ( param.attack !== 0 || param.health !== 0 ) {
                return new AttackHealthEnchantment( this.source, this.target, false )
                    .init( param );
            }

            return null;
        }
    }


    function isDelta( x: any ): x is number {
        return typeof x === 'number';
    }

    function isSetter( x: any ): x is ISetter {
        return typeof x === 'object' && x.hasOwnProperty( 'set' )
    }
}
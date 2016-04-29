/// <reference path="../enchantment.ts" />

"use strict";

namespace HsLogic {

    export interface ISetter { set: number };
    export interface AttackHealthEnchantmentParam {
        attack: number | ISetter,
        health: number | ISetter
    }


    export class AttackHealthEnchantment extends Enchantment<Character> {

        protected param: AttackHealthEnchantmentParam;

        constructor( source: ISource, target: Character, isAura: boolean = false ) {
            super( source, target, isAura );

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
            let body: MinionBody = this.target.body;

            // attack
            if ( isDelta( this.param.attack ) )
                body.attack += <number>this.param.attack;

            else if ( isSetter( this.param.attack ) )
                body.attack = ( <ISetter>this.param.attack ).set;


            let health: number | ISetter = this.param.health;
            // health
            if ( isDelta( health ) )
                body.health += health;

            else if ( isSetter( health ) ) {
                body.health = health.set;
                body.damages = 0;
            }

        }


        remove(): void {
            let param: AttackHealthEnchantmentParam = { attack: 0, health: 0 },
                body: MinionBody = this.target.body;;

            if ( isSetter( this.param.attack ) )
                body.attack = this.target.def.attack;

            let health: number | ISetter = this.param.health;

            // revert of health increase
            if ( isDelta( health ) && health > 0 )
                body.damages = Math.max( 0, body.damages - health );

            if ( isSetter( this.param.health ) )
                body.damages = 0;
        }
    }


    function isDelta( x: any ): x is number {
        return typeof x === 'number';
    }

    function isSetter( x: any ): x is ISetter {
        return typeof x === 'object' && x.hasOwnProperty( 'set' )
    }
}
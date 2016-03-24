"use strict";

namespace HsLogic {

    export enum PERMANENT_STATE_TYPE {
        NON_AURA, AURA
    }


    export abstract class PermanentStateChange<T extends Minion | Player | Weapon, P extends any> {

        orderOfPlay: number;

        abstract applyTo( target: T ): void;

        abstract onRemovingAddNewStateChangeTo( target: T ): PermanentStateChange<T, P>;

        abstract init( param: P ): PermanentStateChange<T, P>;

        constructor( protected sourceCard: Card, protected parent: Def.IDefEnchantment, public type: PERMANENT_STATE_TYPE ) {
            this.orderOfPlay = jsLogic.generateNewId();
        }
    }


    //export abstract class CharacterStateCalc<T extends Minion | Player, P> extends PermanentStateChange<T, P>{

    //    //abstract applyTo( target: Minion | Player ): void;

    //    //abstract init( param: P ): PermanentStateChange<P>;

    //    //abstract onRemovingAddNewStateChangeTo( target: Minion | Player ): PermanentStateChange<any>;
    //}




    export class AttackBuff<T extends Minion | Player | Weapon> extends PermanentStateChange<T, number> {
        protected amount: number = 0;

        init( param: number ): PermanentStateChange<T, any> {
            this.amount = param;
            return this;
        }

        applyTo( target: T ): void {
            target.attack += this.amount;
        }

        onRemovingAddNewStateChangeTo( target: T ): PermanentStateChange<T, any> {
            return null;
        }
    }


    export class MaxHpBuff<T extends Minion> extends PermanentStateChange<T, number> {
        protected maxHpMod: number = 0;

        init( param: number ): PermanentStateChange<T, any> {
            this.maxHpMod = param;
            return this;
        }

        applyTo( target: T ): void {
            if ( this.maxHpMod !== 0 ) {

                let hpMod: number = Math.max( this.maxHpMod - target.maxHp, 0 );
                let newHp: number = Math.min( target.hp + hpMod, this.maxHpMod );

                target.maxHp += this.maxHpMod;
                target.hp = newHp;
            }
        }

        onRemovingAddNewStateChangeTo( target: T ): PermanentStateChange<T, any> {
            //if ( target.hp < target.maxHp
            return null;
        }
    }


    export class CharacterHeal<T extends Minion | Player> extends PermanentStateChange<T, number> {
        protected amount: number = 0;

        init( param: number ): PermanentStateChange<T, any> {
            this.amount = Math.max( param || 0, 0 );
            return this;
        }

        applyTo( target: T ): void {
            target.hp = Math.min( target.hp + this.amount, target.maxHp );
        }

        onRemovingAddNewStateChangeTo( target: T ): PermanentStateChange<T, any> {
            return null;
        }
    }


    export class CharacterDamage<T extends Minion | Player> extends PermanentStateChange<T, number> {
        protected amount: number = 0;

        init( param: number ): PermanentStateChange<T, any> {
            this.amount = Math.min( param || 0, 0 );
            return this;
        }

        applyTo( target: T ): void {
            target.hp = Math.min( target.hp + this.amount, target.maxHp );
        }

        onRemovingAddNewStateChangeTo( target: T ): PermanentStateChange<T, any> {
            return null;
        }
    }

}
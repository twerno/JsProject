"use strict";

namespace HsLogic {

    export enum PERMANENT_STATE_SOURCE_TYPE {
        NON_AURA, AURA
    }

    export interface PermanentStateClass {
        new ( target: Permanent, source: ISource ): PermanentState<Permanent, any>;
    }

    export abstract class PermanentState<T extends Minion | Player | Weapon, P extends any> {

        orderOfPlay: number;

        abstract apply(): void;

        abstract init( param: P ): PermanentState<T, P>;

        constructor( public target: T, public source: ISource ) {
            this.orderOfPlay = jsLogic.generateNewId();
        }

        onRemovingReplaceWith(): PermanentState<T, P> {
            return null;
        }
    }



    export class AttackBuff<T extends Minion | Player | Weapon> extends PermanentState<T, number> {
        protected amount: number = 0;

        init( param: number ): PermanentState<T, any> {
            this.amount = param;
            return this;
        }

        apply(): void {
            this.target.attack += this.amount;
        }
    }


    export class MaxHpBuff<T extends Minion> extends PermanentState<T, number> {
        protected maxHpMod: number = 0;

        init( param: number ): PermanentState<T, any> {
            this.maxHpMod = param;
            return this;
        }

        apply(): void {
            if ( this.maxHpMod !== 0 ) {

                let hpMod: number = Math.max( this.maxHpMod - this.target.maxHp, 0 );
                let newHp: number = Math.min( this.target.hp + hpMod, this.maxHpMod );

                this.target.maxHp += this.maxHpMod;
                this.target.hp = newHp;
            }
        }

        onRemovingReplaceWith(): PermanentState<T, any> {
            //if ( target.hp < target.maxHp
            return null;
        }
    }


    export class CharacterHeal<T extends Minion | Player> extends PermanentState<T, number> {
        protected amount: number = 0;

        init( param: number ): PermanentState<T, any> {
            this.amount = Math.max( param || 0, 0 );
            return this;
        }

        apply(): void {
            let target: T = this.target;

            target.hp = Math.min( target.hp + this.amount, target.maxHp );
        }
    }


    export class CharacterDamage<T extends Minion | Player> extends PermanentState<T, number> {
        protected amount: number = 0;

        init( param: number ): PermanentState<T, any> {
            this.amount = Math.min( param || 0, 0 );
            return this;
        }

        apply(): void {
            this.target.hp = Math.min( this.target.hp + this.amount, this.target.maxHp );
        }
    }


    export class PendingDestroy<T extends Minion | Player> extends PermanentState<T, void> {

        init(): PermanentState<T, void> {
            return this;
        }

        apply(): void {
            this.target.flags.pending_destroy = true;
        }
    }

}
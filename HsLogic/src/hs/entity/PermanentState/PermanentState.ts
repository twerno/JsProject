"use strict";

namespace HsLogic {


    export interface PermanentStateClass {
        new ( source: ISource ): PermanentState<any>;
    }

    export abstract class PermanentState<P extends any> {

        param: P;

        isAura: boolean;

        orderOfPlay: number;

        init( param: P, isAura: boolean ): PermanentState<P> {
            this.param = param;
            this.isAura = isAura;
            return this;
        }

        constructor( public source: ISource ) {
            this.orderOfPlay = jsLogic.generateNewId();
        }


        abstract apply( target: ICharacterState ): void;

        onRemovingReplaceWith( target: ICharacterState ): PermanentState<P> {
            return null;
        }
    }



    export class AttackBuff<T extends ICharacterState> extends PermanentState<number> {

        apply( target: ICharacterState ): void {
            target.attack += this.param;
        }
    }


    export class MaxHpBuff extends PermanentState<number> {

        apply( target: ICharacterState ): void {
            if ( this.param !== 0 ) {

                let hpMod: number = Math.max( this.param - target.maxHp, 0 );
                let newHp: number = Math.min( target.hp + hpMod, this.param );

                target.maxHp += this.param;
                target.hp = newHp;
            }
        }

        onRemovingReplaceWith( target: ICharacterState ): PermanentState<any> {
            //if ( target.hp < target.maxHp
            return null;
        }
    }


    export class CharacterHeal extends PermanentState<number> {

        init( param: number, isAura: boolean ): PermanentState<any> {
            return super.init( Math.max( param || 0, 0 ), isAura );
        }

        apply( target: ICharacterState ): void {
            target.hp = Math.min( target.hp + this.param, target.maxHp );
        }
    }


    export class CharacterDamage extends PermanentState<number> {

        init( param: number, isAura: boolean ): PermanentState<any> {
            return super.init( Math.min( param || 0, 0 ), isAura );
        }

        apply( target: ICharacterState ): void {
            target.hp = Math.min( target.hp + this.param, target.maxHp );
        }
    }


    //    export class PendingDestroy extends PermanentState<void> {
    //
    //        apply( target: ICharacterState ): void {
    //            target.flags.pending_destroy = true;
    //        }
    //    }

}
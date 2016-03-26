"use strict";

namespace HsLogic {

	/**
	 *  http://hearthstone.gamepedia.com/Advanced_rulebook#Damage_and_Healing
	 *
	 *  1. Damage calculation
	 *  2. Prevent if damage is 0
	 *  3. If target got a divine shield prevent and remove it
	 *  4. Predamage phase - Bolf Ramshield, Ice Block, Animated Armor
	 *  5. deal damage; if (damage > 0) + event
	 */




    export interface GenDamageParam {
        damageType: Def.DAMAGE_TYPE,
        baseDamage: number
    }

    export interface RandomlySplitDamageParam extends IActionParam {
        damageType: Def.DAMAGE_TYPE,
        splitMode: Def.SPLIT_MODE
        partsAmount: number,
        damagePerPart: number
    }

    export interface DamageParam extends ISingleCharacterParam, GenDamageParam { }

    export interface DealDamageParam extends ITargetsParam, GenDamageParam { }


    /**
     *  QUEUE_TRIGGER_FIRST   - Auchenai Soulpriest
     *  DEFAULT_TRIGGER_LEVEL - Spell Damage/Fallen Heros
     *  QUEUE_TRIGGER_LAST    - Prophet Velens 
     */
    export class OnDamageCalculationEvent<P extends DamageParam> extends ActionEvent<P> {
        static get type(): string { return OnDamageCalculationEvent.name }
    }

    export class OnDamageDealt<P extends DamageParam> extends ActionEvent<P> {
        static get type(): string { return OnDamageDealt.name }
    }




    /**
     * Damage
     *
       */
    export class Damage<P extends DamageParam> extends Action<P> {

        //onBeforeEventBuilder( param: P ): ActionEvent<P> { return new OnDamageCalculationEvent( param ) }
        //onAfterEventBuilder( param: P ): ActionEvent<P> {
        //    if ( !this.param.target.flags.immune )
        //        return new OnDamageDealt( param );
        //    else
        //        return null;
        //}


        resolve( self: Damage<P>, context: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(

                ( resolve, reject ): void => {
                    let param: P = self.param,
                        target: Player | Minion = param.target;

                    if ( target.flags.immune ) {
                        resolve( [] );
                        return;
                    }

                    if ( target.flags.divine_shield ) {
                        target.flags.divine_shield = false;
                        param.baseDamage = 0;
                    }

                    target.hp -= param.baseDamage;

                    resolve( [] );
                }
            );
        }
    }


}
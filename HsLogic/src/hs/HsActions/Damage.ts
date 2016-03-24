///<reference path="../core/HsAction.ts"/>

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


        resolve( self: Damage<P>, gameCtx: HsGameCtx ): PromiseOfActions {
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

    export class DealDamage<P extends DealDamageParam> extends Action<P> {

        resolve( self: DealDamage<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(

                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: Damage<DamageParam>[] = [],
                        target: Player | Minion;

                    for ( let i = 0; i < param.targets.length; i++ ) {
                        if ( param.targets[i] instanceof Player
                            || param.targets[i] instanceof Minion ) {

                            target = <Player | Minion>param.targets[i];

                            actions.push(
                                gameCtx.actionFactory.damage.damage( {
                                    source: param.source,
                                    //                                    sourceType: param.sourceType,
                                    damageType: param.damageType,
                                    target: target,
                                    baseDamage: param.baseDamage
                                })
                            );
                        }
                    }

                    resolve( actions );
                });
        }
    }
}
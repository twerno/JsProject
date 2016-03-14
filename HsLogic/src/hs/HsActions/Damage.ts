///<reference path="../core/HsAction.ts"/>
///<reference path="../../core/action/abstractActions/CancelableAction.ts"/>

"use strict";

namespace HSLogic {

	/**
	 *  http://hearthstone.gamepedia.com/Advanced_rulebook#Damage_and_Healing
	 *
	 *  1. Damage calculation
	 *  2. Prevent if damage is 0
	 *  3. If target got a divine shield prevent and remove it
	 *  4. Predamage phase - Bolf Ramshield, Ice Block, Animated Armor
	 *  5. deal damage; if (damage > 0) + event
	 */


    export enum DAMAGE_TYPE {
        COMBAT, DIRECT, PAY_LIFE, FATIGUE
    }



    /*
     * MINION     + COMBAT
     * MINION     + DIRECT = battlecry, event base effect 
     * SPELL      + DIRECT
     * HERO_POWER + DIRECT = hunter, mage
     * HERO       + COMBAT = druid hero power, waepon
     * 
     */

    export enum SPLIT_MODE {
        MISSILE, MAD_BOMB
    }

    export interface GenDamageParam {
        damageType: DAMAGE_TYPE,
        baseDamage: number
    }

    export interface RandomlySplitDamageParam extends IHsActionParam {
        damageType: DAMAGE_TYPE,
        splitMode: SPLIT_MODE
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
    export class OnDamageCalculationEvent<P extends DamageParam> extends HsActionEvent<P> {
        static get type(): string { return OnDamageCalculationEvent.name }
    }

    export class OnDamageDealt<P extends DamageParam> extends HsActionEvent<P> {
        static get type(): string { return OnDamageDealt.name }
    }


    /**
     * Damage
     *
       */
    export class Damage<P extends DamageParam> extends jsLogic.BroadcastableAction<HsGameCtx, P> {

        onBeforeEventBuilder( param: P ): HsActionEvent<P> { return new OnDamageCalculationEvent( param ) }
        onAfterEventBuilder( param: P ): HsActionEvent<P> {
            if ( !this.param.target.flags.immune )
                return new OnDamageDealt( param );
            else
                return null;
        }


        resolve( _this_: Damage<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(

                ( resolve, reject ): void => {
                    let param: P = _this_.param,
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

    export class DealDamage<P extends DealDamageParam> extends HsAction<P> {

        resolve( _this_: DealDamage<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(

                ( resolve, reject ): void => {
                    let param: P = _this_.param,
                        actions: Damage<DamageParam>[] = [],
                        target: Player | Minion;

                    for ( let i = 0; i < param.targets.length; i++ ) {
                        if ( param.targets[i] instanceof Player
                            || param.targets[i] instanceof Minion ) {

                            target = <Player | Minion>param.targets[i];

                            actions.push(
                                gameCtx.actionFactory.damage.damage( {
                                    source: param.source,
                                    sourceType: param.sourceType,
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
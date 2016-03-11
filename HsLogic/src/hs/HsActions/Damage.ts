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
        COMBAT, DIRECT, PAY_LIFE
    }

    export enum SOURCE_TYPE {
        MINION, SPELL, HERO_POWER, HERO, FATIGUE
    }

    /*
     * MINION     + COMBAT
     * MINION     + DIRECT = battlecry, event base effect 
     * SPELL      + DIRECT
     * HERO_POWER + DIRECT = hunter, mage
     * HERO       + COMBAT = druid hero power, waepon
     * 
     */


	/**
	 *  positive numbers - healing
	 *  negative - damage
	 */
    export interface DamageParam extends HsActionParam {
        damageType: DAMAGE_TYPE,
        sourceType: SOURCE_TYPE,
        target: Player | Minion,
        amount: number,
        cancelDamage: boolean
    }

    export interface DealDamageParam extends HsActionParam {
        damageType: DAMAGE_TYPE,
        sourceType: SOURCE_TYPE,
        targets: (Player | Minion)[],
        amount: number
    }


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

        onBeforeEventBuilder(param: P): HsActionEvent<P> { return new OnDamageCalculationEvent(param) }
        onAfterEventBuilder(param: P): HsActionEvent<P> {
            if (!this.param.target.flags.immune)
                return new OnDamageDealt(param);
            else
                return null;
        }


        resolve(_this_: Damage<P>, gameCtx: HsGameCtx): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(

                (resolve, reject): void => {
                    let param: P = _this_.param,
                        target: Player | Minion = param.target;

                    if (target.flags.immune) {
                        resolve([]);
                        return;
                    }

                    if (target.flags.divine_shield) {
                        target.flags.divine_shield = false;
                        param.amount = 0;
                    }

                    target.hp -= param.amount;

                    resolve([]);
                }
            );
        }
    }

    export class DealDamage<P extends DealDamageParam> extends HsAction<P> {

        resolve(_this_: DealDamage<P>, gameCtx: HsGameCtx): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(

                (resolve, reject): void => {
                    let param: P = _this_.param,
                        actions: Damage<DamageParam>[] = [];

                    for (let i = 0; i < param.targets.length; i++) {
                        actions.push(
                            gameCtx.actionFactory.damage({
                                source: param.source,
                                damageType: param.damageType,
                                sourceType: param.sourceType,
                                target: param.targets[i],
                                amount: param.amount,
                                cancelDamage: false
                            })
                        );
                    }

                    resolve(actions);
                });
        }
    }
}
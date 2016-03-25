"use strict";

namespace HsLogic {


    //    export interface GenDamageParam {
    //        damageType: Def.DAMAGE_TYPE,
    //        baseDamage: number
    //    }
    //
    //    export interface RandomlySplitDamageParam extends IActionParam {
    //        damageType: Def.DAMAGE_TYPE,
    //        splitMode: Def.SPLIT_MODE
    //        partsAmount: number,
    //        damagePerPart: number
    //    }
    //
    //    export interface DamageParam extends ISingleCharacterParam, GenDamageParam { }
    //
    //    export interface DealDamageParam extends ITargetsParam, GenDamageParam { }


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





    export interface DealDamageToTargetsParam extends IActionParam {
        damageType: Def.DAMAGE_TYPE,
        targets: Array<{ target: Character, amount: number }>,
        //targets: { target: Character, amount: number }[],
        calculateDamage?: boolean,
        uniteAction?: boolean
    }


    //export class DealDamageToTargets<P extends HealDamageCalcParam> extends Action<P> {

    //    resolve( self: DealDamageToTargets<P>, gameCtx: HsGameCtx ): PromiseOfActions {

    //        return new Promise<jsLogic.IAction<HsGameCtx>[]>(
    //            ( resolve, reject ): void => {
    //                let param: P = self.param,
    //                    actions: jsLogic.IAction<HsGameCtx>[] = [],
    //                    healDamagePower: number = gameCtx.powerMgr.get( param );

    //                param.finalValue = param.baseAmount;

    //                if ( param.internalHealDamagePowerCalc )
    //                    param.finalValue += param.internalHealDamagePowerCalc( healDamagePower );
    //                else
    //                    param.finalValue += healDamagePower;


    //                actions.push( new DispatchEvent(
    //                    new event.PostHealDamageCalculate( param ) ) );

    //                resolve( actions );
    //            }
    //        ); // return new Promise

    //    } // resolve(self: HealDamageCalc

    //} // export class HealDamageCalc

}
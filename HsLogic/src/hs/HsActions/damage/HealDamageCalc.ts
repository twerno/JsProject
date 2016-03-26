"use strict";

namespace HsLogic {

    export namespace event {
        export class PostHealDamageCalculate extends ActionEvent<HealDamageCalcParam> { }
    }


    export enum HealDamageMode { HEAL, DAMAGE }


    export interface HealDamageCalcParam extends IActionParam {
        healDamageMode: HealDamageMode,
        damageType: Def.DAMAGE_TYPE,
        baseAmount: number,
        finalValue: number,
        internalHealDamagePowerCalc: ( basePower: number ) => number
    }



    //export class HealDamageCalc<P extends HealDamageCalcParam> extends Action<P> {

    //    resolve( self: HealDamageCalc<P>, context: HsGameCtx ): PromiseOfActions {

    //        return new Promise<ActionType | ActionType[]>(
    //            ( resolve, reject ): void => {
    //                let param: P = self.param,
    //                    actions: ActionType[] = [];
    //                //healDamagePower: number = context.powerMgr.getDamagePower( param );

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
///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HsLogic {

    export interface HealParam extends IActionParam {
        cancelHeal: boolean,
        amount: number,
        target: Character,
    }


    export class HealCalculationEvent<P extends HealParam> extends ActionEvent<P> { }
    export class OnAfterHealEvent<P extends HealParam> extends ActionEvent<P> { }




    /**
     * Heal
     *
     */
    export class Heal<P extends HealParam> extends Action<P> {

        //cancelAction( eventParam: P ): boolean { return eventParam.cancelHeal }
        //cancelOnAfterEvent( eventParam: P ): boolean { return false }

        //onBeforeEventBuilder( eventParam: P ): ActionEvent<P> { return new HealCalculationEvent( eventParam ) }
        //onAfterEventBuilder( eventParam: P ): ActionEvent<P> { return new OnAfterHealEvent( eventParam ) }


        resolve( self: Heal<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(

                ( resolve, reject ): void => {
                    let param: P = self.param,
                        targetCounters: jsLogic.CounterMap = param.target.counters;

                    if ( targetCounters[DivineShieldCounter.type] ) {
                        delete targetCounters[DivineShieldCounter.type];
                        param.amount = 0;
                    }

                    param.target.hp -= param.amount;

                    return null;
                });
        }
    }
}
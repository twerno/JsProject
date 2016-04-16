/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {

    export class MultistepDamage<P extends MultistepDamageParam> extends Action<P> {

        resolve( self: MultistepDamage<P>, context: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];

                    for ( let i = 0; i < param.steps.length; i++ ) {
                        param.steps[i].notifyMode = param.notifyEventMode;

                        actions.push( new CalculateAndDealDamage( param.steps[i] ) );
                    }

                    if ( param.notifyEventMode === NOTIFY_MODE.AFTER_ALL_STEPS )
                        actions.push( new DispatchSavedEvents( event.Damage, context ) );

                    resolve( actions );
                }
            ); // return new Promise

        } // resolve(self: MultistepDamage

    } // export class MultistepDamage

}
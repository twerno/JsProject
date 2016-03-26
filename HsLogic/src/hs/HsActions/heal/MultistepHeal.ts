"use strict";

namespace HsLogic {

    export class MultistepHeal<P extends MultistepHealParam> extends Action<P> {

        resolve( self: MultistepHeal<P>, context: HsGameCtx ): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: jsLogic.IAction<HsGameCtx>[] = [];

                    for ( let i = 0; i < param.steps.length; i++ ) {
                        param.steps[i].notifyMode = param.notifyEventMode;

                        actions.push( new Heal( param.steps[i] ) );
                    }

                    if ( param.notifyEventMode === NOTIFY_MODE.AFTER_ALL_STEPS )
                        actions.push( new DispatchSavedEvents( event.TargetHealed, context ) );

                    resolve( actions );
                }
            ); // return new Promise

        } // resolve(self: MultistepHeal

    } // export class MultistepHeal

}
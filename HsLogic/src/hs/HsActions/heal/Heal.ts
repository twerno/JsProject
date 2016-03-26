"use strict";

namespace HsLogic {

    /**
     * Heal
     * Calculate and Heal - single step
     *
     */
    export class Heal<P extends HealParam> extends Action<P> {

        resolve( self: Heal<P>, context: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];

                    for ( let i = 0; i < param.targets.length; i++ )
                        param.targets[i].healed = 0;

                    param.amount = Math.max( param.amount, 0 );


                    // Auchenai Soulpriest
                    actions.push( new event.PreHealCalculationEvent( param ).dispatch( context ) );


                    // calculate heal
                    actions.push( new InlineAction(( resolve, reject ): void => {
                        if ( param.cancelAction.value )
                            return;

                        param.amount += context.powerMgr.getHealPower( param.source );

                        // Prophet Velens
                        resolve( new event.PostHealCalculationEvent( param ).dispatch( context ) );
                    }) );


                    actions.push( new InternalHeal( param ) );


                    resolve( actions );
                }
            ); // return new Promise

        } // resolve(self: Heal

    } // export class Heal




    /**
     * InternalHeal
     *
     */
    class InternalHeal<P extends HealParam> extends Action<P> {

        resolvable( context: HsGameCtx ): boolean {
            return !this.param.cancelAction.value;
        }


        resolve( self: InternalHeal<P>, context: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [],
                        postActions: ActionType[] = [];

                    for ( let i = 0; i < param.targets.length; i++ ) {
                        let targetParam: HealedParam = param.targets[i],
                            target: Character = targetParam.target;

                        actions.push( new InlineAction(
                            ( resolve, reject ): void => {

                                targetParam.healed = Math.max( target.hp + param.amount, target.maxHp ) - target.maxHp;
                                target.hp += targetParam.healed;

                                resolve( jsLogic.NO_CONSEQUENCES );
                            }) );


                        if ( !param.notifyMode || param.notifyMode === NOTIFY_MODE.AFTER_EVERY_ACTION )
                            actions.push( new event.TargetHealed( targetParam ).dispatch( context ) );

                        else if ( param.notifyMode === NOTIFY_MODE.AFTER_ALL_ACTIONS )
                            postActions.push( new event.TargetHealed( targetParam ).dispatch( context ) );
                    }

                    resolve( actions.concat( postActions ) );
                }
            ); // return new Promise

        } // resolve(self: InternalHealTargets

    } // class InternalHealTargets

}
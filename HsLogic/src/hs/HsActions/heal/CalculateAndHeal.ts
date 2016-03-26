"use strict";

namespace HsLogic {

    /**
     * Heal
     * Calculate and Heal - single step
     *
     */
    export class CalculateAndHeal<P extends HealTargetsParam> extends Action<P> {

        resolve( self: CalculateAndHeal<P>, context: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];

                    actions.push( new CalculateHeal( param ) );


                    for ( let i = 0; i < param.targets.length; i++ ) {
                        actions.push( new Heal( {
                            source: param.source,

                            target: param.targets[i],
                            amount: param.amount,

                            healState: HEAL_STATE.PENDING,
                            notifyMode: param.notifyMode
                        }) );
                    }


                    if ( param.notifyMode = NOTIFY_MODE.AFTER_ALL_ACTIONS )
                        actions.push( new DispatchSavedEvents( event.Heal, context ) );


                    resolve( actions );
                }
            ); // return new Promise

        } // resolve(self: CalculateAndHeal

    } // export class CalculateAndHeal





    /**
     * Heal
     *
     */
    class CalculateHeal<P extends HealTargetsParam> extends Action<P> {

        resolve( self: CalculateHeal<P>, context: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];

                    param.amount = Math.max( param.amount, 0 );


                    // Auchenai Soulpriest
                    actions.push( new event.PreHealCalculationEvent( param ).dispatch( context ) );


                    // calculate heal
                    actions.push( new InlineAction(
                        ( resolve, reject ): void => {

                            if ( param.customHealPower )
                                param.amount += param.customHealPower( param, context );
                            else
                                param.amount += context.powerMgr.getHealPower( param.source );

                            resolve( jsLogic.NO_CONSEQUENCES );
                        }
                    ) );


                    // Prophet Velens
                    actions.push( new event.PostHealCalculationEvent( param ).dispatch( context ) );

                    resolve( actions );
                }
            ); // return new Promise

        } // resolve(self: CalculateHeal

    } // class CalculateHeal



    /**
     * Heal
     *
     */
    class Heal<P extends HealParam> extends Action<P> {

        resolve( self: Heal<P>, context: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];

                    param.amount = Math.max( 0, param.amount );

                    actions.push( new event.PreHealPhase( param ).dispatch( context ) );

                    actions.push( new InternalHeal( param ) );

                    actions.push( new event.Heal( param )
                        .dispatchOrSave( context, (): boolean => { return param.notifyMode === NOTIFY_MODE.AFTER_EVERY_ACTION })
                    );

                    resolve( actions );
                }
            ); // return new Promise

        } // resolve(self: Heal

    } // class Heal



    /**
     * InternalHeal
     *
     */
    class InternalHeal<P extends HealParam> extends Action<P> {

        resolve( self: InternalHeal<P>, context: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        target: Character = param.target;

                    param.healState = HEAL_STATE.HEALED;

                    param.amount = Math.max( target.hp + param.amount, target.maxHp ) - target.maxHp;

                    if ( param.target.flags.immune ) {
                        param.amount = 0;
                        param.healState = HEAL_STATE.PREVENTED;
                    }

                    target.hp += param.amount;

                    resolve( jsLogic.NO_CONSEQUENCES );
                }
            ); // return new Promise

        } // resolve(self: InternalHeal

    } // class InternalHeal

}
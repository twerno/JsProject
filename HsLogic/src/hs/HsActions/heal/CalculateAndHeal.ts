/// <reference path="../../core/action.ts" />
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

                    param.healState = HEAL_STATE.PENDING;
                    param.notifyMode = param.notifyMode || NOTIFY_MODE.AFTER_EVERY_ACTION;

                    actions.push( new CalculateHeal( param ) );

                    actions.push( new InlineAction(( responce, reject ): void => {
                        let actions: ActionType[] = [];

                        for ( let i = 0; i < param.targets.length; i++ ) {
                            actions.push( new Heal( {
                                source: param.source,

                                target: param.targets[i],
                                amount: param.amount,

                                healState: HEAL_STATE.PENDING,
                                notifyMode: param.notifyMode
                            }) );
                        }
                        resolve( actions );
                    }) );


                    if ( param.notifyMode = NOTIFY_MODE.AFTER_ALL_ACTIONS )
                        actions.push( new DispatchSavedEvents( event.Heal, context ) );

                    resolve( actions );
                }
            ); // return new Promise

        } // resolve(self: CalculateAndHeal

    } // export class CalculateAndHeal





    /**
     * CalculateHeal
     *
     */
    export class CalculateHeal<P extends CalculateHealParam> extends Action<P> {

        resolve( self: CalculateHeal<P>, context: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];

                    param.amount = Math.max( param.amount, 0 );


                    // Auchenai Soulpriest
                    actions.push( new event.PreHealCalculationEvent( param ).dispatch( context ) );


                    // calculate heal
                    actions.push( new InlineActionExt(
                        (): boolean => {
                            return !param.cancelAction.value
                        },
                        ( resolve, reject ): void => {

                            if ( param.customHealPowerCalculator )
                                param.amount = param.customHealPowerCalculator( param, context );
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
    export class Heal<P extends HealParam> extends Action<P> {

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

                    param.amount = Math.max( target.body.hp() + param.amount, target.body.health ) - target.body.health;

                    if ( param.target.tags.has( Def.Immune_Tag ) ) {
                        param.amount = 0;
                        param.healState = HEAL_STATE.PREVENTED;
                    }

                    param.target.body.damages = Math.max( 0, param.target.body.damages - param.amount );

                    resolve( jsLogic.NO_CONSEQUENCES );
                }
            ); // return new Promise

        } // resolve(self: InternalHeal

    } // class InternalHeal

}
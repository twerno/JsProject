/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {

	/**
	 *  http://hearthstone.gamepedia.com/Advanced_rulebook#Damage_and_Healing
	 *
	 *  1. Damage calculation
	 *  2. Prevent if damage is 0
	 *  3. If target got a divine shield prevent and remove it
	 *  4. Predamage phase - Bolf Ramshield, Ice Block, Animated Armor
	 *  5. deal damage; if (damage > 0) + event
	 */



    /**
     * CalculateAndDamage
     *
     */
    export class CalculateAndDealDamage<P extends DamageTargetsParam> extends Action<P> {

        resolve( self: CalculateAndDealDamage<P>, context: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];

                    param.damageState = DAMAGE_STATE.PENDING;
                    param.notifyMode = param.notifyMode || NOTIFY_MODE.AFTER_EVERY_ACTION;

                    actions.push( new CalculateDamage( param ) );

                    actions.push( new InlineAction(( resolve, reject ): void => {
                        let innerActions: ActionType[] = [];

                        for ( let i = 0; i < param.targets.length; i++ ) {
                            innerActions.push( new Damage( {
                                source: param.source,
                                damageType: param.damageType,

                                target: param.targets[i],
                                amount: param.amount,

                                damageState: DAMAGE_STATE.PENDING,
                                notifyMode: param.notifyMode
                            }) );
                        }

                        resolve( innerActions );
                    }) );

                    if ( param.notifyMode = NOTIFY_MODE.AFTER_ALL_ACTIONS )
                        actions.push( new DispatchSavedEvents( event.Damage, context ) );

                    resolve( actions );
                }
            ); // return new Promise

        } // resolve(self: CalculateAndDealDamage

    }  // class CalculateAndDealDamage





    /**
     * CalculateDamage
     *
     */
    export class CalculateDamage<P extends CalculateDamageParam> extends Action<P> {

        resolve( self: CalculateDamage<P>, context: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];


                    actions.push( new event.PreDamageCalculationEvent( param ).dispatch( context ) );


                    // calculate damage
                    actions.push( new InlineAction(
                        ( resolve, reject ): void => {

                            if ( param.customDamagePower )
                                param.amount += param.customDamagePower( param, context );
                            else
                                param.amount += context.powerMgr.getDamagePower( param.source, param.damageType );

                            resolve( jsLogic.NO_CONSEQUENCES );
                        }
                    ) );


                    // Prophet Velens
                    actions.push( new event.PostDamageCalculationEvent( param ).dispatch( context ) );


                    resolve( actions );
                }
            ); // return new Promise

        } // resolve(self: CalculateDamage

    }  // class CalculateDamage






    /**
     * Damage
     *
     */
    export class Damage<P extends DamageParam> extends Action<P> {

        resolve( self: Damage<P>, context: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];

                    param.amount = Math.max( 0, param.amount );

                    actions.push( new event.PreDamagePhase( param ).dispatch( context ) );

                    actions.push( new InternalDamage( param ) );

                    actions.push( new event.Damage( param )
                        .dispatchOrSave( context,
                        (): boolean => { return param.notifyMode === NOTIFY_MODE.AFTER_EVERY_ACTION })
                    );

                    resolve( actions );
                }
            ); // return new Promise

        } // resolve(self: Damage

    } // class Damage





    /**
     * InternalDamage
     *
     */
    class InternalDamage<P extends DamageParam> extends Action<P> {

        resolve( self: InternalDamage<P>, context: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param;

                    param.damageState = DAMAGE_STATE.DEALT;

                    if ( param.target.tags.has( Def.Immune_Tag ) ) {
                        param.amount = 0;
                        param.damageState = DAMAGE_STATE.PREVENTED;
                    }

                    if ( param.amount > 0 && param.target.tags.has( Def.Divine_Shield_Tag ) ) {
                        param.amount = 0;
                        param.target.tags.removeAll( Def.Divine_Shield_Tag );
                    }

                    if ( param.target.body.hp() > 0 && param.target.body.hp() - param.amount <= 0 )
                        context.lethalMonitor.registerCandidate( param.target, param.source );

                    if ( param.source.sourceCard instanceof Minion && param.damageState !== DAMAGE_STATE.PREVENTED )
                        ( <Minion>param.source.sourceCard ).tags.removeAll( Def.Stealth_Tag );

                    param.target.body.damages = Math.max( 0, param.target.body.damages + param.amount );

                    resolve( jsLogic.NO_CONSEQUENCES );
                }
            );   // return new Promise

        } // resolve(self: InternalDamage

    } // class InternalDamage

}
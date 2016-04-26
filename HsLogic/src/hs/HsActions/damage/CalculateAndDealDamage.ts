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

        resolve( self: CalculateAndDealDamage<P>, gameCtx: HsGameCtx ): PromiseOfActions {

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

                    if ( param.notifyMode === NOTIFY_MODE.AFTER_ALL_ACTIONS )
                        actions.push( new DispatchSavedEvents( event.Damage, gameCtx ) );

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

        resolve( self: CalculateDamage<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];


                    actions.push( new event.PreDamageCalculationEvent( param ).dispatch( gameCtx ) );


                    // calculate damage
                    actions.push( new InlineAction(
                        ( resolve, reject ): void => {

                            if ( param.customDamagePower )
                                param.amount += param.customDamagePower( param, gameCtx );
                            else
                                param.amount += gameCtx.powerMgr.damagePower( param.source, param.damageType );

                            resolve( jsAction.NO_CONSEQUENCES );
                        }
                    ) );


                    // Prophet Velens
                    actions.push( new event.PostDamageCalculationEvent( param ).dispatch( gameCtx ) );


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

        resolve( self: Damage<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];

                    param.amount = Math.max( 0, param.amount );

                    actions.push( new event.PreDamagePhase( param ).dispatch( gameCtx ) );

                    actions.push( new InternalDamage( param ) );

                    actions.push( new event.Damage( param )
                        .dispatchOrSave( gameCtx,
                        (): boolean => {
                            return param.notifyMode === NOTIFY_MODE.AFTER_EVERY_ACTION
                        })
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

        resolve( self: InternalDamage<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param;

                    param.damageState = DAMAGE_STATE.DEALT;
                    param.amount = Math.abs( param.amount );

                    if ( param.target.tags.contains( Def.Immune_Tag ) ) {
                        param.amount = 0;
                        param.damageState = DAMAGE_STATE.PREVENTED;
                    }

                    if ( param.amount > 0 && param.target.tags.contains( Def.Divine_Shield_Tag ) ) {
                        param.amount = 0;
                        param.target.tags.removeAll( Def.Divine_Shield_Tag );
                    }

                    if ( param.target.body.hp() > 0 && param.target.body.hp() - param.amount <= 0 )
                        gameCtx.lethalMonitor.registerCandidate( param.target, param.source );

                    if ( param.source.entity instanceof Minion && param.damageState !== DAMAGE_STATE.PREVENTED )
                        ( <Minion>param.source.entity ).tags.removeAll( Def.Stealth_Tag );

                    let armorDamages: number = Math.min( param.amount, param.target.body.armor );
                    param.target.body.armor -= armorDamages;
                    param.target.body.damages += param.amount - armorDamages;

                    resolve( jsAction.NO_CONSEQUENCES );
                }
            );   // return new Promise

        } // resolve(self: InternalDamage

    } // class InternalDamage

}
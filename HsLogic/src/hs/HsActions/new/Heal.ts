"use strict";

namespace HsLogic {


    export interface HealedParam extends IActionParam {
        target: Character,
        healed: number
    }


    export interface HealTargetsParam extends IHsCancelableParam {
        targets: HealedParam[],
        amount: number,
        uniteAction?: boolean
    }


    export namespace event {

        export class PreHealCalculationEvent<P extends HealTargetsParam> extends ActionEvent<P> { }

        export class PostHealCalculationEvent<P extends HealTargetsParam> extends ActionEvent<P> { }

        export class TargetHealed<P extends HealedParam> extends ActionEvent<P> { }
    }



    /**
     * CalculateAndHeal
     *
     */
    export class CalculateAndHeal<P extends HealTargetsParam> extends Action<P> {

        resolve( self: CalculateAndHeal<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: jsLogic.IAction<HsGameCtx>[] = [];

                    for ( let i = 0; i < param.targets.length; i++ )
                        param.targets[i].healed = 0;


                    // Auchenai Soulpriest
                    actions.push( new DispatchEvent( new event.PreHealCalculationEvent( param ) ) );


                    // calculate heal
                    actions.push( new InlineAction(( resolve, reject ): void => {
                        if ( param.cancelAction.value )
                            return;

                        param.amount += gameCtx.powerMgr.getHealPower( param.source );

                        // Prophet Velens
                        resolve( new DispatchEvent( new event.PostHealCalculationEvent( param ) ) );
                    }) );


                    actions.push( new Heal( param ) );

                    resolve( actions );
                }
            ); // return new Promise

        } // resolve(self: CalculateAndHeal

    } // export class CalculateAndHeal



    /**
     * Heal
     *
     */
    class Heal<P extends HealTargetsParam> extends Action<P> {

        resolvable( context: HsGameCtx ): boolean {
            return !this.param.cancelAction.value;
        }

        resolve( self: Heal<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: jsLogic.IAction<HsGameCtx>[] = [],
                        postActions: jsLogic.IAction<HsGameCtx>[] = [];

                    param.amount = Math.max( param.amount, 0 );

                    for ( let i = 0; i < param.targets.length; i++ ) {
                        let healParam: HealedParam = param.targets[i],
                            target: Character = healParam.target;

                        actions.push( new InlineAction(
                            ( resolve, reject ): void => {

                                healParam.healed = Math.max( target.hp + param.amount, target.maxHp ) - target.maxHp;
                                target.hp += healParam.healed;

                                resolve( jsLogic.NO_CONSEQUENCES );
                            }) );


                        if ( param.uniteAction )
                            postActions.push( new DispatchEvent( new event.TargetHealed( healParam ) ) );
                        else
                            actions.push( new DispatchEvent( new event.TargetHealed( healParam ) ) );
                    }

                    resolve( actions.concat( postActions ) );
                }
            ); // return new Promise

        } // resolve(self: Heal

    } // class Heal
}
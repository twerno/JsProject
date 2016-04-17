/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {



    /**
     * CalculateAndSplitDamage
     *
     */
    export class CalculateAndSplitHeal<P extends SplitHealParam> extends Action<P> {

        resolve( self: CalculateAndSplitHeal<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];

                    actions.push( new CalculateHeal( param ) );

                    actions.push( new InlineActionExt(
                        (): boolean => { return !param.cancelAction.value },
                        ( resolve, reject ): void => {
                            let innerActions: ActionType[] = [];

                            for ( let i = 0; i < param.amount; i++ )
                                innerActions.push( new SplitHeal( param ) );

                            resolve( innerActions );
                        }) );

                    resolve( actions );
                }
            ); // return new Promise

        } // resolve(self: CalculateAndSplitDamage

    }  // class CalculateAndSplitDamage



    /**
	 * SplitHeal
	 *
	 */
    class SplitHeal<P extends SplitHealParam> extends Action<P> {

        resolve( self: SplitHeal<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [],
                        target: Character,
                        availableTargets: Character[];

                    availableTargets = splitMode2TargetSetBuilder( param.splitMode, param.source )
                        .buildSet( param.source, gameCtx );

                    target = MathUtils.selectOneAtRandom<Character>( availableTargets );

                    if ( target )
                        actions.push( new Heal( {
                            source: param.source,

                            target: target,
                            amount: 1,

                            healState: HEAL_STATE.PENDING,
                            notifyMode: NOTIFY_MODE.AFTER_EVERY_ACTION
                        }) );

                    resolve( actions );
                }
            ); // return new Promise

        } // resolve(self: SplitHeal

    } // class SplitHeal

}
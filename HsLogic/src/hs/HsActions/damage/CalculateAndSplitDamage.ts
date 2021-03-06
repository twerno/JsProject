/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {



    /**
     * CalculateAndSplitDamage
     *
     */
    export class CalculateAndSplitDamage<P extends SplitDamageParam> extends Action<P> {

        resolve( self: CalculateAndSplitDamage<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];

                    actions.push( gameCtx.techActionFactory.calculateDamage( param ) );

                    actions.push( new InlineAction(( resolve, reject ): void => {
                        let innerActions: ActionType[] = [];

                        for ( let i = 0; i < param.amount; i++ )
                            innerActions.push( gameCtx.techActionFactory.splitDamage( param ) );

                        resolve( innerActions );
                    }) );

                    resolve( actions );
                }
            ); // return new Promise

        } // resolve(self: CalculateAndSplitDamage

    }  // class CalculateAndSplitDamage



    /**
	 * SplitDamage
	 *
	 */
    export class SplitDamage<P extends SplitDamageParam> extends Action<P> {

        resolve( self: SplitDamage<P>, gameCtx: HsGameCtx ): PromiseOfActions {

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
                        actions.push( gameCtx.techActionFactory.damage( {
                            source: param.source,
                            damageType: param.damageType,

                            target: target,
                            amount: 1,

                            damageState: DAMAGE_STATE.PENDING,
                            notifyMode: NOTIFY_MODE.AFTER_EVERY_ACTION
                        }) );

                    resolve( actions );
                }
            ); // return new Promise

        } // resolve(self: SplitDamage

    } // class SplitDamage


    export function splitMode2TargetSetBuilder( splitMode: Def.SPLIT_MODE, source: ISource ): Def.ISetBuilder<Character> {

        if ( splitMode === Def.SPLIT_MODE.ARCANE_MISSILE )
            return Def.TargetFinder.ENEMY_CHARACTER
                .addFilter(( source, entity, gameCtx ): boolean => {
                    return entity instanceof Hero
                        || ( entity instanceof Minion && entity.body.hp() > 0 );
                });

        else if ( splitMode === Def.SPLIT_MODE.MAD_BOMB )
            return Def.TargetFinder.ANY_CHARACTER
                .addFilter( Def.Filter.OtherThan( source.entity ) )
                .addFilter(( source, entity, gameCtx ): boolean => {
                    return entity instanceof Hero
                        || ( entity instanceof Minion && entity.body.hp() > 0 );
                });

        else if ( splitMode === Def.SPLIT_MODE.ARCANE_HEAL )
            return Def.TargetFinder.FRIENDLY_CHARACTER
                .addFilter(( source, entity, gameCtx ): boolean => {
                    return entity instanceof Hero
                        || ( entity instanceof Minion && entity.body.damages > 0 );
                });

        else
            throw new Error( `Unknown SPLIT_MODE ${splitMode}!` );
    }
}
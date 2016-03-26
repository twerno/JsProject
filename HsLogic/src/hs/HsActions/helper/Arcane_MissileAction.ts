"use strict";

namespace HsLogic {

    export class Arcane_MissileAction<P extends IActionParam> extends Action<P> {

        static availableTargers(): Def.IDefSetBuilder {
            return Def.SetBuilderHelper.BATTLEFIELD
                .addFilter( Def.StandardFilters.enemy )
                .addFilter( Def.StandardFilters.character )
                .addFilter(( source, entity, context ): boolean => {
                    return entity instanceof Player
                        || entity instanceof Minion && entity.hp > 0;
                });
        }

        resolve( self: Arcane_MissileAction<P>, context: HsGameCtx ): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        availableTargers: HsEntity[] = Arcane_MissileAction.availableTargers().buildSet( param.source, context ),
                        resultSet: ( Player | Minion )[];

                    resolve( [
                        new MakeChoiceAtRandom( {
                            source: param.source,
                            require: REQUIRE.YES,
                            props: { amount: 1, withRepetitions: false },
                            sets: { source: availableTargers, result: resultSet }
                        }),

                        new jsLogic.InlineAction(( resolve, reject ): void => {
                            resolve( [
                                context.actionFactory.damage.dealDamage( {
                                    source: param.source,
                                    damageType: Def.DAMAGE_TYPE.DIRECT,
                                    baseDamage: 1,
                                    targets: resultSet
                                })] );
                        })
                    ] );
                });
        }
    }
}
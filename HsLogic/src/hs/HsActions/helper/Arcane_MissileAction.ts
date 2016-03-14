"use strict";

namespace HSLogic {

    export class Arcane_MissileAction<P extends IHsActionParam> extends HsAction<P> {

        static availableTargers(): Def.IDefTarget {
            return Def.DefTargetHelper.BATTLEFIELD
                .addFilter( Def.StandardFilters.enemy )
                .addFilter( Def.StandardFilters.character )
                .addFilter(( source, entity, gameCtx ): boolean => {
                    return entity instanceof Player
                        || entity instanceof Minion && entity.hp > 0;
                });
        }

        resolve( _this_: Arcane_MissileAction<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = _this_.param,
                        availableTargers: HsEntity[] = Arcane_MissileAction.availableTargers().buildSet( param.source, gameCtx ),
                        resultSet: ( Player | Minion )[];

                    resolve( [
                        new MakeAChoiceAtRandom( {
                            source: param.source,
                            require: REQUIRE.YES,
                            props: { amount: 1, withRepetitions: false },
                            sets: { source: availableTargers, result: resultSet }
                        }),

                        new jsLogic.InlineAction(( resolve, reject ): void => {
                            resolve( [
                                gameCtx.actionFactory.damage.dealDamage( {
                                    source: param.source,
                                    damageType: DAMAGE_TYPE.DIRECT,
                                    baseDamage: 1,
                                    targets: resultSet
                                })] );
                        })
                    ] );
                });
        }
    }
}
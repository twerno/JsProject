"use strict";

namespace HSLogic {

    export class Arcane_MissileAction<P extends HsActionParam> extends HsAction<P> {

        static sourceSetBuilder(): IDefTargetSetBuilder {
            return DefTargetSetBuilder.ENEMY.CHARACTER
                .addFilter(
                (caller, card, gameCtx): boolean => {
                    return (card instanceof Player)
                        || (card instanceof Minion && card.hp > 0);
                });
        }

        resolve(_this_: Arcane_MissileAction<P>, gameCtx: HsGameCtx): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                (resolve, reject): void => {
                    let param: P = _this_.param,
                        sourceSet: HsEntity[] = Arcane_MissileAction.sourceSetBuilder().buildSet(param.source, gameCtx),
                        resultSet: (Player | Minion)[];

                    resolve([
                        new MakeAChoiceAtRandom({
                            source: param.source,
                            require: REQUIRE.YES,
                            props: { amount: 1, withRepetitions: false },
                            sets: { source: sourceSet, result: resultSet }
                        }),

                        new jsLogic.InlineAction((resolve, reject): void => {
                            resolve([
                                gameCtx.actionFactory.damage.dealDamage({
                                    source: param.source,
                                    sourceType: SOURCE_TYPE.SPELL,
                                    damageType: DAMAGE_TYPE.DIRECT,
                                    baseDamage: 1,
                                    targets: resultSet
                                })]);
                        })
                    ]);
                });
        }
    }
}
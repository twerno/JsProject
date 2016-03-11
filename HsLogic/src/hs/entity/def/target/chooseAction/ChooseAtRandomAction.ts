"use strict";

namespace HSLogic {

    export interface MakeAChoiceAtRandomParam extends ChooseActionParam {
        props: MathUtils.ISelectAtRandomProperties
    }


    /**
     * ChooseAtRandomMethod
     *
 	 */
    export class MakeAChoiceAtRandom<P extends MakeAChoiceAtRandomParam> extends ChooseAction<P> {
        resolve(_this_: MakeAChoiceAtRandom<P>, gameCtx: HsGameCtx): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                (resolve, reject): void => {
                    let param: P = _this_.param;

                    param.resultSet = MathUtils.selectAtRandom<HsEntity>(param.sourceSet, param.props);

                    resolve(jsLogic.NO_CONSEQUENCES);
                });
        }

        static buildAction<P extends MakeAChoiceAtRandomParam>(param: P): MakeAChoiceAtRandom<P> {
            return new MakeAChoiceAtRandom(param);
        }
    }


    // targetless action
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
                        resultSet: HsEntity[];

                    resolve([
                        new MakeAChoiceAtRandom({
                            source: param.source,
                            props: { amount: 1, withRepetitions: false },
                            resultSet: resultSet,
                            sourceSet: sourceSet
                        }),

                        gameCtx.actionFactory.damage({
                            //new Damage<DamageParam>({
                            source: param.source,
                            sourceType: SOURCE_TYPE.SPELL,
                            damageType: DAMAGE_TYPE.DIRECT,
                            amount: 1,
                            target: null, //resultSet[0], // blad!!! resultSet nie zostal jeszcze wybudowany
                            cancelDamage: false
                        })
                    ]);
                });
        }
    }
}
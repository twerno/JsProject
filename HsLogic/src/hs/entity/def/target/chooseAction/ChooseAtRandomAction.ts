"use strict";

namespace HSLogic {

    export interface ChooseAtRandomParam extends ChooseActionParam {
        props: MathUtils.ISelectAtRandomProperties
    }


    /**
     * ChooseAtRandomMethod
     *
 	 */
    export class ChooseAtRandomAction<P extends ChooseAtRandomParam> extends ChooseAction<P> {
        resolve(_this_: ChooseAtRandomAction<P>, gameCtx: HsGameCtx): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                (resolve, reject): void => {
                    let param: P = _this_.param;

                    param.resultSet = MathUtils.selectAtRandom<HsEntity>(param.sourceSet, param.props);

                    resolve(jsLogic.NO_CONSEQUENCES);
                });
        }

        static buildAction<P extends ChooseAtRandomParam>(param: P): ChooseAtRandomAction<P> {
            return new ChooseAtRandomAction(param);
        }
    }

    export abstract class Magic_MissileChooseTargetAction<P extends ChooseAtRandomParam> extends ChooseAtRandomAction<P> {
    }



    export interface Arcane_MissileParam extends ChooseActionParam {
        caller: Player
    }


    // targetless action
    export class Arcane_MissileAction<P extends Arcane_MissileParam> extends HsAction<P> {

        resolve(_this_: Arcane_MissileAction<P>, gameCtx: HsGameCtx): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                (resolve, reject): void => {
                    let param: P = _this_.param;

                    let sourceSet: HsEntity[] = DefTargetSetBuilder.ENEMY.CHARACTER
                        .addFilter(
                        (caller, card, gameCtx): boolean => {
                            return (card instanceof Player)
                                || (card instanceof Minion && card.hp > 0);
                        }).buildSet(param.caller, gameCtx);

                    let chooseParam: ChooseAtRandomParam = {
                        source: param.source,
                        props: { amount: 1, withRepetitions: false },
                        resultSet: [],
                        sourceSet: sourceSet
                    };

                    //let actions: jsLogic.IAction<HsGameCtx>[] = [new ChooseAtRandomAction(chooseParam)];

                    //for (let i = 0; i <

                    resolve([
                        new ChooseAtRandomAction(chooseParam),
                        new Damage<DamageParam>({
                            source: param.source,
                            sourceType: SOURCE_TYPE.SPELL,
                            damageType: DAMAGE_TYPE.DIRECT,
                            amount: 1,
                            target: chooseParam.resultSet[0],
                            cancelDamage: false
                        })
                    ]);
                });
        }
    }
}
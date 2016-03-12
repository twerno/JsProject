///<reference path="../../core/HsAction.ts"/>
///<reference path="../../../core/action/abstractActions/CancelableAction.ts"/>

"use strict";

namespace HSLogic {



    export interface IAcquireTargetsParam extends HsActionParam {
        cardActions: ICardActionDefs,
        sets: Array<IChooseActionParamSets>,
        amount: number,
        require: REQUIRE,
        cancelAction?: { value: boolean }
    }


    /**
     * AcquireTargets
     *
       */
    export class AcquireTargets extends HsAction<IAcquireTargetsParam> {


        static buildChooseActionParam(param: IAcquireTargetsParam,
            cardAction: ITargetedCardActionDef<HsGameCtx, ChooseActionParam>,
            gameCtx: HsGameCtx): ChooseActionParam {
            return {
                source: param.source,
                sets: {
                    source: cardAction.availableTargets.buildSet(param.source, gameCtx),
                    result: []
                },

                //amount: param.amount,
                require: param.require,
                cancelAction: param.cancelAction
            };
        }

        resolve(_this_: AcquireTargets, gameCtx: HsGameCtx): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(

                (resolve, reject): void => {
                    let param: IAcquireTargetsParam = _this_.param,
                        actions: jsLogic.IAction<HsGameCtx>[] = [],
                        targetedActionDef: ITargetedCardActionDef<HsGameCtx, ChooseActionParam>;

                    param.sets = new Array<IChooseActionParamSets>(param.cardActions.length);

                    for (let i = 0; i < param.cardActions.length; i++) {
                        let cardAction: ICardActionDef = param.cardActions[i];

                        if (param.cancelAction.value)
                            break;

                        if (isTargetedCardActionDef(cardAction)) {
                            let paramTmp: ChooseActionParam = AcquireTargets.buildChooseActionParam(param, cardAction, gameCtx);
                            param.sets[i] = paramTmp.sets;

                            if (param.require === REQUIRE.YES && paramTmp.sets.source.length < param.amount) {
                                param.cancelAction.value = true;
                                break;
                            }

                            actions.push(
                                cardAction.makeAChoice(paramTmp, gameCtx));

                            actions.push(
                                new jsLogic.InlineAction((resolve, reject) => {
                                    if (param.cancelAction.value === false
                                        && !cardAction.validateChoosen(paramTmp, gameCtx))
                                        reject(new Error('ResultSet validation error!'));
                                    else
                                        resolve([]);
                                }));
                        }
                    }

                    resolve(actions);
                });
        }
    }

}
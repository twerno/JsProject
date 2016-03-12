"use strict";

namespace HSLogic {

    export interface MakeAChoiceAtRandomParam extends ChooseActionParam {
        props: MathUtils.ISelectAtRandomProperties
    }


    /**
     * MakeAChoiceAtRandom
     *
 	 */
    export class MakeAChoiceAtRandom<P extends MakeAChoiceAtRandomParam> extends ChooseAction<P> {
        resolve(_this_: MakeAChoiceAtRandom<P>, gameCtx: HsGameCtx): PromiseOfActions {
            if (_this_.param.cancelAction.value)
                return Promise.resolve([]);

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                (resolve, reject): void => {
                    let param: P = _this_.param;

                    param.sets.result.length = 0;
                    param.sets.result.concat(MathUtils.selectAtRandom<HsEntity>(param.sets.source, param.props));

                    resolve(jsLogic.NO_CONSEQUENCES);
                });
        }

        static buildAction(param: ChooseActionParam, props: MathUtils.ISelectAtRandomProperties): MakeAChoiceAtRandom<MakeAChoiceAtRandomParam> {
            return new MakeAChoiceAtRandom<MakeAChoiceAtRandomParam>({
                source: param.source,
                sets: param.sets,
                require: param.require,
                props: props,
                cancelAction: param.cancelAction
            });
        }

        static builder(props: MathUtils.ISelectAtRandomProperties): FChooseActionBuilder<HsGameCtx, MakeAChoiceAtRandomParam> {
            return (param: ChooseActionParam, gameCtx: HsGameCtx): jsLogic.IAction<HsGameCtx> => {
                return MakeAChoiceAtRandom.buildAction(param, props)
            };
        }
    }
}
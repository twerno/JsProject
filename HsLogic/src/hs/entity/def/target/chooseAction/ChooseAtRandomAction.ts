"use strict";

namespace HSLogic {

    export interface ChooseAtRandomParam extends ChooseActionParam {
        props: MathUtils.ISelectAtRandomProperties
    }


    /**
     * ChooseAtRandomMethod
     *
 	 */
    export class ChooseAtRandomAction<P extends ChooseAtRandomParam> extends HsAction<P> {
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
}
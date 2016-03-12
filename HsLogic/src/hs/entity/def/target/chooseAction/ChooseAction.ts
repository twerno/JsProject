"use strict";

namespace HSLogic {

    export enum REQUIRE {
        YES,
        NO,
        IF_TARGETS_ARE_AVAILABLE
    }

    export interface IChooseActionParamSets {
        source: HsEntity[],
        result: HsEntity[]
    }

    export interface ChooseActionParam extends HsActionParam {
        sets: IChooseActionParamSets,
        require: REQUIRE,
        cancelAction?: { value: boolean }
    }

    export abstract class ChooseAction<P extends ChooseActionParam> extends HsAction<P> { }



    export type FChooseActionBuilder<T extends HsGameCtx, P extends ChooseActionParam>
        = (param: P, gameCtx: T) => jsLogic.IAction<T>;

}
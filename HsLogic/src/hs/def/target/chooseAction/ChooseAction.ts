"use strict";

namespace HSLogic {

    export enum REQUIRE {
        YES,
        NO,
        IF_TARGETS_ARE_AVAILABLE
    }

    export interface IChooseActionParamSets<T extends HsEntity> {
        source: T[],
        result: T[]
    }

    export interface ChooseActionParam<T extends HsEntity> extends IHsActionParam {
        sets: IChooseActionParamSets<T>,
        require: REQUIRE,
        cancelAction?: { value: boolean }
    }

    export abstract class ChooseAction<P extends ChooseActionParam<HsEntity>> extends HsAction<P> { }



    export type FChooseActionBuilder<T extends HsEntity, P extends ChooseActionParam<T>>
        = ( param: P, gameCtx: HsGameCtx ) => jsLogic.IAction<HsGameCtx>;

}
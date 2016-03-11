"use strict";

namespace HSLogic {

    export interface ChooseActionParam extends HsActionParam {
        sourceSet: HsEntity[],
        resultSet: HsEntity[]
    }

    export abstract class CustomChooseAction<P extends ChooseActionParam> extends HsAction<P> { }

    export type FChooseActionBuilder<P extends ChooseActionParam>
        = (caller: Player, gameCtx: HsGameCtx) => CustomChooseAction<P>;


    //class ADVANCED_CHOOSE_METHOD {

    //    //arcane_Missiles_Method(param: CustomChooseActionParam): CustomChooseAction<CustomChooseActionParam> {
    //    //    return null;
    //    //}
    //}
}
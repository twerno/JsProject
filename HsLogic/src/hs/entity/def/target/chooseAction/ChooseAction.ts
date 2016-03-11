"use strict";

namespace HSLogic {

    export interface ChooseActionParam extends HsActionParam {
        sourceSet: HsEntity[],
        resultSet: HsEntity[]
    }

    export abstract class ChooseAction<P extends ChooseActionParam> extends HsAction<P> {
        //abstract sourceSet(param: P, gameCtx: HsGameCtx): HsEntity[];
    }

    export type FChooseActionBuilder<P extends ChooseActionParam>
        = (caller: Player, gameCtx: HsGameCtx) => ChooseAction<P>;


    //class ADVANCED_CHOOSE_METHOD {

    //    //arcane_Missiles_Method(param: CustomChooseActionParam): CustomChooseAction<CustomChooseActionParam> {
    //    //    return null;
    //    //}
    //}
}
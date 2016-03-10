"use strict";

namespace HSLogic {

    export enum BASIC_CHOOSE_METHOD {
        ONE,
        ALL,
        ONE_AT_RANDOM
    }

    interface IOption<T> {
        option: T,
        weight: number
    }

    export interface CustomChooseActionParam extends HsActionParam {
    }

    export abstract class CustomChooseAction<P extends CustomChooseActionParam> extends HsAction<P> { }

    export type FCustomChooseMethod = (set: HsEntity[], properties?: Object) => Promise<HsEntity[]>;

    class ADVANCED_CHOOSE_METHOD {

        arcane_Missiles_Method(param: CustomChooseActionParam): CustomChooseAction<CustomChooseActionParam> {
            return null;
        }
    }

    //interface DefTarget {
    //    set: IDefTargetSetBuilder,
    //    choose_method: BASIC_CHOOSE_METHOD | customChooseMethod
    //}
}
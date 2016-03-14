"use strict";

namespace HsLogic {

    export enum REQUIRE {
        YES,
        NO,
        IF_TARGETS_ARE_AVAILABLE
    }

    export interface IChooseActionParamSets<T extends HsEntity> {
        source: T[],
        result: T[]
    }

    export interface MakeAChoiceAtRandomParam<T extends HsEntity> extends IHsActionParam {
        sets: IChooseActionParamSets<T>,
        require: REQUIRE,
        props: MathUtils.ISelectAtRandomProperties,
        cancelAction?: { value: boolean }
    }


    /**
     * MakeAChoiceAtRandom
     *
 	 */
    export class MakeAChoiceAtRandom<T extends HsEntity, P extends MakeAChoiceAtRandomParam<T>> extends HsAction<P> {
        resolve( _this_: MakeAChoiceAtRandom<T, P>, gameCtx: HsGameCtx ): PromiseOfActions {

            if ( _this_.param.cancelAction.value )
                return Promise.resolve( [] );

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = _this_.param;

                    param.sets.result.concat( MathUtils.selectAtRandom<T>( param.sets.source, param.props ) );

                    resolve( jsLogic.NO_CONSEQUENCES );
                });
        }

        //static buildAction<T extends HsEntity>( param: ChooseActionParam<T>, props: MathUtils.ISelectAtRandomProperties ): MakeAChoiceAtRandom<T, MakeAChoiceAtRandomParam<T>> {
        //    return new MakeAChoiceAtRandom<T, MakeAChoiceAtRandomParam<T>>( {
        //        source: param.source,
        //        sets: param.sets,
        //        require: param.require,
        //        props: props,
        //        cancelAction: param.cancelAction
        //    });
        //}

        //static builder<T extends HsEntity>( props: MathUtils.ISelectAtRandomProperties ): FChooseActionBuilder<T, MakeAChoiceAtRandomParam<T>> {
        //    return ( param: ChooseActionParam<T>, gameCtx: HsGameCtx ): jsLogic.IAction<HsGameCtx> => {
        //        return MakeAChoiceAtRandom.buildAction<T>( param, props )
        //    };
        //}
    }
}
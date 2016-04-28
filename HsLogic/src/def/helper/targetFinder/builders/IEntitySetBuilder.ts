"use strict";

namespace Def {

    //export type IEntitySetBuilderFilter<T extends Entity> = (source: ISource, entity: T, gameCtx: HsGameCtx) => boolean;


    export abstract class IEntitySetBuilder<T extends Entity> extends ISetBuilder<T> {

        //protected abstract _internalBuildSet(source: ISource, gameCtx: HsGameCtx): T[];


        //        addFilter(filter: IEntitySetBuilderFilter<T>): IEntitySetBuilder<T> {
        //            super.addFilter(filter);
        //            return this;
        //        }


        protected testAgainstFilters( source: ISource, entity: Entity, gameCtx: HsGameCtx ): boolean {
            return super.testAgainstFilters( source, <T>entity, gameCtx );
        }


		/**
         * order of play order
		 */
        protected compare( a: Entity, b: Entity ): number {
            return a.orderOfPlay - b.orderOfPlay;
        }
    }




}
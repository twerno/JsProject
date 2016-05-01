/// <reference path="../isetbuilder.ts" />
"use strict";

namespace Def {


    export abstract class IEntitySetBuilder<T extends Entity> extends ISetBuilder<T> {


        protected testAgainstFilters( source: ISource, entity: Entity, gameCtx: HsGameCtx ): boolean {
            return super.testAgainstFilters( source, <T>entity, gameCtx );
        }


		/**
         * order of play order
		 */
        protected compare( a: Entity, b: Entity ): number {
            return HsLogic.Entity.compare( a, b );
        }
    }

}
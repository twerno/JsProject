/// <reference path="../../aliases.ts" />

"use strict";

namespace Def {

    export type IDefSetFilter<T extends Entity> = ( source: ISource, entity: T, context: HsGameCtx ) => boolean;


    export abstract class ITargetSetBuilder<T extends Entity> {

        private _filters: IDefSetFilter<T>[] = [];

        protected abstract _internalBuildSet( source: ISource, context: HsGameCtx ): Entity[];


        addFilter( filter: IDefSetFilter<T> ): ITargetSetBuilder<T> {
            this._filters.push( filter );
            return this;
        }


        buildSet( source: ISource, context: HsGameCtx ): T[] {
            return <T[]>( this._internalBuildSet( source, context ).sort( this.compare ) );
        }


        protected testAgainstFilters( source: ISource, entity: Entity, context: HsGameCtx ): boolean {

            for ( let i = 0; i < this._filters.length; i++ ) {
                if ( !this._filters[i]( source, <T>entity, context ) )
                    return false;
            }
            return true;
        }


		/**
         * order of play order
		 */
        protected compare( a: Entity, b: Entity ): number {
            return a.orderOfPlay - b.orderOfPlay;
        }
    }

}
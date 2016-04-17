/// <reference path="../../aliases.ts" />

"use strict";

namespace Def {

    export type ITargetSetBuilderFilter<T extends Entity> = ( source: ISource, entity: T, gameCtx: HsGameCtx ) => boolean;


    export abstract class ITargetSetBuilder<T extends Entity> {

        private _filters: ITargetSetBuilderFilter<T>[] = [];

        protected abstract _internalBuildSet( source: ISource, gameCtx: HsGameCtx ): Entity[];


        addFilter( filter: ITargetSetBuilderFilter<T> ): ITargetSetBuilder<T> {
            this._filters.push( filter );
            return this;
        }


        buildSet( source: ISource, gameCtx: HsGameCtx ): T[] {
            return <T[]>( this._internalBuildSet( source, gameCtx ).sort( this.compare ) );
        }


        protected testAgainstFilters( source: ISource, entity: Entity, gameCtx: HsGameCtx ): boolean {

            for ( let i = 0; i < this._filters.length; i++ ) {
                if ( !this._filters[i]( source, <T>entity, gameCtx ) )
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
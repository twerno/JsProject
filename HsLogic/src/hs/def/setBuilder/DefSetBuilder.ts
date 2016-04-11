"use strict";

namespace Def {

    export type IDefSetFilter = ( source: ISource, entity: Entity, context: HsGameCtx ) => boolean;


    export abstract class IDefSetBuilder {

        protected _filters: IDefSetFilter[] = [];

        protected abstract _internalBuildSet( source: ISource, context: HsGameCtx ): Entity[];


        addFilter( filter: IDefSetFilter ): IDefSetBuilder {
            this._filters.push( filter );
            return this;
        }


        buildSet<T extends Entity>( source: ISource, context: HsGameCtx ): T[] {
            return <T[]>( this._internalBuildSet( source, context ).sort( this.compare ) );
        }


        protected testAgainstFilters( source: ISource, entity: Entity, context: HsGameCtx ): boolean {

            for ( let i = 0; i < this._filters.length; i++ ) {
                if ( !this._filters[i]( source, entity, context ) )
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
"use strict";

namespace Def {

    export type IDefSetFilter = ( source: HsSource, entity: IHsEntityImpl, gameCtx: GameCtx ) => boolean;


    export abstract class IDefSetBuilder {

        protected _filters: IDefSetFilter[] = [];

        protected abstract _internalBuildSet( source: HsSource, gameCtx: GameCtx ): IHsEntityImpl[];


        addFilter( filter: IDefSetFilter ): IDefSetBuilder {
            this._filters.push( filter );
            return this;
        }


        buildSet<T extends Entity>( source: HsSource, gameCtx: GameCtx ): T[] {
            return <T[]>( this._internalBuildSet( source, gameCtx ).sort( this.compare ) );
        }


        protected testAgainstFilters( source: HsSource, entity: IHsEntityImpl, gameCtx: GameCtx ): boolean {

            for ( let i = 0; i < this._filters.length; i++ ) {
                if ( !this._filters[i]( source, entity, gameCtx ) )
                    return false;
            }
            return true;
        }


		/**
         * order of play order
		 */
        protected compare( a: IHsEntityImpl, b: IHsEntityImpl ): number {
            return a.orderOfPlay - b.orderOfPlay;
        }
    }

}
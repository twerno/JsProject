/// <reference path="../../aliases.ts" />

"use strict";

namespace Def {

    export type FSetBuilderFilter<T> = ( source: ISource, entity: T, gameCtx: HsGameCtx ) => boolean;



    export abstract class ISetBuilder<T> {

        protected _filters: FSetBuilderFilter<T>[] = [];

        protected abstract _internalBuildSet( source: ISource, gameCtx: HsGameCtx ): T[];


        addFilter( filter: FSetBuilderFilter<T> ): ISetBuilder<T> {
            this._filters.push( filter );
            return this;
        }


        buildSet( source: ISource, gameCtx: HsGameCtx ): T[] {
            return <T[]>( this._internalBuildSet( source, gameCtx ).sort( this.compare ) );
        }


        protected testAgainstFilters( source: ISource, entity: T, gameCtx: HsGameCtx ): boolean {

            for ( let i = 0; i < this._filters.length; i++ ) {
                if ( !this._filters[i]( source, entity, gameCtx ) )
                    return false;
            }
            return true;
        }

        protected abstract compare( a: T, b: T ): number;
    }

}
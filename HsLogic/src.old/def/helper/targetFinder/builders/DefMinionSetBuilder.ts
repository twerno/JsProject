/// <reference path="iEntitySetBuilder.ts" />

"use strict";

namespace Def {

    export class DefMinionSetBuilder extends ISetBuilder<IMinion> {

        constructor( protected baseSet: IMinion[] ) { super(); }

        protected _internalBuildSet( source: ISource, gameCtx: HsGameCtx ): IMinion[] {
            let result: IMinion[] = [];

            for ( let minion of this.baseSet )
                if ( this.testAgainstFilters( source, minion, gameCtx ) )
                    result.push( minion );

            return result;
        }

        compare( a: IMinion, b: IMinion ): number {
            return 0;
        }
    }
}
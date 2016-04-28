"use strict";

namespace Def.Filter {

    export function DoesNotControllMinion(): FSetBuilderFilter<IMinion> {
        return ( source: ISource, minionDef: IMinion, gameCtx: HsGameCtx ): boolean => {

            for ( let minion of TargetFinder.FRIENDLY_MINION.buildSet( source, gameCtx ) )
                if ( minion.name === minionDef.name )
                    return false;

            return true;
        }
    }

}
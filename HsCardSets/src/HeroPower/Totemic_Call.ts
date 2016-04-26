"use strict";

namespace Def {

    export var Totemic_Call: IHeroPower = {
        name: `Totemic Call`,

        cost: 2,

        ability: {
            targets: null,
            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {
                return [

                ];
            }
        }
    }

}
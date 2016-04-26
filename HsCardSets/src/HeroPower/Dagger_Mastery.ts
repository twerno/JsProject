"use strict";

namespace Def {

    export var Dagger_Mastery: IHeroPower = {
        name: `Dagger Mastery`,

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
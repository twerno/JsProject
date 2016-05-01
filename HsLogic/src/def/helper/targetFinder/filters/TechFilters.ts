"use strict";

namespace Def.Filter {

    export function hasEnchantments(): FSetBuilderFilter<Entity> {
        return ( source: ISource, entity: Entity, gameCtx: HsGameCtx ): boolean => {
            return ( entity instanceof HsLogic.Card
                || entity instanceof HsLogic.Player
                || entity instanceof HsLogic.Hero )
                && ( <HsLogic.Card | HsLogic.Hero | HsLogic.Player>entity ).enchantments.length > 0;
        }
    }

}
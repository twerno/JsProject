"use strict";

namespace Def.Filter {



    export function minion( source: ISource, entity: HsLogic.Entity, gameCtx: HsGameCtx ): boolean {
        return entity instanceof HsLogic.Minion;
    }


    export function hero( source: ISource, entity: HsLogic.Entity, gameCtx: HsGameCtx ): boolean {
        return entity instanceof HsLogic.Hero;
    }


    export function waepon( source: ISource, entity: HsLogic.Entity, gameCtx: HsGameCtx ): boolean {
        return entity instanceof HsLogic.Weapon;
    }


    export function character( source: ISource, entity: HsLogic.Entity, gameCtx: HsGameCtx ): boolean {
        return minion( source, entity, gameCtx )
            || hero( source, entity, gameCtx );
    }


    export function friendly( source: ISource, entity: HsLogic.Entity, gameCtx: HsGameCtx ): boolean {
        return entity.owner === source.player
            || entity === source.player.hero
            || entity === source.player;
    }


    export function enemy( source: ISource, entity: HsLogic.Entity, gameCtx: HsGameCtx ): boolean {
        return !friendly( source, entity, gameCtx );
    }

}
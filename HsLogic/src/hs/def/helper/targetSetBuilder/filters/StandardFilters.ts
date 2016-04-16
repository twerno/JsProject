"use strict";

namespace Def.Filter {



    export function minion( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {
        return entity instanceof HsLogic.Minion;
    }


    export function hero( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {
        return entity instanceof HsLogic.Player;
    }


    export function waepon( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {
        return entity instanceof HsLogic.Weapon;
    }


    export function character( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {
        return minion( source, entity, context )
            || hero( source, entity, context );
    }


    export function friendly( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {
        return entity === source.player
            || entity.owner === source.player;
    }


    export function enemy( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {
        return !friendly( source, entity, context );
    }

}
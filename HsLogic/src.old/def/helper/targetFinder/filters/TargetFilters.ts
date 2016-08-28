"use strict";

namespace Def.Filter {

    export function targetable_by_spell_or_hero_power( source: ISource, entity: HsLogic.Entity, gameCtx: HsGameCtx ): boolean {

        if ( entity instanceof HsLogic.Hero || entity instanceof HsLogic.Minion )
            return !entity.tags.contains( Def.Elusive_Tag )
                && ( entity.owner === source.player
                    || !entity.tags.hasAny( [Def.Immune_Tag, Def.Stealth_Tag] ) );

        if ( entity instanceof HsLogic.Weapon )
            return true;

        return false;
    }



    //export function character_targetable_by_spell_or_hero_power( source: ISource, entity: HsLogic.HsEntity, gameCtx: HsGameCtx ): boolean {
    //    return character( source, entity, gameCtx )
    //        && targetable_by_spell_or_hero_power( source, entity, gameCtx );
    //}



    export function targetable_by_minion( source: ISource, entity: HsLogic.Entity, gameCtx: HsGameCtx ): boolean {

        if ( entity instanceof HsLogic.Hero || entity instanceof HsLogic.Minion )
            return entity.owner === source.player
                || !entity.tags.hasAny( [Def.Elusive_Tag, Def.Immune_Tag, Def.Stealth_Tag] );

        return false;
    }

}
"use strict";

namespace Def.Filter {

    export function targetable_by_spell_or_hero_power( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {

        if ( entity instanceof HsLogic.Player || entity instanceof HsLogic.Minion )
            return !entity.tags.has( Def.Elusive_Tag )
                && ( !entity.tags.has( Def.Immune_Tag ) || entity.owner === source.player )
                && ( !entity.tags.has( Def.Stealth_Tag ) || entity.owner === source.player );

        if ( entity instanceof HsLogic.Weapon )
            return true;

        return false;
    }



    //export function character_targetable_by_spell_or_hero_power( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {
    //    return character( source, entity, context )
    //        && targetable_by_spell_or_hero_power( source, entity, context );
    //}



    export function targetable_by_minion( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {

        if ( entity instanceof HsLogic.Player || entity instanceof HsLogic.Minion )
            return entity.owner === source.player
                || !entity.tags.hasAny( [Def.Elusive_Tag, Def.Immune_Tag, Def.Stealth_Tag] );

        return false;
    }

}
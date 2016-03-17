"use strict";

namespace Def {

    export class StandardFilters {

        static minion( source: HsSource, entity: HsLogic.HsEntity, gameCtx: GameCtx ): boolean {
            return entity instanceof HsLogic.Minion;
        }

        static hero( source: HsSource, entity: HsLogic.HsEntity, gameCtx: GameCtx ): boolean {
            return entity.type === TYPE.HERO;
        }

        static waepon( source: HsSource, entity: HsLogic.HsEntity, gameCtx: GameCtx ): boolean {
            return entity instanceof HsLogic.Weapon;
        }

        static character( source: HsSource, entity: HsLogic.HsEntity, gameCtx: GameCtx ): boolean {
            return StandardFilters.minion( source, entity, gameCtx )
                || StandardFilters.hero( source, entity, gameCtx );
        }

        static friendly( source: HsSource, entity: HsLogic.HsEntity, gameCtx: GameCtx ): boolean {
            return entity === source.caster
                || entity.owner === source.caster;
        }

        static enemy( source: HsSource, entity: HsLogic.HsEntity, gameCtx: GameCtx ): boolean {
            return !StandardFilters.friendly( source, entity, gameCtx );
        }

        //static other_than( source: HsSource, entity: HsLogic.HsEntity, gameCtx: GameCtx ): boolean {
        //    return ( target instanceof Array && target.indexOf( entity ) === -1 )
        //        || ( target instanceof HsEntity && target !== entity );
        //}

        static targetable_by_spell_or_hero_power( source: HsSource, entity: HsLogic.HsEntity, gameCtx: GameCtx ): boolean {

            if ( entity instanceof HsLogic.Player || entity instanceof HsLogic.Minion )
                return !entity.flags.elusive
                    && ( !entity.flags.immune || entity.owner === source.caster )
                    && ( !entity.flags.stealth || entity.owner === source.caster );

            if ( entity instanceof HsLogic.Weapon )
                return true;

            return false;
        }

        static character_targetable_by_spell_or_hero_power( source: HsSource, entity: HsLogic.HsEntity, gameCtx: GameCtx ): boolean {
            return StandardFilters.character( source, entity, gameCtx )
                && StandardFilters.targetable_by_spell_or_hero_power( source, entity, gameCtx );
        }

        static targetable_by_minion( source: HsSource, entity: HsLogic.HsEntity, gameCtx: GameCtx ): boolean {

            if ( entity instanceof HsLogic.Player
                || entity instanceof HsLogic.Minion )
                return entity.owner === source.caster
                    || !entity.flags.elusive
                    || !entity.flags.immune
                    || !entity.flags.stealth;

            return false;
        }
    }
}
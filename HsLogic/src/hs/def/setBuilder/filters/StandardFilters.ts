"use strict";

namespace Def {

    export class StandardFilters {

        static minion( source: HsSource, entity: HsLogic.HsEntity, context: GameCtx ): boolean {
            return entity instanceof HsLogic.Minion;
        }

        static hero( source: HsSource, entity: HsLogic.HsEntity, context: GameCtx ): boolean {
            return entity.type === TYPE.HERO;
        }

        static waepon( source: HsSource, entity: HsLogic.HsEntity, context: GameCtx ): boolean {
            return entity instanceof HsLogic.Weapon;
        }

        static character( source: HsSource, entity: HsLogic.HsEntity, context: GameCtx ): boolean {
            return StandardFilters.minion( source, entity, context )
                || StandardFilters.hero( source, entity, context );
        }

        static friendly( source: HsSource, entity: HsLogic.HsEntity, context: GameCtx ): boolean {
            return entity === source.caster
                || entity.owner === source.caster;
        }

        static enemy( source: HsSource, entity: HsLogic.HsEntity, context: GameCtx ): boolean {
            return !StandardFilters.friendly( source, entity, context );
        }

        static targetable_by_spell_or_hero_power( source: HsSource, entity: HsLogic.HsEntity, context: GameCtx ): boolean {

            if ( entity instanceof HsLogic.Player || entity instanceof HsLogic.Minion )
                return !entity.flags.elusive
                    && ( !entity.flags.immune || entity.owner === source.caster )
                    && ( !entity.flags.stealth || entity.owner === source.caster );

            if ( entity instanceof HsLogic.Weapon )
                return true;

            return false;
        }

        static character_targetable_by_spell_or_hero_power( source: HsSource, entity: HsLogic.HsEntity, context: GameCtx ): boolean {
            return StandardFilters.character( source, entity, context )
                && StandardFilters.targetable_by_spell_or_hero_power( source, entity, context );
        }

        static targetable_by_minion( source: HsSource, entity: HsLogic.HsEntity, context: GameCtx ): boolean {

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
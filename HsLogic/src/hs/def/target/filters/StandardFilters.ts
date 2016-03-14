"use strict";

namespace Def {

    export class StandardFilters {

        static minion( source: HsSource, entity: HSLogic.HsEntity, gameCtx: GameCtx ): boolean {
            return entity instanceof HSLogic.Minion;
        }

        static hero( source: HsSource, entity: HSLogic.HsEntity, gameCtx: GameCtx ): boolean {
            return entity.cardType === CARD_TYPE.HERO;
        }

        static waepon( source: HsSource, entity: HSLogic.HsEntity, gameCtx: GameCtx ): boolean {
            return entity instanceof HSLogic.Weapon;
        }

        static character( source: HsSource, entity: HSLogic.HsEntity, gameCtx: GameCtx ): boolean {
            return StandardFilters.minion( source, entity, gameCtx )
                || StandardFilters.hero( source, entity, gameCtx );
        }

        static friendly( source: HsSource, entity: HSLogic.HsEntity, gameCtx: GameCtx ): boolean {
            return entity === source.caster
                || entity.owner === source.caster;
        }

        static enemy( source: HsSource, entity: HSLogic.HsEntity, gameCtx: GameCtx ): boolean {
            return !StandardFilters.friendly( source, entity, gameCtx );
        }

        //static other_than( source: HsSource, entity: HSLogic.HsEntity, gameCtx: GameCtx ): boolean {
        //    return ( target instanceof Array && target.indexOf( entity ) === -1 )
        //        || ( target instanceof HsEntity && target !== entity );
        //}

        static targetable_by_spell_or_hero_power( source: HsSource, entity: HSLogic.HsEntity, gameCtx: GameCtx ): boolean {

            if ( entity instanceof HSLogic.Player || entity instanceof HSLogic.Minion )
                return !entity.flags.elusive
                    && ( !entity.flags.immune || entity.owner === source.caster )
                    && ( !entity.flags.stealth || entity.owner === source.caster );

            if ( entity instanceof HSLogic.Weapon )
                return true;

            return false;
        }

        static targetable_by_minion( source: HsSource, entity: HSLogic.HsEntity, gameCtx: GameCtx ): boolean {

            if ( entity instanceof HSLogic.Player
                || entity instanceof HSLogic.Minion )
                return entity.owner === source.caster
                    || !entity.flags.elusive
                    || !entity.flags.immune
                    || !entity.flags.stealth;

            return false;
        }
    }
}
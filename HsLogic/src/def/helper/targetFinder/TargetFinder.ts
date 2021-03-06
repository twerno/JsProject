"use strict";

namespace Def {


    export class TargetFinder {


        static get ENEMY_HERO(): ISetBuilder<Hero> {
            return new EntitySetBuilder<Hero>( {
                includeHeroes: true,
                zones: null,
            })
                .addFilter( Filter.enemy );
        }


        static get ENEMY_MINION(): ISetBuilder<Minion> {
            return TargetFinder.ANY_MINION
                .addFilter( Filter.enemy )
                .addFilter( Filter.minion );
        }


        static get ENEMY_CHARACTER(): ISetBuilder<Character> {
            return TargetFinder.ANY_CHARACTER
                .addFilter( Filter.enemy )
                .addFilter( Filter.character );
        }


        static get ENEMY_SPELL_TARGETABLE_CHARACTER(): ISetBuilder<Character> {
            return TargetFinder.ENEMY_CHARACTER
                .addFilter( Filter.targetable_by_spell_or_hero_power );
        }


        static get ENEMY_SPELL_TARGETABLE_MINION(): ISetBuilder<Minion> {
            return TargetFinder.ENEMY_MINION
                .addFilter( Filter.targetable_by_spell_or_hero_power );
        }


        static get ENEMY_WEAPON(): ISetBuilder<Weapon> {
            return new EntitySetBuilder<Weapon>( {
                includeHeroes: false,
                zones: ( zones: Zones ): Zone[] => { return [zones.weapon] }
            })
                .addFilter( Filter.enemy );
        }


        static get FRIENDLY_HERO(): ISetBuilder<Hero> {
            return new EntitySetBuilder<Hero>( {
                includeHeroes: true,
                zones: null,
            })
                .addFilter( Filter.friendly );
        }


        static get FRIENDLY_MINION(): ISetBuilder<Minion> {
            return TargetFinder.ANY_MINION
                .addFilter( Filter.friendly )
                .addFilter( Filter.minion );
        }


        static get FRIENDLY_SPELL_TARGETABLE_MINION(): ISetBuilder<Minion> {
            return TargetFinder.FRIENDLY_MINION
                .addFilter( Filter.targetable_by_spell_or_hero_power );
        }


        static get FRIENDLY_CHARACTER(): ISetBuilder<Character> {
            return TargetFinder.ANY_CHARACTER
                .addFilter( Filter.friendly )
                .addFilter( Filter.character );
        }


        static get FRIENDLY_WEAPON(): ISetBuilder<Weapon> {
            return new EntitySetBuilder<Weapon>( {
                includeHeroes: false,
                zones: ( zones: Zones ): Zone[] => { return [zones.weapon] }
            })
                .addFilter( Filter.friendly );
        }


        static get ANY_CHARACTER(): ISetBuilder<Character> {
            return new EntitySetBuilder<Character>( {
                includeHeroes: true,
                zones: ( zones: Zones ): Zone[] => { return [zones.battlefield] }
            });
        }


        static get ANY_SPELL_TARGETABLE_CHARACTER(): ISetBuilder<Character> {
            return TargetFinder.ANY_CHARACTER
                .addFilter( Filter.targetable_by_spell_or_hero_power );
        }


        static get ANY_MINION(): ISetBuilder<Minion> {
            return new EntitySetBuilder<Minion>( {
                includeHeroes: false,
                zones: ( zones: Zones ): Zone[] => [zones.battlefield]
            })
                .addFilter( Filter.minion );
        }

        static get ANY_SPELL_TARGETABLE_MINION(): ISetBuilder<Minion> {
            return TargetFinder.ANY_MINION
                .addFilter( Filter.targetable_by_spell_or_hero_power );
        }

        static get ANY_ENCHANTED_PERMANENT_EXT(): ISetBuilder<PermanentExt> {
            return new EntitySetBuilder<PermanentExt>( {
                includeHeroes: true,
                includePlayers: true,
                zones: ( zones: Zones ): Zone[] => [zones.battlefield, zones.weapon]
            }).addFilter( Filter.hasEnchantments() );
        }

        static get PLAYER(): ISetBuilder<Player> {
            return new EntitySetBuilder<Player>( {
                includeHeroes: false,
                includePlayers: true,
                zones: ( zones: Zones ): Zone[] => []
            }).addFilter( Filter.friendly );
        }


        //        static
    }

    //    export class SetBuilderHelper {

    //        static get ALL(): ISetBuilder {
    //            return new EntitySetBuilder( {
    //                includePlayer: true,
    //                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return zones.getAsArray() },
    //            });
    //        }

    //        static get BATTLEFIELD(): ISetBuilder {
    //            return new EntitySetBuilder( {
    //                includePlayer: true,
    //                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return [zones.weapon, zones.battlefield] },
    //            });
    //        }

    //        static get HAND(): ISetBuilder {
    //            return new EntitySetBuilder( {
    //                includePlayer: false,
    //                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return [zones.hand] },
    //            });
    //        }

    //        static get DECK(): ISetBuilder {
    //            return new EntitySetBuilder( {
    //                includePlayer: false,
    //                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return [zones.deck] },
    //            });
    //        }

    //        static get GRAVEYARD(): ISetBuilder {
    //            return new EntitySetBuilder( {
    //                includePlayer: false,
    //                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return [zones.graveyard] },
    //            });
    //        }

    //        static get TRIGGERS(): ISetBuilder {
    //            return new EntitySetBuilder( {
    //                includePlayer: false,
    //                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return [zones.graveyard] },
    //            });
    //        }

    //        static get ENEMY_CHARACTER(): ISetBuilder {
    //            return SetBuilderHelper.BATTLEFIELD
    //                .addFilter( StandardFilters.enemy );
    //        }

    //    }
}
"use strict";

namespace Def {


    export class TargetFinder {


        static get ENEMY_HERO(): ITargetSetBuilder<Hero> {
            return new EntitySetBuilder<Hero>( {
                includeHeroes: true,
                zones: null,
            })
                .addFilter( Filter.enemy );
        }


        static get EMEMY_MINION(): ITargetSetBuilder<Minion> {
            return TargetFinder.ANY_MINION
                .addFilter( Filter.enemy )
                .addFilter( Filter.minion );
        }


        static get EMEMY_CHARACTER(): ITargetSetBuilder<Character> {
            return TargetFinder.ANY_CHARACTER
                .addFilter( Filter.enemy )
                .addFilter( Filter.character );
        }


        static get EMEMY_SPELL_TARGETABLE_CHARACTER(): ITargetSetBuilder<Character> {
            return TargetFinder.EMEMY_CHARACTER
                .addFilter( Filter.targetable_by_spell_or_hero_power );
        }


        static get EMEMY_WEAPON(): ITargetSetBuilder<Weapon> {
            return new EntitySetBuilder<Weapon>( {
                includeHeroes: false,
                zones: ( zones: Zones ): Zone[] => { return [zones.weapon] }
            })
                .addFilter( Filter.enemy );
        }


        static get FRIENDLY_HERO(): ITargetSetBuilder<Hero> {
            return new EntitySetBuilder<Hero>( {
                includeHeroes: true,
                zones: null,
            })
                .addFilter( Filter.friendly );
        }


        static get FRIENDLY_MINION(): ITargetSetBuilder<Minion> {
            return TargetFinder.ANY_MINION
                .addFilter( Filter.friendly )
                .addFilter( Filter.minion );
        }


        static get FRIENDLY_SPELL_TARGETABLE_MINION(): ITargetSetBuilder<Minion> {
            return TargetFinder.FRIENDLY_MINION
                .addFilter( Filter.targetable_by_spell_or_hero_power );
        }


        static get FRIENDLY_CHARACTER(): ITargetSetBuilder<Character> {
            return TargetFinder.ANY_CHARACTER
                .addFilter( Filter.friendly )
                .addFilter( Filter.character );
        }


        static get FRIENDLY_WEAPON(): ITargetSetBuilder<Weapon> {
            return new EntitySetBuilder<Weapon>( {
                includeHeroes: false,
                zones: ( zones: Zones ): Zone[] => { return [zones.weapon] }
            })
                .addFilter( Filter.friendly );
        }


        static get ANY_CHARACTER(): ITargetSetBuilder<Character> {
            return new EntitySetBuilder<Character>( {
                includeHeroes: true,
                zones: ( zones: Zones ): Zone[] => { return [zones.battlefield] }
            });
        }


        static get ANY_SPELL_TARGETABLE_CHARACTER(): ITargetSetBuilder<Character> {
            return TargetFinder.ANY_CHARACTER
                .addFilter( Filter.targetable_by_spell_or_hero_power );
        }


        static get ANY_MINION(): ITargetSetBuilder<Minion> {
            return new EntitySetBuilder<Minion>( {
                includeHeroes: false,
                zones: ( zones: Zones ): Zone[] => { return [zones.battlefield] }
            })
                .addFilter( Filter.minion );
        }
    }

    //    export class SetBuilderHelper {

    //        static get ALL(): ITargetSetBuilder {
    //            return new EntitySetBuilder( {
    //                includePlayer: true,
    //                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return zones.getAsArray() },
    //            });
    //        }

    //        static get BATTLEFIELD(): ITargetSetBuilder {
    //            return new EntitySetBuilder( {
    //                includePlayer: true,
    //                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return [zones.weapon, zones.battlefield] },
    //            });
    //        }

    //        static get HAND(): ITargetSetBuilder {
    //            return new EntitySetBuilder( {
    //                includePlayer: false,
    //                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return [zones.hand] },
    //            });
    //        }

    //        static get DECK(): ITargetSetBuilder {
    //            return new EntitySetBuilder( {
    //                includePlayer: false,
    //                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return [zones.deck] },
    //            });
    //        }

    //        static get GRAVEYARD(): ITargetSetBuilder {
    //            return new EntitySetBuilder( {
    //                includePlayer: false,
    //                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return [zones.graveyard] },
    //            });
    //        }

    //        static get TRIGGERS(): ITargetSetBuilder {
    //            return new EntitySetBuilder( {
    //                includePlayer: false,
    //                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return [zones.graveyard] },
    //            });
    //        }

    //        static get ENEMY_CHARACTER(): ITargetSetBuilder {
    //            return SetBuilderHelper.BATTLEFIELD
    //                .addFilter( StandardFilters.enemy );
    //        }

    //    }
}
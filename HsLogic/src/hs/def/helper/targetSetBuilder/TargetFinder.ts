"use strict";

namespace Def {


    export class TargetFinder {


        static get ENEMY_HERO(): ITargetSetBuilder<Player> {
            return new EntitySetBuilder<Player>( {
                includePlayer: true,
                zones: null,
            })
                .addFilter( StandardFilters.enemy );
        }


        static get EMEMY_MINION(): ITargetSetBuilder<Minion> {
            return TargetFinder.ANY_MINION
                .addFilter( StandardFilters.enemy )
                .addFilter( StandardFilters.minion );
        }


        static get EMEMY_CHARACTER(): ITargetSetBuilder<Character> {
            return TargetFinder.ANY_CHARACTER
                .addFilter( StandardFilters.enemy )
                .addFilter( StandardFilters.character );
        }


        static get EMEMY_WEAPON(): ITargetSetBuilder<Weapon> {
            return new EntitySetBuilder<Weapon>( {
                includePlayer: false,
                zones: ( zones: HsZones ): HsZone[] => { return [zones.weapon] }
            })
                .addFilter( StandardFilters.enemy );
        }


        static get FRIENDLY_HERO(): ITargetSetBuilder<Player> {
            return new EntitySetBuilder<Player>( {
                includePlayer: true,
                zones: null,
            })
                .addFilter( StandardFilters.friendly );
        }


        static get FRIENDLY_MINION(): ITargetSetBuilder<Minion> {
            return TargetFinder.ANY_MINION
                .addFilter( StandardFilters.friendly )
                .addFilter( StandardFilters.minion );
        }


        static get FRIENDLY_CHARACTER(): ITargetSetBuilder<Character> {
            return TargetFinder.ANY_CHARACTER
                .addFilter( StandardFilters.friendly )
                .addFilter( StandardFilters.character );
        }


        static get FRIENDLY_WEAPON(): ITargetSetBuilder<Weapon> {
            return new EntitySetBuilder<Weapon>( {
                includePlayer: false,
                zones: ( zones: HsZones ): HsZone[] => { return [zones.weapon] }
            })
                .addFilter( StandardFilters.friendly );
        }


        static get ANY_CHARACTER(): ITargetSetBuilder<Character> {
            return new EntitySetBuilder<Character>( {
                includePlayer: true,
                zones: ( zones: HsZones ): HsZone[] => { return [zones.battlefield] }
            });
        }


        static get ANY_MINION(): ITargetSetBuilder<Minion> {
            return new EntitySetBuilder<Minion>( {
                includePlayer: false,
                zones: ( zones: HsZones ): HsZone[] => { return [zones.battlefield] }
            })
                .addFilter( StandardFilters.minion );
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
"use strict";

namespace Def {

    export class SetBuilderHelper {

        static get ALL(): ITargetSetBuilder {
            return new EntitySetBuilder( {
                includePlayer: true,
                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return zones.getAsArray() },
            });
        }

        static get BATTLEFIELD(): ITargetSetBuilder {
            return new EntitySetBuilder( {
                includePlayer: true,
                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return [zones.weapon, zones.battlefield] },
            });
        }

        static get HAND(): ITargetSetBuilder {
            return new EntitySetBuilder( {
                includePlayer: false,
                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return [zones.hand] },
            });
        }

        static get DECK(): ITargetSetBuilder {
            return new EntitySetBuilder( {
                includePlayer: false,
                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return [zones.deck] },
            });
        }

        static get GRAVEYARD(): ITargetSetBuilder {
            return new EntitySetBuilder( {
                includePlayer: false,
                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return [zones.graveyard] },
            });
        }

        static get TRIGGERS(): ITargetSetBuilder {
            return new EntitySetBuilder( {
                includePlayer: false,
                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return [zones.graveyard] },
            });
        }

        static get ENEMY_CHARACTER(): ITargetSetBuilder {
            return SetBuilderHelper.BATTLEFIELD
                .addFilter( StandardFilters.enemy );
        }

    }
}
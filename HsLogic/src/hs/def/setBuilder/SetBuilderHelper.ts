"use strict";

namespace Def {

    export class SetBuilderHelper {

        static get ALL(): IDefSetBuilder {
            return new EntitySetBuilder( {
                includePlayer: true,
                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return zones.getAsArray() },
            });
        }

        static get BATTLEFIELD(): IDefSetBuilder {
            return new EntitySetBuilder( {
                includePlayer: true,
                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return [zones.weapon, zones.battlefield] },
            });
        }

        static get HAND(): IDefSetBuilder {
            return new EntitySetBuilder( {
                includePlayer: false,
                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return [zones.hand] },
            });
        }

        static get DECK(): IDefSetBuilder {
            return new EntitySetBuilder( {
                includePlayer: false,
                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return [zones.deck] },
            });
        }

        static get GRAVEYARD(): IDefSetBuilder {
            return new EntitySetBuilder( {
                includePlayer: false,
                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return [zones.graveyard] },
            });
        }

        static get TRIGGERS(): IDefSetBuilder {
            return new EntitySetBuilder( {
                includePlayer: false,
                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return [zones.graveyard] },
            });
        }

    }
}
"use strict";

namespace Def {

    export class DefTargetHelper {

        static get ALL(): IDefTarget {
            return new DefTarget( {
                includePlayer: true,
                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return zones.getAsArray() },
            });
        }

        static get BATTLEFIELD(): IDefTarget {
            return new DefTarget( {
                includePlayer: true,
                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return [zones.weapon, zones.battlefield] },
            });
        }

        static get HAND(): IDefTarget {
            return new DefTarget( {
                includePlayer: true,
                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return [zones.hand] },
            });
        }

        static get DECK(): IDefTarget {
            return new DefTarget( {
                includePlayer: true,
                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return [zones.deck] },
            });
        }

        static get GRAVEYARD(): IDefTarget {
            return new DefTarget( {
                includePlayer: true,
                zoneArrayGetter: ( zones: HsLogic.HsZones ): HsLogic.HsZone<Card>[] => { return [zones.graveyard] },
            });
        }

    }
}
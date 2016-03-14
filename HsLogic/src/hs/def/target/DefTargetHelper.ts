"use strict";

namespace Def {

    export class DefTargetHelper {

        static get ALL(): IDefTarget {
            return new DefTarget( {
                includePlayer: true,
                zoneArrayGetter: ( zones: HSLogic.HsZones ): HSLogic.HsZone[] => { return zones.getAsArray() },
            });
        }

        static get BATTLEFIELD(): IDefTarget {
            return new DefTarget( {
                includePlayer: true,
                zoneArrayGetter: ( zones: HSLogic.HsZones ): HSLogic.HsZone[] => { return [zones.weapon, zones.battlefield] },
            });
        }

        static get HAND(): IDefTarget {
            return new DefTarget( {
                includePlayer: true,
                zoneArrayGetter: ( zones: HSLogic.HsZones ): HSLogic.HsZone[] => { return [zones.hand] },
            });
        }

        static get DECK(): IDefTarget {
            return new DefTarget( {
                includePlayer: true,
                zoneArrayGetter: ( zones: HSLogic.HsZones ): HSLogic.HsZone[] => { return [zones.deck] },
            });
        }

        static get GRAVEYARD(): IDefTarget {
            return new DefTarget( {
                includePlayer: true,
                zoneArrayGetter: ( zones: HSLogic.HsZones ): HSLogic.HsZone[] => { return [zones.graveyard] },
            });
        }

    }
}
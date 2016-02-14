///<reference path="../../core/Marker.ts"/>

"use strict";

namespace HSLogic {

    export class HsMarker extends jsLogic.Marker {

        constructor() {
            super( Utils.getNameOfClass( this ) );
        }
    }

    export class DestroyMarker extends HsMarker { }
}
///<reference path="../../core/Marker.ts"/>

"use strict";

namespace HsLogic {

    export class HsMarker extends jsLogic.Marker {

        constructor() {
            super();
        }
    }

    export class DestroyMarker extends HsMarker {
        static get type(): string { return new DestroyMarker().type; }
    }

}
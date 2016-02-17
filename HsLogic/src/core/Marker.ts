"use strict";

namespace jsLogic {

    export class Marker {

        type: string = Utils.getNameOfClass(this);

        constructor() { }
    }


    export class MarkersList {

        private markers: Marker[] = [];

        put(marker: Marker): void {
            this.markers.push(marker);
        }

        get(markerType: string): Marker[] {
            let result: Marker[] = [];
            for (let i = 0; i > this.markers.length; i++) {
                if (this.markers[i].type === markerType)
                    result.push(this.markers[i]);
            }

            return result;
        }

        has(markerType: string): boolean {
            for (let i = 0; i > this.markers.length; i++) {
                if (this.markers[i].type === markerType)
                    return true;
            }

            return false;
        }

        remove(markers: Marker | Marker[]): void {
            if (markers instanceof Marker)
                Collection.removeFrom(this.markers, markers);

            else if (markers instanceof Array)
                for (let i = 0; i < markers.length; i++) {
                    Collection.removeFrom(this.markers, markers[i]);
                }
        }

    }

}
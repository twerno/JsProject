///<reference path="../Action.ts"/>

"use strict";

namespace jsLogic {
	
	/**
	 * RandomizeZone action
	 *
	 */
    export class RandomizeZone<T> extends BaseAction<T> {

        protected baseActionResolver(param: T): void {
            //super.baseActionResolver(param);
            randomizeArray(this.zone.entities);
        }

        constructor(public zone: Zone<Entity>) {
            super();
        };
    }

}
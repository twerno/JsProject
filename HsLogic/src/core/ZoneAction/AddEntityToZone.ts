///<reference path="../Action.ts"/>

"use strict";

namespace jsLogic {
	
	/**
	 * AddEntityToZone action
	 *
	 */
    export class AddEntityToZone<T> extends BaseAction<T> {

        protected baseActionResolver(param: T): void {
            //super.baseActionResolver(param);
            this.zone.addEntity(this.entity);
        }

        constructor(public entity: Entity, public zone: Zone<Entity>) {
            super();
        };
    }

}
///<reference path="../IAction.ts"/>

"use strict";

namespace jsLogic {
	
	/**
	 * RemoveEntityFromZone action
	 *
	 */
    export class RemoveEntityFromZone<T> extends BaseAction<T> {

        protected baseActionResolver(param: T): void {
            //super.baseActionResolver(param);
            this.zone.removeEntity(this.entity);
        }

        constructor(source: IAction<T>, public entity: Entity, public zone: Zone<Entity>) {
            super(source);
        };
    }

}
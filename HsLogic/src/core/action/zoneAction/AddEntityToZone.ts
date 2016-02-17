///<reference path="../IAction.ts"/>

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

        constructor(source: IAction<T>, public entity: Entity, public zone: Zone<Entity>) {
            super(source);
        };
    }

}
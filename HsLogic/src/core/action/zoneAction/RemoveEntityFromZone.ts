///<reference path="../IAction.ts"/>

"use strict";

namespace jsLogic {
	
	/**
	 * RemoveEntityFromZone action
	 *
	 */
    export class RemoveEntityFromZone<T> extends BaseAction<T> {

        protected baseActionResolver(_this_: RemoveEntityFromZone<T>, param: T): void {
            //super.baseActionResolver(param);
            _this_.zone.removeEntity(_this_.entity);
        }

        constructor(source: IAction<T>, public entity: Entity, public zone: Zone<Entity>) {
            super(source);
        };
    }

}
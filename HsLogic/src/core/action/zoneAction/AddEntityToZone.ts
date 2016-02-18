///<reference path="../IAction.ts"/>

"use strict";

namespace jsLogic {
	
	/**
	 * AddEntityToZone action
	 *
	 */
    export class AddEntityToZone<T> extends BaseAction<T> {

        protected baseActionResolver(_this_: AddEntityToZone<T>, param: T): void {
            //super.baseActionResolver(param);
            _this_.zone.addEntity(_this_.entity);
        }

        constructor(source: IAction<T>, public entity: Entity, public zone: Zone<Entity>) {
            super(source);
        };
    }

}
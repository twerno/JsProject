///<reference path="../IAction.ts"/>

"use strict";

namespace jsLogic {
	
	/**
	 * RandomizeZone action
	 *
	 */
    export class RandomizeZone<T> extends BaseAction<T> {

        protected baseActionResolver(_this_: RandomizeZone<T>, param: T): void {
            //super.baseActionResolver(param);
            randomizeArray(_this_.zone.getRawArray());
        }

        constructor(source: IAction<T>, public zone: Zone<Entity>) {
            super(source);
        };
    }

}
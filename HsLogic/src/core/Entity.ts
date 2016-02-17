"use strict";

namespace jsLogic {

	/**
	 *  Entity
	 *
	 */
    export class Entity {
        id: string = generateNewId();
        markers: MarkersList = new MarkersList();
        counters: CounterMap = {};

        toString(): string {
            return `[${Utils.getNameOfClass(this)}:${this.id}]`;
        }

        constructor(public owner: Entity) { }
    }




    var _entityIdGenerator: number = 0;
    
	/**
	 *  generateNewId
	 *
	 */
    export function generateNewId(): string {
        return (++_entityIdGenerator).toString();
    }

}
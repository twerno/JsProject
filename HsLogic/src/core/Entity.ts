///<reference path="Marker.ts"/>
///<reference path="Counter.ts"/>

"use strict";

namespace jsLogic {

	/**
	 *  Entity
	 *
	 */
    export class Entity {
        id: number = generateNewId();
        markers: MarkersList = new MarkersList();
        counters: CounterMap = {};

        toString(): string {
            return `[${ClassUtils.getNameOfClass( this )}:${this.id}]`;
        }

        constructor( public owner: Entity ) { }
    }




    var _entityIdGenerator: number = 0;

	/**
	 *  generateNewId
	 *
	 */
    export function generateNewId(): number {
        return ++_entityIdGenerator;
    }

}
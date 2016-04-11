"use strict";

namespace jsLogic {

	/**
	 *  Entity
	 *
	 */
    export class Entity {
        id: number = generateNewId();

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
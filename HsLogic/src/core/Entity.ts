"use strict";

namespace jsLogic {

	/**
	 *  Entity
	 *
	 */
    export class Entity {
        id: string;

        toString(): string {
            return `[${ClassUtils.getNameOfClass( this )}:${this.id}]`;
        }

        constructor( public owner: Entity ) {
            this.id = generateNewId();
        }
    }




    var _entityIdGenerator: number = 0;

	/**
	 *  generateNewId
	 *
	 */
    export function generateNewId(): string {
        return ( ++_entityIdGenerator ).toString();
    }

}
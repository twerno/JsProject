"use strict";

namespace jsLogic {


    /**
     * ZoneNotFoundException
     *
     */
    export class ZoneNotFoundException extends Error {
        constructor( public zoneId: string ) {
            super();
            this.message = `Zone "${zoneId}" not found.`;
        }
    }


	/**
	 * ZoneDuplicationException
	 *
	 */
    export class ZoneDuplicationException extends Error {
        constructor( public zoneId: string ) {
            super();
            this.message = `Zone "${zoneId}" has been already registered.`;
        }
    }


	/**
	 * EntityDoesNotExistInZoneException
	 *
	 */
    export class EntityDoesNotExistInZoneException extends Error {
        constructor( public entity: Entity, public zone: Zone<Entity> ) {
            super();
            this.message = `Entity "${entity}" does not exist in zone ${zone.zoneId}.`;
        }
    }


	/**
	 * EntityDuplicationException
	 *
	 */
    export class EntityDuplicationException extends Error {
        constructor( public entity: Entity, public zone: Zone<Entity> ) {
            super();
            this.message = `Entity "${entity}" has been already registered into ${zone.zoneId}.`;
        }
    }
}
///<reference path="../../../JSProjectECMA6/dist/jsProject6.d.ts"/>
///<reference path="Entity.ts"/>

"use strict";

namespace jsLogic {

	/**
	 * Zone<T extends Entity>
	 *
	 */
    export class Zone<T extends Entity> {
        protected _entities: T[] = [];
        protected _uuidMap: Collection.StringMap<T> = new Collection.StringMap<T>();


        removeEntity(entity: T): void {
            if (!this._uuidMap.has(entity.id))
                throw new EntityDoesNotExistInZoneException(entity, this);

            this._uuidMap.delete(entity.id);
            Collection.removeFrom(this._entities, entity);
        }


        pop(): T {
            let result: T = this._entities[this._entities.length - 1];
            this.removeEntity(result);
            return result;
        }


        addEntity(entity: T): void {
            if (this._uuidMap.has(entity.id))
                throw new EntityDuplicationException(entity, this);

            this._uuidMap.put(entity.id, entity);
            this._entities.push(entity);
        }

        has(entity: T): boolean {
            return this._entities.indexOf(entity) !== -1;
        }

        getRawArray(): T[] { return this._entities };

        get count(): number { return this._entities.length; }

        constructor(public owner: Entity, public zoneId: string) { }
    }


	/**
	 * ZoneMap<T extends Entity>
	 *
	 */
    export class ZoneMap<T extends Entity> {
        private _map: Collection.StringMap<Zone<T>> = new Collection.StringMap<Zone<T>>();


        get(zoneId: string): Zone<T> {
            if (!this._map.has(zoneId))
                throw new ZoneNotFoundException(zoneId);

            return this._map.get(zoneId);
        }


        register(zone: Zone<T>): void {
            if (this._map.has(zone.zoneId))
                throw new ZoneDuplicationException(zone.zoneId);

            this._map.put(zone.zoneId, zone);
        }
    }
}
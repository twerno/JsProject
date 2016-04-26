///<reference path="Entity.ts"/>
///<reference path="ZoneExceptions.ts"/>

"use strict";

namespace jsAction {

	/**
	 * Zone<T extends Entity>
	 *
	 */
    export class Zone<T extends Entity> {
        protected _entities: T[] = [];
        protected _uuidMap: Collection.StringMap<T> = new Collection.StringMap<T>();


        removeEntity( entity: T ): void {
            if ( !this._uuidMap.has( entity.id ) )
                throw new EntityDoesNotExistInZoneException( entity, this );

            this._uuidMap.delete( entity.id );
            Collection.removeFrom( this._entities, entity );
        }


        pop(): T {
            let result: T = this._entities[this._entities.length - 1] || null;
            this.removeEntity( result );
            return result;
        }


        addEntity( entity: T, position?: number ): void {
            if ( this._uuidMap.has( entity.id ) )
                throw new EntityDuplicationException( entity, this );

            this._uuidMap.put( entity.id, entity );
            this._entities.splice( this._computePosition( position ), 0, entity );
        }

        private _computePosition( position: number ): number {
            if ( !position )
                return this._entities.length;
            if ( position < 0 )
                return 0;
            else if ( position > this._entities.length )
                return this._entities.length;

            return position;
        }

        has( entity: T ): boolean {
            return this._entities.indexOf( entity ) !== -1;
        }

        getRawArray(): T[] { return this._entities };

        get length(): number { return this._entities.length; }

        get owner(): Entity { return this.zoneMap.owner; }

        constructor( public zoneMap: ZoneMap<Entity, Zone<Entity>>, public zoneId: string ) { }
    }


    /**
     * ZoneMap<T extends Entity>
     *
     */
    export class ZoneMap<T extends Entity, Z extends Zone<T>> {
        _map: Collection.IStringMap<Z> = {};


        get( zoneId: string ): Z {
            if ( !this._map.hasOwnProperty( zoneId ) )
                throw new ZoneNotFoundException( zoneId );

            return this._map[zoneId];
        }


        register( zone: Z ): void {
            if ( this._map.hasOwnProperty( zone.zoneId ) )
                throw new ZoneDuplicationException( zone.zoneId );

            this._map[zone.zoneId] = zone;
        }

        getAsArray(): Z[] {
            let result: Z[];
            for ( let s in this._map )
                result.push( this._map[s] );
            return result;
        }

        constructor( public owner: Entity ) { }
    }
}
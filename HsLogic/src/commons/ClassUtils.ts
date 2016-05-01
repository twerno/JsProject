"use strict";

namespace ClassUtils {

    export function getNameOfClass( constructor: Function ): string;
    export function getNameOfClass( clazz: Object ): string;
    export function getNameOfClass( x: any ): string {
        if ( typeof ( x ) === typeof ( Function ) )
            return x.name;
        else if ( typeof ( x ) === typeof ( {}) )
            return x.constructor.name;
        else
            throw new Error( `"${x}" is not a valid class.` );

        // in case of compatibility issues there is an alternative approach
        // see: https://www.stevefenton.co.uk/Content/Blog/Date/201304/Blog/Obtaining-A-Class-Name-At-Runtime-In-TypeScript/
    }

    export function create<T>( _constructor: Function ): T {
        return <T>Object.create( _constructor );
    }


    //export function getClassType( _constructor: Function ): string {
    //    return getConstructorName( _constructor );
    //}


    export class ObjectValidator {

        private _entries: ObjectValidatorEntry[] = [];

        addType( name: string, type: string, required?: boolean ): ObjectValidator {
            this._entries.push( new ObjectValidatorEntry( name, type, null, required || true ) );

            return this;
        }

        addClass( name: string, clazz: Function, required?: boolean ): ObjectValidator {
            this._entries.push( new ObjectValidatorEntry( name, 'object', clazz, required || true ) );
            return this;
        }

        validate( object: Object ): boolean {
            let value: any;

            for ( let entry of this._entries ) {
                if ( !deepHasOwnProperty( entry.name, object ) ) {
                    if ( entry.required )
                        return false;
                    else
                        continue;
                }

                value = deepKeyValue( entry.name, object );
                if ( typeof ( value ) !== entry.type
                    || ( entry.clazz && !( value instanceof entry.clazz ) ) )
                    return false;
            }

            return true;
        }

        static addType( name: string, type: string, required?: boolean ): ObjectValidator {
            let validator: ObjectValidator = new ObjectValidator();
            return validator.addType( name, type, required );
        }

        static addClass( name: string, clazz: Function, required?: boolean ): ObjectValidator {
            let validator: ObjectValidator = new ObjectValidator();
            return validator.addClass( name, clazz, required );
        }

    }


    class ObjectValidatorEntry {

        constructor( public name: string, public type: string, public clazz: Function, public required: boolean ) { }
    }


    export function deepHasOwnProperty( deepKey: string, map: any ): any {
        let dotIdx: number = deepKey.indexOf( '.' ),
            result: any;

        if ( map === null || map === undefined || typeof ( map ) !== 'object' )
            return false;

        if ( dotIdx > -1 )
            return deepHasOwnProperty( deepKey.substr( dotIdx + 1 ), map[deepKey.substr( 0, dotIdx )] );
        else
            return map.hasOwnProperty( deepKey );
    }


    export function deepKeyValue( deepKey: string, map: any ): any {
        let dotIdx: number = deepKey.indexOf( '.' ),
            result: any;

        if ( map === null || map === undefined || typeof ( map ) !== 'object' )
            return undefined;

        if ( dotIdx > -1 )
            return deepKeyValue( deepKey.substr( dotIdx + 1 ), map[deepKey.substr( 0, dotIdx )] );
        else
            return map[deepKey];
    }

}

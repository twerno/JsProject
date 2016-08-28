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

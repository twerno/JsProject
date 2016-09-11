//export function getNameOfClass( constructor: Function ): string;
//export function getNameOfClass( x: Object ): string;
export function getNameOfClass( x: any ): string {
    if ( typeof ( x ) === 'function' )
        return x.name;
    else if ( typeof ( x ) === 'object' )
        return x.constructor.name;
    else
        throw new Error( `"${x}" is not a valid class.` );

    // in case of compatibility issues there is an alternative approach
    // see: https://www.stevefenton.co.uk/Content/Blog/Date/201304/Blog/Obtaining-A-Class-Name-At-Runtime-In-TypeScript/
} 

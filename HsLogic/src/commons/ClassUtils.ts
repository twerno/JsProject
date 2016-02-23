"use strict";

namespace ClassUtils {


    function getConstructorName(_constructor: Function): string {
        if (_constructor && _constructor.name)
            return _constructor.name;
        else
            throw new Error(`Constructor ${_constructor} does not have a 'name' property.`);
    }

    export function getNameOfClass(inputClass: Object): string {
        //// see: https://www.stevefenton.co.uk/Content/Blog/Date/201304/Blog/Obtaining-A-Class-Name-At-Runtime-In-TypeScript/

        //var funcNameRegex = /function (.{1,})\(/;
        //var results = (funcNameRegex).exec((<any> inputClass).constructor.toString());
        //return (results && results.length > 1) ? results[1] : '';
        return inputClass && inputClass.constructor && getConstructorName(inputClass.constructor);
    }


    export function create<T>(_constructor: Function): T {
        return <T>Object.create(_constructor);
    }


    export function getClassType(_constructor: Function): string {
        return getConstructorName(_constructor);
    }
}

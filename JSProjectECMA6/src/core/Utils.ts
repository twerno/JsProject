"use strict";

namespace Utils {



    // Function does not have parametr "name" (ES3, ES5)
    interface IFunctionWithNameParam extends Function {
        name: string;
    }

    export function getNameOfClass(inputClass: Object): string {
        //// see: https://www.stevefenton.co.uk/Content/Blog/Date/201304/Blog/Obtaining-A-Class-Name-At-Runtime-In-TypeScript/

        //var funcNameRegex = /function (.{1,})\(/;
        //var results = (funcNameRegex).exec((<any> inputClass).constructor.toString());
        //return (results && results.length > 1) ? results[1] : '';
        return inputClass && inputClass.constructor && ((<IFunctionWithNameParam>inputClass.constructor).name || 'Unknown class name!');
    }
}

"use strict";

namespace ClassUtils {

    export class ObjectValidator {

        private _entries: ObjectValidatorEntry[] = [];

        STRING( key: string ): ObjectValidator {
            return this.addEntry( key, 'string', null );
        }

        NUMBER( key: string ): ObjectValidator {
            return this.addEntry( key, 'number', null );
        }

        BOOLEAN( key: string ): ObjectValidator {
            return this.addEntry( key, 'boolean', null );
        }

        FUNCTION( key: string ): ObjectValidator {
            return this.addEntry( key, 'function', Function );
        }

        OBJECT( key: string, clazz?: Function ): ObjectValidator {
            return this.addEntry( key, 'object', clazz || null );
        }

        get OPTIONAL(): ObjectValidator {
            if ( this._entries.length > 0 )
                this._entries[this._entries.length - 1].optional = true;
            return this;
        }

        private addEntry( key: string, type: string, clazz: Function ): ObjectValidator {
            this._entries.push( new ObjectValidatorEntry( key, type, clazz, false ) );
            return this;
        }

        validate( object: Object ): boolean {
            let value: any;

            for ( let entry of this._entries ) {
                if ( !ClassUtils.deepHasOwnProperty( entry.name, object ) ) {
                    if ( entry.optional )
                        continue;
                    else
                        return false;
                }

                value = ClassUtils.deepKeyValue( entry.name, object );
                if ( typeof ( value ) !== entry.type
                    || ( entry.clazz && !( value instanceof entry.clazz ) ) )
                    return false;
            }

            return true;
        }

        static STRING( key: string ): ObjectValidator {
            return new ObjectValidator().STRING( key );
        }

        static NUMBER( key: string ): ObjectValidator {
            return new ObjectValidator().NUMBER( key );
        }

        static BOOLEAN( key: string ): ObjectValidator {
            return new ObjectValidator().BOOLEAN( key );
        }

        static FUNCTION( key: string ): ObjectValidator {
            return new ObjectValidator().FUNCTION( key );
        }

        static OBJECT( key: string, clazz?: Function ): ObjectValidator {
            return new ObjectValidator().OBJECT( key, clazz || null );
        }

    }

    class ObjectValidatorEntry {

        constructor( public name: string, public type: string, public clazz: Function, public optional: boolean ) { }
    }

}
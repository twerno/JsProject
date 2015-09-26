"use strict";

namespace smartObj {

    export enum SmartObjectType { STRING, NUMBER, SMART_OBJECT, SMART_OBJECT_COLLECTION, COLLECTION }
    export interface ISmartObjectMemberMap { [member: string]: SmartObjectType }

    export namespace internal { 
    
        export enum SmartObjectFlag { NONE, IS_NULL, IS_UNDEFINED, IS_REF } 
        export interface ISmartObjectMap { [id: string]: SmartObject };   
        
        export interface ISmartObjectData 
        {
            id?: string,
            type: SmartObjectType,
            flag: SmartObjectFlag,
            clazz?: string,
            jsonData?: string,
            members?: { [key: string]: ISmartObjectData }
        }


        export class SmartObjectHelper {
            static validateSmartObjId(smartObjId: string): void {
                if (smartObjId === '' || smartObjId === null || smartObjId === undefined)
                    throw new Error(`SmartObj id can't be empty!`);
            }
        


            static validateDuplicateId(smartObj: SmartObject, smartObjCache: internal.ISmartObjectMap) : void {
                let cacheObj: SmartObject = smartObjCache[smartObj.id] || null;
                if (cacheObj != null && cacheObj != smartObj) 
                    throw new Error(`Duplicated id: ${smartObj.id}`);
            }
        }
    }

             
    export class SmartObjectBuilder {
        private map: IObjectMap = {};


        register(clazz: string, prototype: Object) {
            this.validateClazz(clazz);
            this.validatePrototype(clazz, prototype);

            this.map[clazz] = prototype;
        }


        build(clazz: string): SmartObject {
            this.validateClazz(clazz);

            let prototype: Object = this.map[clazz] || null;
            if (prototype === null)
                throw new Error(`No SmartObject "${clazz}" registered!`);

            return Object.create(prototype, { });
        }


        private validateClazz(clazz: string): void {
            if (clazz === '' || clazz === null || clazz === undefined)
                throw new Error(`Clazz can't be empty!`);
        }

        private validatePrototype(clazz: string, prototype: Object): void {
            let cachedPrototype: Object = this.map[clazz] || null;
            if (cachedPrototype != null && cachedPrototype != prototype)
                throw new Error(`Duplicated clazz name: "${clazz}"`); 
        }
    }

                                                                 
    export class SmartObject {

        id: string;

        getMetadata(): ISmartObjectMemberMap {
            return {};
        }
    
        clazz(): string {
            return this.constructor['name'];
        } 
    }

}
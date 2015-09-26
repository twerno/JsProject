"use strict";

namespace smartObj {

    export enum SmartObjectType { STRING, NUMBER, SMART_OBJECT, SMART_OBJECT_COLLECTION, COLLECTION, IGNORED }
    export interface ISmartObjectMemberMap { [member: string]: SmartObjectType }



    export class SmartObject {

        id: string;

        get metadata(): ISmartObjectMemberMap {
            return {};
        }
    
        get clazz(): string {
            return this.constructor['name'];
        } 
    }




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


            static validateMetadataOf(smartObject: SmartObject): void {
                let metadata: ISmartObjectMemberMap = smartObject.metadata;

                for (let key in smartObj) {
                    if (!(key in metadata))
                        throw new Error(`Metadata of "${smartObject.clazz}" does not describe member "${key}".`);

                    if (SmartObjectType[metadata[key]] === undefined)
                        throw new Error(`Metadata of "${smartObject.clazz}" contains unknown code "${metadata[key]}".`);
                }
            }
        }
    }

}
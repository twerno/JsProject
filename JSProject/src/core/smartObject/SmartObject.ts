"use strict";

namespace smartObj {

    export enum SmartObjectType { STRING, NUMBER, SMART_OBJECT, SMART_OBJECT_COLLECTION, COLLECTION, IGNORED }
    export interface ISmartObjectMemberMap { [member: string]: SmartObjectType }
    export interface ISmartObjectMap { [id: string]: SmartObject };


    export class SmartObject {

        id: string;

        getMetadata(): ISmartObjectMemberMap {
            throw new Error(`getMetadata(): not implemented yet.`)
        }

        getClazz(): string {
            return this.constructor['name'];
        }

        static build(): SmartObject {
            throw new Error(`getNewObj(): not implemented yet.`)
        }
    }




    export namespace internal {

        export enum SmartObjectFlag { NONE, IS_NULL, IS_UNDEFINED, IS_REF }


        export interface ISmartObjectData {
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


            static validateDuplicateId(smartObj: SmartObject, smartObjCache: ISmartObjectMap): void {
                let cacheObj: SmartObject = smartObjCache[smartObj.id] || null;
                if (cacheObj != null && cacheObj != smartObj)
                    throw new Error(`Duplicated id: ${smartObj.id}`);
            }


            static validateMetadataOf(smartObject: SmartObject): void {
                let metadata: ISmartObjectMemberMap = smartObject.getMetadata();

                for (let key in smartObject) {
                    if (!smartObject.hasOwnProperty(key) || key === 'id')
                        continue;

                    if (!(key in metadata))
                        throw new Error(`Metadata of "${smartObject.getClazz() }" does not describe member "${key}".`);

                    if (SmartObjectType[metadata[key]] === undefined)
                        throw new Error(`Metadata of "${smartObject.getClazz() }" contains unknown code "${metadata[key]}".`);
                }
            }
        }
    }

}
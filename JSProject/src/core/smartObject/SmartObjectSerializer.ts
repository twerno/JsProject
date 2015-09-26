﻿///<reference path="SmartObject.ts"/>

namespace smartObj {

    export class SmartObjectSerializer {

        private smartObjCache: ISmartObjectMap = {}; 

        serialize(smart: SmartObject): string {
            return JSON.stringify(this.smartObj2Data(smart));
        }



        private string2Data(value: string): ISmartObjectData {
            if (value === null || value === undefined)
                return this.getEmptySmartObjData(smartObj, SmartObjectType.STRING);
         
            else if (typeof value === 'string') 
                return {
                    type: SmartObjectType.STRING,
                    flag: SmartObjectFlag.NONE,
                    jsonData: JSON.stringify(value)
                };
            else
                throw new Error(`Value type is not a "string"!`);
        }
    


        private number2Data(value: number): ISmartObjectData {
            if (value === null || value === undefined)
                return this.getEmptySmartObjData(smartObj, SmartObjectType.NUMBER); 

            else if (typeof value === 'number')
                return {
                    type: SmartObjectType.NUMBER,
                    flag: SmartObjectFlag.NONE,
                    jsonData: JSON.stringify(value)
                };
            else
                throw new Error(`Value type is not a "number"!`);
        }
    
    
    
        private smartObj2Data(smartObj: SmartObject): ISmartObjectData {
            SmartObjectHelper.validateSmartObjId(smartObj.id);
            SmartObjectHelper.validateDuplicateId(smartObj, this.smartObjCache);
             
            if (smartObj === null || smartObj === undefined)
                return this.getEmptySmartObjData(smartObj, SmartObjectType.SMART_OBJECT);

            if (!(smartObj instanceof SmartObject))
                throw new Error(`Value is not a "SmartObject"!`);

            let result: ISmartObjectData = this.getFromCache(smartObj);

            if (result != null)
                return result;
            
            this.putIntoCache(smartObj);

            result = {
                id: smartObj.id,
                type: SmartObjectType.SMART_OBJECT,
                flag: SmartObjectFlag.NONE,
                clazz: smartObj.clazz(),
                members: {} 
            };

            this.smartObj2DataFillMembers(smartObj, result);
            return result; 
        }



        private smartObj2DataFillMembers(smartObj: SmartObject, result: ISmartObjectData): void {
            let meta: ISmartObjectMemberMap = smartObj.getMetadata();
            let isEmpty: boolean = true;
            
            for (let key in meta) {
                isEmpty = false;

                if (meta[key] === SmartObjectType.STRING)
                    result.members[key] = this.string2Data(smartObj[key]);
            
                else if (meta[key] === SmartObjectType.NUMBER)
                    result.members[key] = this.number2Data(smartObj[key]);

                else if (meta[key] === SmartObjectType.SMART_OBJECT)
                    result.members[key] = this.smartObj2Data(smartObj[key]);

                else if (meta[key] === SmartObjectType.SMART_OBJECT_COLLECTION)
                    result.members[key] = this.smartCollection2Data(smartObj[key]);

                else if (meta[key] === SmartObjectType.COLLECTION)
                    result.members[key] = this.collection2Data(smartObj[key]);

                else 
                    throw new Error(`"meta[key]" is not a valid SmartObjectType.`);
            }

            if (isEmpty)
                delete result.members;
        }



        private getFromCache(smartObj: SmartObject): ISmartObjectData {
            let cacheObj: SmartObject = this.smartObjCache[smartObj.id] || null;
            if (cacheObj === null)
                return null;
            else  
                return {
                    id: smartObj.id,
                    flag: SmartObjectFlag.IS_REF,
                    type: SmartObjectType.SMART_OBJECT,
                    clazz: smartObj.clazz()
                };
        }



        private putIntoCache(smartObj: SmartObject): void {
            this.smartObjCache[smartObj.id] = smartObj; 
        }



        private smartCollection2Data(collection: SmartObject[] | ISmartObjectMap): ISmartObjectData {
            if (collection === null || collection === undefined)
                return this.getEmptySmartObjData(collection, SmartObjectType.SMART_OBJECT_COLLECTION);

            let result: ISmartObjectData = {
                type: SmartObjectType.SMART_OBJECT_COLLECTION,
                flag: SmartObjectFlag.NONE,
                clazz: collection instanceof Array ? 'Array' : 'Object', 
                members: {} 
            };

            for (var key in collection)
                result.members[key] = this.smartObj2Data(collection[key]);
        
            return result;
        }  



        private collection2Data(collection: any[] | Object): ISmartObjectData {
            if (collection === null || collection === undefined)
                return this.getEmptySmartObjData(collection, SmartObjectType.COLLECTION);

            return {
                type: SmartObjectType.COLLECTION,
                flag: SmartObjectFlag.NONE,
                clazz: collection instanceof Array ? 'Array' : 'Object',
                jsonData: JSON.stringify(collection)
            };
        }



        private getEmptySmartObjData(emptyObject: Object, smartObjectType: SmartObjectType): ISmartObjectData {
            return {
                type: smartObjectType,
                flag: smartObj === null ? SmartObjectFlag.IS_NULL : SmartObjectFlag.IS_UNDEFINED
            };
        }
    }
}
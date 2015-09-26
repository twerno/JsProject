///<reference path="SmartObject.ts"/>

"use strict";

namespace smartObj {

    export class SmartObjectDeserializer<T extends SmartObject> {
        private smartObjCache: internal.ISmartObjectMap = {};
        private smartObjRef2Fill: internal.ISmartObjectMap = {};


        constructor (private builder: SmartObjectBuilder) {}
        
          

        deserialize(serializedObj: string): T {
            let serializedData: internal.ISmartObjectData = JSON.parse(serializedObj); 
            let result: SmartObject = this.getAsSmartObject(serializedData);

            if (!this.areAllSmartObjectFilled())
                throw new Error(`Not every smart object are build properly!`);

            return <T> result;
        }



        private getAsSmartObject(data: internal.ISmartObjectData): SmartObject {
            let result: SmartObject;
            
            if (this.isEmpty(data))
                result = this.getAsEmpty(data);

            else if (data.flag === internal.SmartObjectFlag.IS_REF)
                result = this.getOrCreateSmartObject(data);

            else {
                result = this.getOrCreateSmartObject(data);
                this.fillRef(result, data);
            } 

            return result;
        }



        private getOrCreateSmartObject(data: internal.ISmartObjectData): SmartObject {
            internal.SmartObjectHelper.validateSmartObjId(data.id);
            let result: SmartObject = this.smartObjCache[data.id] || null;

            if (result === null) {
                result = this.builder.build(data.clazz);
                result.id = data.id;

                this.smartObjCache[data.id] = result;
                this.smartObjRef2Fill[data.id] = result;
            }

            return result;
        }
        
        
        
        private fillRef(smartObj: SmartObject, data: internal.ISmartObjectData): void {
            if ((this.smartObjRef2Fill[data.id] || null) === null)
                throw new Error(`SmartObject ${data.id} has been filled already.`);
            else
                delete this.smartObjRef2Fill[data.id];

            this.members2SmartObject(data, smartObj);
        }



        private members2SmartObject(data: internal.ISmartObjectData, obj2Fill: Object): void {
            let member: internal.ISmartObjectData;

            if ((data.members || null) != null)
                for (let key in data.members) {
                    member = data.members[key] || null;

                    if (member === null)
                        throw new Error(`SmartObject: ${data.id}; clazz: ${data.clazz}; Member at "${key}" is NULL!`);

                    if (this.isEmpty(member))
                        obj2Fill[key] = this.getAsEmpty(member);

                    else if (member.type === SmartObjectType.STRING)
                        obj2Fill[key] = this.getAsString(member);         

                    else if (member.type === SmartObjectType.NUMBER)
                        obj2Fill[key] = this.getAsNumber(member);

                    else if (member.type === SmartObjectType.SMART_OBJECT_COLLECTION)
                        obj2Fill[key] = this.getAsSmartObjectCollection(member);

                    else if (member.type === SmartObjectType.SMART_OBJECT)
                        obj2Fill[key] = this.getAsSmartObject(member);

                    else if (member.type === SmartObjectType.COLLECTION)
                        obj2Fill[key] = this.getAsCollection(member);
                }
        }



        private isEmpty(data: internal.ISmartObjectData): boolean {
            return data.flag === internal.SmartObjectFlag.IS_NULL || data.flag === internal.SmartObjectFlag.IS_UNDEFINED; 
        }



        private getAsEmpty(data: internal.ISmartObjectData): any {
            if (data.flag === internal.SmartObjectFlag.IS_NULL)
                return null;
            else if (data.flag === internal.SmartObjectFlag.IS_UNDEFINED)
                return undefined;
        }



        private getAsString(data: internal.ISmartObjectData): string {
            let result = JSON.parse(data.jsonData);

            if (typeof result != 'string')
                throw new Error(`String expected, ${typeof result} received.`);

            return result;
        }
        
       
         
        private getAsNumber(data: internal.ISmartObjectData): number {
            let result: number = JSON.parse(data.jsonData);

            if (typeof result != 'number')
                throw new Error(`Number expected, ${typeof result} received.`);

            return result;
        }
        

        
        private getAsSmartObjectCollection(data: internal.ISmartObjectData): SmartObject[] | internal.ISmartObjectMap {
            let result: SmartObject[] | internal.ISmartObjectMap;

            if (data.clazz === 'Array')
                result = [];
            else
                result = {};

            this.members2SmartObject(data, result);

            return result;
        }
        


        private getAsCollection(data: internal.ISmartObjectData): Object[] | Object {
            let result: Object[] | Object = JSON.parse(data.jsonData);

            if (data.clazz === 'Array' && !(result instanceof Array))
                throw new Error(`Array expected, ${typeof result} received.`);
            if (data.clazz === 'Object' && !(result instanceof Object))
                throw new Error(`Object expected, ${typeof result} received.`);

            return result;
        }
        
        
        
        private areAllSmartObjectFilled(): boolean {

            let isEmpty: boolean = true;
            for (let key in this.smartObjRef2Fill) {
                isEmpty = false;
                break;
            } 

            return isEmpty;
        } 
    }
}
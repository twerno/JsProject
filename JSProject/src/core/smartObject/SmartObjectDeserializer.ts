///<reference path="SmartObject.ts"/>

namespace smartObj {

    export class SmartObjectDeserializer<T extends SmartObject> {
        private smartObjCache: ISmartObjectMap = {};
        private smartObjRef2Fill: ISmartObjectMap = {};

        private builder: SmartObjectBuilder; 

        deserialize(serializedObj: string): T {
            let serializedData: ISmartObjectData = JSON.parse(serializedObj); 
            let result: SmartObject = this.getAsSmartObject(serializedData);

            if (!this.areAllSmartObjectFilled())
                throw new Error(`Not every smart object are build properly!`);

            return <T> result;
        }



        private getAsSmartObject(data: ISmartObjectData): SmartObject {
            let result: SmartObject;
            
            if (data.flag in [SmartObjectFlag.IS_NULL, SmartObjectFlag.IS_UNDEFINED])
                result = this.getAsEmpty(data);

            else if (data.flag === SmartObjectFlag.IS_REF)
                result = this.getOrCreateSmartObject(data);

            else {
                result = this.getOrCreateSmartObject(data);
                this.fillRef(result, data);
            } 

            return result;
        }



        private getOrCreateSmartObject(data: ISmartObjectData): SmartObject {
            SmartObjectHelper.validateSmartObjId(data.id);
            let result: SmartObject = this.smartObjCache[data.id];

            if (result === null) {
                result = this.builder.build(data.clazz);
                result.id = data.id;

                this.smartObjCache[data.id] = result;
                this.smartObjRef2Fill[data.id] = result;
            }

            return result;
        }
        
        
        
        private fillRef(smartObj: SmartObject, data: ISmartObjectData): void {
            if ((this.smartObjRef2Fill[data.id] || null) === null)
                throw new Error(`SmartObject ${data.id} has been filled already.`);
            else
                delete this.smartObjRef2Fill[data.id];

            this.members2SmartObject(data, smartObj);
        }



        private members2SmartObject(data: ISmartObjectData, obj2Fill: Object): void {
            let member: ISmartObjectData;

            if ((data.members || null) != null)
                for (let key in data.members) {
                    member = data.members[key];

                    if (member.flag in [SmartObjectFlag.IS_NULL, SmartObjectFlag.IS_UNDEFINED])
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



        private getAsEmpty(data: ISmartObjectData): any {
            if (data.flag === SmartObjectFlag.IS_NULL)
                return null;
            else if (data.flag === SmartObjectFlag.IS_UNDEFINED)
                return undefined;
        }



        private getAsString(data: ISmartObjectData): string {
            let result = JSON.parse(data.jsonData);

            if (typeof result != 'string')
                throw new Error(`String expected, ${typeof result} received.`);

            return result;
        }
        
       
         
        private getAsNumber(data: ISmartObjectData): number {
            let result: number = JSON.parse(data.jsonData);

            if (typeof result != 'number')
                throw new Error(`Number expected, ${typeof result} received.`);

            return result;
        }
        

        
        private getAsSmartObjectCollection(data: ISmartObjectData): SmartObject[] | ISmartObjectMap {
            let result: SmartObject[] | ISmartObjectMap;

            if (data.clazz === 'Array')
                result = [];
            else
                result = {};

            this.members2SmartObject(data, result);

            return result;
        }
        


        private getAsCollection(data: ISmartObjectData): Object[] | Object {
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
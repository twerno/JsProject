///<reference path="../../../JSProject/dist/jsProject.d.ts"/>
///<reference path="../tsUnit.ts" />

"use strict";

module SmartObjectTest {

    let builder: smartObj.SmartObjectBuilder = new smartObj.SmartObjectBuilder();
    let serializer: smartObj.SmartObjectSerializer = new smartObj.SmartObjectSerializer(builder);
    let deserializer: smartObj.SmartObjectDeserializer<TestObject> = new smartObj.SmartObjectDeserializer<TestObject>(builder);

    class TestObject extends smartObj.SmartObject {
        testSmartObj: TestObject2 = new TestObject2();
        smartArray: smartObj.SmartObject[] = [];
        smartMap: smartObj.ISmartObjectMap = {};

        privateStr: string;
        
        getMetadata(): smartObj.ISmartObjectMemberMap { 
            return { 
                ['testSmartObj']: smartObj.SmartObjectType.SMART_OBJECT, 
                ['smartArray']: smartObj.SmartObjectType.SMART_OBJECT_COLLECTION,
                ['smartMap']: smartObj.SmartObjectType.SMART_OBJECT_COLLECTION,
                ['privateStr']: smartObj.SmartObjectType.IGNORED
            };
        } 
    }

    class TestObject2 extends smartObj.SmartObject {
        testVal: string = 'testVal';
        testNumber: number = 999;
        testArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        testMap: Object = {'1':1, 2:2, 3:3};

        getMetadata(): smartObj.ISmartObjectMemberMap {
            return { 
                ['testVal']: smartObj.SmartObjectType.STRING,
                ['testNumber']: smartObj.SmartObjectType.NUMBER,
                ['testArray']: smartObj.SmartObjectType.COLLECTION,
                ['testMap']: smartObj.SmartObjectType.COLLECTION
            };
        }
    }

    builder.register('TestObject', TestObject.prototype); 
    builder.register('TestObject2', TestObject2.prototype);

    let testObj1: TestObject = new TestObject();
    testObj1.id = '1';
    testObj1.testSmartObj.id = '2';
    
    testObj1.privateStr = 'secret';
    testObj1.smartArray.push(testObj1.testSmartObj); 
    testObj1.smartMap[testObj1.testSmartObj.id] = testObj1.testSmartObj;

    let testObj2: TestObject = new TestObject();
    testObj2.id = '3';
    testObj2.testSmartObj.id = '4';
    testObj1.smartArray.push(testObj2); 
    testObj1.smartMap[testObj2.id] = testObj2;
      
    export class BasicTests extends tsUnit.TestClass {

        deserializationTest() {
            let serialized: string = serializer.serialize(testObj1);
            let deserialized: TestObject = deserializer.deserialize(serialized);

            this.isTrue(deserialized instanceof TestObject, 'instanceof TestObject');
            this.areNotIdentical(testObj1, deserialized);
            this.areIdentical(testObj1.clazz(), deserialized.clazz(), 'TestObject.clazz()');
            this.areIdentical(JSON.stringify(testObj1.getMetadata()), JSON.stringify(deserialized.getMetadata()), 'TestObject.getMetadata');
            this.areIdentical(testObj1.id, deserialized.id, 'TestObject.id');

            this.areIdentical(testObj1.testSmartObj.clazz(), deserialized.testSmartObj.clazz(), 'TestObject2.clazz()');
            this.areIdentical(JSON.stringify(testObj1.testSmartObj.getMetadata()), 
                JSON.stringify(deserialized.testSmartObj.getMetadata()), 'TestObject2.getMetadata');
            this.areIdentical(testObj1.testSmartObj.id, deserialized.testSmartObj.id, 'TestObject2.id');

            this.areIdentical(testObj1.testSmartObj.testVal, deserialized.testSmartObj.testVal, 'TestObject2.testVal');
            this.areIdentical(testObj1.testSmartObj.testNumber, deserialized.testSmartObj.testNumber, 'TestObject2.testNumber');
            this.areCollectionsIdentical(testObj1.testSmartObj.testArray, deserialized.testSmartObj.testArray, 'TestObject2.testArray');
            this.areIdentical(JSON.stringify(testObj1.testSmartObj.testMap), 
                JSON.stringify(deserialized.testSmartObj.testMap), 'TestObject2.testMap');
        }

    }
}


// new instance of tsUnit - pass in modules that contain test classes
var test = new tsUnit.Test(SmartObjectTest);

// Use the built in results display
test.showResults(document.getElementById('result'), test.run());

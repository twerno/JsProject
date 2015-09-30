///<reference path="../../../JSProject/dist/jsProject.d.ts"/>
///<reference path="../tsUnit.ts" />

"use strict";

class TestObject extends smartObj.SmartObject {
    testSmartObj: TestObject2 = new TestObject2();
    smartArray: smartObj.SmartObject[] = [];
    smartMap: smartObj.ISmartObjectMap = {};

    privateStr: string = 'secret';

    getMetadata(): smartObj.ISmartObjectMemberMap {
        return {
            ['testSmartObj']: smartObj.SmartObjectType.SMART_OBJECT,
            ['smartArray']: smartObj.SmartObjectType.SMART_OBJECT_COLLECTION,
            ['smartMap']: smartObj.SmartObjectType.SMART_OBJECT_COLLECTION,
            ['privateStr']: smartObj.SmartObjectType.IGNORED
        };
    }

    static build(): TestObject {
        return new TestObject();
    }
}

class TestObject2 extends smartObj.SmartObject {
    testVal: string = 'testVal';
    testNumber: number = 999;
    testArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    testMap: Object = { '1': 1, 2: 2, 3: 3 };

    getMetadata(): smartObj.ISmartObjectMemberMap {
        return {
            ['testVal']: smartObj.SmartObjectType.STRING,
            ['testNumber']: smartObj.SmartObjectType.NUMBER,
            ['testArray']: smartObj.SmartObjectType.COLLECTION,
            ['testMap']: smartObj.SmartObjectType.COLLECTION
        };
    }

    static build(): TestObject2 {
        return new TestObject2();
    }
}

interface ITestEnvironment {
    testObjects: TestObject[],
    serializer: smartObj.SmartObjectSerializer,
    deserializer: smartObj.SmartObjectDeserializer<TestObject>
};


class TestObjectFactory {

    private numerator: number = 0;

    getID(): string {
        return (this.numerator++).toString()
    }

    getTestObject1(): TestObject {
        let testObj1: TestObject = new TestObject();
        testObj1.id = this.getID();
        testObj1.testSmartObj.id = this.getID();
        return testObj1;
    }

    getBuilder(): smartObj.SmartObjectBuilder {
        let builder: smartObj.SmartObjectBuilder = new smartObj.SmartObjectBuilder();
        builder.register('TestObject', TestObject.build);
        builder.register('TestObject2', TestObject2.build);
        return builder;
    }

    testEnvironment1(): ITestEnvironment {
        let testObj1: TestObject = this.getTestObject1();
        testObj1.smartArray.push(testObj1.testSmartObj);
        testObj1.smartMap[testObj1.testSmartObj.id] = testObj1.testSmartObj;

        let testObj2: TestObject = this.getTestObject1();
        testObj1.smartArray.push(testObj2);
        testObj1.smartMap[testObj2.id] = testObj2;

        let builder: smartObj.SmartObjectBuilder = this.getBuilder();

        let serializer: smartObj.SmartObjectSerializer = new smartObj.SmartObjectSerializer(builder);
        let deserializer: smartObj.SmartObjectDeserializer<TestObject> = new smartObj.SmartObjectDeserializer<TestObject>(builder);

        return {
            testObjects: [testObj1],
            serializer: serializer,
            deserializer: deserializer
        }
    }
}

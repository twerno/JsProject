///<reference path="../../../JSProject/dist/JSProject.d.ts"/>
///<reference path="../tsUnit.ts" />
///<reference path="TestObjectFactory.ts" />

"use strict";

module TestModule {

    let factory: TestObjectFactory = new TestObjectFactory();

    export class AsyncTests extends tsUnit.AsyncSetUpTestClass {

        constructor() {
            super();
            this.setUpTimeLimit = 3 * 1000;
        }

        asyncSetUp(onSuccess: asyncRunner.AsyncTaskSuccess, onFailure: asyncRunner.AsyncTaskFailure): void {
            //    setTimeout((): void => { onSuccess(null); }, 2000);
        }

        basicTest() {
            this.isTrue(true, 'dummy test');
        }

    }

    export class SmartObjectBasicTests extends tsUnit.TestClass {

        deserializationTest() {
            let testEnvironment: ITestEnvironment = factory.testEnvironment1();
            let testObj1: TestObject = testEnvironment.testObjects[0];

            let serialized: string = testEnvironment.serializer.serialize(testObj1);
            let deserialized: TestObject = testEnvironment.deserializer.deserialize(serialized);

            this.isTrue(deserialized instanceof TestObject, 'instanceof TestObject');
            this.areNotIdentical(testObj1, deserialized);
            this.areIdentical(testObj1.getClazz(), deserialized.getClazz(), 'TestObject.getClazz()');
            this.areIdentical(JSON.stringify(testObj1.getMetadata()), JSON.stringify(deserialized.getMetadata()), 'TestObject.getMetadata');
            this.areIdentical(testObj1.id, deserialized.id, 'TestObject.id');

            this.areIdentical(testObj1.testSmartObj.getClazz(), deserialized.testSmartObj.getClazz(), 'TestObject2.getClazz()');
            this.areIdentical(JSON.stringify(testObj1.testSmartObj.getMetadata()),
                JSON.stringify(deserialized.testSmartObj.getMetadata()), 'TestObject2.getMetadata');
            this.areIdentical(testObj1.testSmartObj.id, deserialized.testSmartObj.id, 'TestObject2.id');

            this.areIdentical(testObj1.testSmartObj.testVal + '1', deserialized.testSmartObj.testVal, 'TestObject2.testVal');
            this.areIdentical(testObj1.testSmartObj.testNumber, deserialized.testSmartObj.testNumber, 'TestObject2.testNumber');
            this.areCollectionsIdentical(testObj1.testSmartObj.testArray, deserialized.testSmartObj.testArray, 'TestObject2.testArray');
            this.areIdentical(JSON.stringify(testObj1.testSmartObj.testMap),
                JSON.stringify(deserialized.testSmartObj.testMap), 'TestObject2.testMap');
            this.areIdentical(deserialized.privateStr, undefined, 'TestObject.privateStr');
            this.areIdentical(testObj1.testEnum, deserialized.testEnum, 'TestObject.testEnum');
        }


        incorrectDataDeserializationTest_0() {
            let testEnvironment: ITestEnvironment = factory.testEnvironment1();
            let testObj1: TestObject = testEnvironment.testObjects[0];

            let serialized: string = JSON.stringify(testObj1);
            try {
                let deserialized: TestObject = testEnvironment.deserializer.deserialize(serialized);
                this.isTrue(false, 'incorrectDataDeserializationTest_0');
            } catch (err) { }
        }


        incorrectDataDeserializationTest_1() {
            let testEnvironment: ITestEnvironment = factory.testEnvironment1();
            let testObj1: TestObject = testEnvironment.testObjects[0];

            // correctOne
            try {
                testEnvironment.deserializer.deserialize('{"id":"1","type":2,"flag":0,"clazz":"TestObject"}');
                this.isTrue(true, 'incorrectDataDeserializationTest_1');
            } catch (err) { this.isTrue(false, `incorrectDataDeserializationTest_1 - ${err.message}`); }
        }


        incorrectDataDeserializationTest_2() {
            let testEnvironment: ITestEnvironment = factory.testEnvironment1();
            let testObj1: TestObject = testEnvironment.testObjects[0];

            //incorrect
            try {
                testEnvironment.deserializer.deserialize('{"id":"1","type":2,"flag":0,"clazz":"TestObjectX"}');
                this.isTrue(false, 'incorrectDataDeserializationTest_2');
            } catch (err) { }
        }


        incorrectDataDeserializationTest_3() {
            let testEnvironment: ITestEnvironment = factory.testEnvironment1();
            let testObj1: TestObject = testEnvironment.testObjects[0];

            //incorrect
            try {
                testEnvironment.deserializer.deserialize('{"id":"1","type":2,"flag":20,"clazz":"TestObject"}');
                this.isTrue(false, 'incorrectDataDeserializationTest_3');
            } catch (err) { }
        }


        incorrectDataDeserializationTest_4() {
            let testEnvironment: ITestEnvironment = factory.testEnvironment1();
            let testObj1: TestObject = testEnvironment.testObjects[0];

            //incorrect
            try {
                testEnvironment.deserializer.deserialize('{"id":"1","type":20,"flag":0,"clazz":"TestObject"}');
                this.isTrue(false, 'incorrectDataDeserializationTest_4');
            } catch (err) { }
        }


        incorrectDataDeserializationTest_5() {
            let testEnvironment: ITestEnvironment = factory.testEnvironment1();
            let testObj1: TestObject = testEnvironment.testObjects[0];

            //correctOne
            try {
                testEnvironment.deserializer.deserialize('{"id":"1","type":2,"flag":0,"clazz":"TestObject", "XXX":"yyy"}');
                this.isTrue(true, 'incorrectDataDeserializationTest_4');
            } catch (err) { this.isTrue(false, `incorrectDataDeserializationTest_5 - ${err.message}`); }
        }

    }
}
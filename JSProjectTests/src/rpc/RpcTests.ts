///<reference path="../../../JSProjectECMA6/dist/jsProject6.d.ts"/>
///<reference path="TestObjectFactory.ts"/>

"use strict";

class BasicTest extends testEC6.AsyncTest {
    performTest(): void {
        throw new Error('test');
        this.assertTrue(true, 'assertTrue=true');
        this.assertTrue(true, 'assertTrue=false');
        setTimeout(() => {this.callSuccess()}, 100);
    }
}

 
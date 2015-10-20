///<reference path="../../../JSProjectECMA6/dist/jsProject6.d.ts"/>
///<reference path="TestObjectFactory.ts"/>

"use strict";

class BasicTest extends testEC6.Test {
    perormTests(): void {
        throw new Error('test');
        this.assertTrue(true, 'assertTrue=true');
        this.assertTrue(false, 'assertTrue=false');
    }
}

 
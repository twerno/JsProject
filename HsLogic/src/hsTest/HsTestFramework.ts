/// <reference path="testSequenceRunner.ts" />
///<reference path="TestCommons.ts"/>

"use strict";

namespace HsTest {


    export class TestEngine {

        public resolveTest( test: TestSequence, hsGameCtx?: HsLogic.HsGameCtx ): Promise<TestSequenceResult> {
            return new Promise<TestSequenceResult>(( resolve, reject ) => {
                let testRunner: TestSequenceRunner = new TestSequenceRunner( resolve );
                testRunner.execute( test, hsGameCtx );
            });
        }

    }

}
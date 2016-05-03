/// <reference path="tests/basictest.ts" />
/// <reference path="tests/auchenai_soulpriesttest.ts" />
///<reference path="../../HsLogic/dist/HsLogic.d.ts"/>
///<reference path="../../HsCardSets/dist/HsCardSets.d.ts"/>

"use strict";

var testEngine: HsTest.TestEngine = new HsTest.TestEngine();

//testEngine.resolveTest( BasicTest )
//    .then(( result: HsTest.TestSequenceResult ): void => {
//        let drawer: HsTest.TestSequenceResultDrawer = new HsTest.TestSequenceResultDrawer();
//        document.getElementById( 'results' ).insertAdjacentHTML( 'beforeend', drawer.getHtml( result ) );
//        console.log( result );
//    })
//    .catch(( error: Error ): void => { throw error });

testEngine.resolveTest( Auchenai_SoulpriestTest )
    .then(( result: HsTest.TestSequenceResult ): void => {
        let drawer: HsTest.TestSequenceResultDrawer = new HsTest.TestSequenceResultDrawer();
        document.getElementById( 'results' ).insertAdjacentHTML( 'beforeend', drawer.getHtml( result ) );
        console.log( result );
    })
    .catch(( error: Error ): void => { throw error });
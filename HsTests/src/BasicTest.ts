///<reference path="../../HsLogic/dist/HsLogic.d.ts"/>
///<reference path="../../HsCardSets/dist/HsCardSets.d.ts"/>

"use strict";


var testSeq: HsTest.TestSequence = {
    hsGameCtxBuilder: () => HsTest.HsCtxBuilder.build( {
        players: [
            { player: HsTest.PLAYER.FIRST, active: true, hand: [Def.Frost_Bolt], deck: [] },
            { player: HsTest.PLAYER.SECOND }
        ],
        battlefield: [{ owner: HsTest.PLAYER.SECOND, minion: Def.Amani_Berserker }]
    }),

    actions: ( hsGameCtx: HsLogic.HsGameCtx ) => {
        let spell: HsLogic.Spell = <HsLogic.Spell>hsGameCtx.gameBoard.zonesOf( hsGameCtx.activePlayer ).hand.getRawArray()[0];
        let target: HsLogic.Minion = <HsLogic.Minion>hsGameCtx.gameBoard.zonesOf( hsGameCtx.inactivePlayer ).battlefield.getRawArray()[0];

        return [
            hsGameCtx.actionFactory.playSpell( {
                source: spell.getSource(),
                card: spell,
                targets: [target],
                cancelAction: { value: false }
            })
        ];
    },

    tests: [],

    consequencesMonitorExcludes: [jsAction.InlineAction, jsAction.InlineActionExt]
}

var Result: HsTest.TestSequenceResult = null;
testSeq.hsGameCtxBuilder();
var testEngine: HsTest.TestEngine = new HsTest.TestEngine();
testEngine.resolveTest( testSeq )
    .then(( result: HsTest.TestSequenceResult ): void => {
        let drawer: HsTest.TestSequenceResultDrawer = new HsTest.TestSequenceResultDrawer();
        document.write( drawer.getHtml( result ) );
        console.log( result );
        Result = result;
    })
    .catch(( error: Error ): void => { throw error });

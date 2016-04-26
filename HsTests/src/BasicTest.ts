///<reference path="../../HsLogic/dist/HsLogic.d.ts"/>
///<reference path="../../HsCardSets/dist/HsCardSets.d.ts"/>

"use strict";


var testSeq: HsTest.TestSequence = {
    hsGameCtxBuilder: () => HsTest.HsCtxBuilder.build( {
        players: [
            { player: HsTest.PLAYER.FIRST, hero: Def.Priest, active: true, hand: [Def.Frost_Bolt, Def.Arcane_Missiles], deck: [] },
            { player: HsTest.PLAYER.SECOND, hero: Def.Warlock }
        ],
        battlefield: [{ owner: HsTest.PLAYER.SECOND, minion: Def.Amani_Berserker }, { owner: HsTest.PLAYER.FIRST, minion: Def.Violet_Teacher }]
    }),

    actions: ( hsGameCtx: HsLogic.HsGameCtx ) => {
        let frost_bolt: HsLogic.Spell = <HsLogic.Spell>hsGameCtx.gameBoard.zonesOf( hsGameCtx.activePlayer ).hand.getRawArray()[0];
        let arcane_missiles: HsLogic.Spell = <HsLogic.Spell>hsGameCtx.gameBoard.zonesOf( hsGameCtx.activePlayer ).hand.getRawArray()[1];
        let target: HsLogic.Minion = <HsLogic.Minion>hsGameCtx.gameBoard.zonesOf( hsGameCtx.inactivePlayer ).battlefield.getRawArray()[0];

        return [
            hsGameCtx.actionFactory.playSpell( {
                source: arcane_missiles.getSource(),
                card: arcane_missiles,
                targets: [],
                cancelAction: { value: false }
            }),
            hsGameCtx.actionFactory.playSpell( {
                source: frost_bolt.getSource(),
                card: frost_bolt,
                targets: [target],
                cancelAction: { value: false }
            })
        ];
    },
    //    actionMonitor: null,
    actionMonitor: {
        actionTests: [],
        consequencesMonitorExcludes: [jsAction.InlineAction, jsAction.InlineActionExt, HsLogic.ProcessQueue, HsLogic.DispatchEvents/*, HsLogic.DispatchEvent*/],
    },

    tests: [
        {
            name: 'Minion destroyed',
            errorMsg: 'Minion is not dead!',
            check: ( hsGameCtx: HsLogic.HsGameCtx ): boolean => {
                return hsGameCtx.gameBoard.zonesOf( hsGameCtx.inactivePlayer ).battlefield.getRawArray().length === 0;
            }
        },
        {
            name: 'No events left',
            errorMsg: 'Undispatched events left!',
            check: ( hsGameCtx: HsLogic.HsGameCtx ): boolean => {
                return hsGameCtx.eventMgr.isEmpty();
            }
        }
    ]
};

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

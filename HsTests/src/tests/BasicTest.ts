///<reference path="../../../HsLogic/dist/HsLogic.d.ts"/>
///<reference path="../../../HsCardSets/dist/HsCardSets.d.ts"/>

"use strict";


var BasicTest: HsTest.TestSequence =
    {
        hsGameCtxBuilder: () => HsTest.HsCtxBuilder.build( {
            players: [
                { player: HsTest.PLAYER.FIRST, hero: Def.Priest, active: true, hand: [Def.Frost_Bolt, Def.Arcane_Missiles], deck: [] },
                { player: HsTest.PLAYER.SECOND, hero: Def.Warlock }
            ],
            battlefield: [{ owner: HsTest.PLAYER.SECOND, minion: Def.Amani_Berserker }, { owner: HsTest.PLAYER.FIRST, minion: Def.Violet_Teacher }]
        }),

        actions: ( hsGameCtx: HsLogic.HsGameCtx ) => {
            let frost_bolt: HsLogic.Spell = <HsLogic.Spell>hsGameCtx.gameBoard.zonesOf( hsGameCtx.activePlayer ).hand.entities[0];
            let arcane_missiles: HsLogic.Spell = <HsLogic.Spell>hsGameCtx.gameBoard.zonesOf( hsGameCtx.activePlayer ).hand.entities[1];
            let target: HsLogic.Minion = <HsLogic.Minion>hsGameCtx.gameBoard.zonesOf( hsGameCtx.inactivePlayer ).battlefield.entities[0];

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
                    return hsGameCtx.gameBoard.zonesOf( hsGameCtx.inactivePlayer ).battlefield.entities.length === 0;
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

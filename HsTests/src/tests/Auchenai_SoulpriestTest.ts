
///<reference path="../../../HsLogic/dist/HsLogic.d.ts"/>
///<reference path="../../../HsCardSets/dist/HsCardSets.d.ts"/>

"use strict";


var Auchenai_SoulpriestTest: HsTest.TestSequence =
    {
        hsGameCtxBuilder: () => HsTest.HsCtxBuilder.build( {
            players: [
                { player: HsTest.PLAYER.FIRST, hero: Def.Priest, active: true, hand: [], deck: [] },
                { player: HsTest.PLAYER.SECOND, hero: Def.Warlock }
            ],
            battlefield: [{ owner: HsTest.PLAYER.FIRST, minion: Def.Auchenai_Soulpriest }]
        }),

        actions: ( gameCtx: HsLogic.HsGameCtx ) => {

            let source: HsLogic.ISource = { entity: gameCtx.activePlayer.heroPower, player: gameCtx.activePlayer, sourceType: HsLogic.SOURCE_TYPE.HERO_POWER };

            return [
                gameCtx.phaseActionFactory.auraUpdateStep( { source: source, auraType: Def.AURA_TYPE.OTHER }),
                gameCtx.actionFactory.calculateAndHeal( {
                    source: source,
                    amount: 1,
                    targets: [gameCtx.inactivePlayer.hero],
                    cancelAction: { value: false }
                })
            ];
        },

        actionMonitor: {
            actionTests: [],
            consequencesMonitorExcludes: [jsAction.InlineAction, jsAction.InlineActionExt, HsLogic.ProcessQueue, HsLogic.DispatchEvents/*, HsLogic.DispatchEvent*/],
        },

        tests: [
            {
                name: 'Heal flipped',
                errorMsg: 'Auchenai does not work',
                check: ( hsGameCtx: HsLogic.HsGameCtx ): boolean => {
                    return hsGameCtx.inactivePlayer.hero.body.damages > 0;
                }
            }
        ]
    };


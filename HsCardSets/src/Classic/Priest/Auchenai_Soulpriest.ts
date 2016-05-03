/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Auchenai_Soulpriest: IMinion = classicSet.registerMinion( {

        name: `Auchenai Soulpriest`,
        cost: 4,
        attack: 3,
        health: 5,
        metadata: metadata( CARD_CLASS.PRIEST, CARD_RARITY.RARE ),
        minion_type: MINION_TYPE.GENERAL,

        aura: [
            {
                auraType: AURA_TYPE.OTHER,

                targetBuilder: ( aura: Aura ): ISetBuilder<PermanentExt> => {
                    return TargetFinder.PLAYER;
                },

                effectBuilder: ( aura: Aura, target: PermanentExt, gameCtx: HsGameCtx ): IEffects => {
                    let trigger: Trigger =
                        new HsLogic.Trigger( aura.owner, aura.sourceCard, Auchenai_Soulpriest_TriggerDef() )
                            .init();

                    return { triggers: [trigger] };
                }
            }
        ]
    });


    function Auchenai_Soulpriest_TriggerDef(): IDefTrigger {

        return {
            mechanic: MECHANIC.AURA,

            respondsTo: [
                HsLogic.event.PreCalculateAndHealEvent,
                HsLogic.event.PreSplitHealEvent,
            ],

            triggerable: ( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): boolean => {
                return event.param.source.player === trigger.owner;
            },

            actionBuilder: ( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): Action | Action[] => {
                let param: HsLogic.CalculateHealParam = <HsLogic.CalculateHealParam>event.param;

                param.cancelAction.value = true;

                if ( event instanceof HsLogic.event.PreCalculateAndHealEvent ) {
                    let param: HsLogic.HealTargetsParam = <HsLogic.HealTargetsParam>event.param;
                    return gameCtx.actionFactory.calculateAndDealDamage( {
                        source: param.source,
                        amount: param.amount,
                        targets: param.targets,
                        damageType: DAMAGE_TYPE.DIRECT,
                        notifyMode: param.notifyMode
                    })
                }

                else if ( event instanceof HsLogic.event.PreSplitHealEvent ) {
                    let param: HsLogic.SplitHealParam = <HsLogic.SplitHealParam>event.param;
                    return gameCtx.actionFactory.calculateAndSplitDamage( {
                        source: param.source,
                        amount: param.amount,
                        splitMode: param.splitMode,
                        damageType: DAMAGE_TYPE.DIRECT
                    })
                }

                return null;
            }
        }
    }
}
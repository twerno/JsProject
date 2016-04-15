"use strict";

namespace Def {

    var Frost_Bolt: ISpell = {
        name: `Frost Bolt`,
        cost: 2,
        rarity: RARITY.COMMON,
        cardClass: CARD_CLASS.MAGE,

        triggers: [],
        spellTextAction: {
            targets: TARGET.SINGLE_CHARACTER,
            actionBuilder( source: ISource, targets: Character[], context: HsGameCtx ): Action[] {

                return [
                    DefActionHelper.DirectDamage( {
                        source: source,
                        targets: targets,
                        amount: 3
                    }),
                    DefActionHelper.AddTag( {
                        source: source,
                        targets: targets,
                        tag: Freeze_Tag
                    })
                ];

            }

        }

    };

    var Arcane_Missiles: ISpell = {
        name: `Arcane Missiles`,
        cost: 1,
        rarity: RARITY.COMMON,
        cardClass: CARD_CLASS.MAGE,

        triggers: [],

        spellTextAction: {
            targets: null,
            actionBuilder( source: ISource, targets: Character[], context: HsGameCtx ): Action[] {

                return [
                    new HsLogic.CalculateAndSplitDamage( {
                        source: source,
                        damageType: DAMAGE_TYPE.DIRECT,
                        amount: 3,
                        splitMode: SPLIT_MODE.ARCANE_MISSILE
                    })
                ];

            }

        }
    };

    var Animated_Armor: IMinion = {
        name: `Animated Armor`,
        cost: 4,
        rarity: RARITY.RARE,
        cardClass: CARD_CLASS.MAGE,

        attack: 4,
        health: 4,
        minion_type: MINION_TYPE.GENERAL,

        triggers: [{
            respondsTo: HsLogic.event.PreDamagePhase,
            triggerable: ( trigger: Trigger, event: ActionEvent, context: HsGameCtx ): boolean => {
                return trigger.parent.owner === ( <HsLogic.DamageParam>event.param ).target;
            },
            actionBuilder: ( trigger: Trigger, event: ActionEvent, context: HsGameCtx ): Action => {
                ( <HsLogic.DamageParam>event.param ).amount = 1;
                return null;
            }
        }],
        battlecry: null,
        tags: []
    };
}
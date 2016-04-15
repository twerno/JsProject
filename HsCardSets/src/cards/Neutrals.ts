"use strict";

namespace Def {

    var Shattered_Sun_Cleric: IMinion = {
        name: `Shattered Sun Cleric`,
        cost: 2,
        rarity: RARITY.COMMON,
        cardClass: CARD_CLASS.NEUTRAL,

        attack: 3,
        health: 2,
        minion_type: MINION_TYPE.GENERAL,

        triggers: [],
        battlecry: null,
        tags: []
    };


    var Amani_Berserker: IMinion = {
        name: `Amani Berserker`,
        cost: 2,
        rarity: RARITY.COMMON,
        cardClass: CARD_CLASS.NEUTRAL,

        attack: 2,
        health: 3,
        minion_type: MINION_TYPE.GENERAL,

        triggers: [
            enrage<EnrageContext>( {
                init: (): EnrageContext => { return new EnrageContext() },

                enrage: ( trigger: Trigger, event: ActionEvent, internalCtx: EnrageContext, context: HsGameCtx ): Action => {
                    internalCtx.enchantment =
                        new HsLogic.AttackHealthEnchantment( event.param.source, <Character>trigger.parent, false )
                            .init( { attack: 3, health: 0 });

                    return DefActionHelper.AttachEnchantment( internalCtx.enchantment );
                },

                backToNormal: ( trigger: Trigger, event: ActionEvent, internalCtx: EnrageContext, context: HsGameCtx ): Action => {
                    return DefActionHelper.DetachEnchantment( internalCtx.enchantment );
                }
            })
        ],
        battlecry: null,
        tags: []
    };


    var Abomination: IMinion = {
        name: `Abomination`,
        cost: 5,
        rarity: RARITY.RARE,
        cardClass: CARD_CLASS.NEUTRAL,

        attack: 4,
        health: 4,
        minion_type: MINION_TYPE.GENERAL,

        triggers: [
            Deathrattle( {

                action: ( trigger: Trigger, event: ActionEvent, context: HsGameCtx ): Action => {
                    let source: HsLogic.ISource = {
                        action: event.param.source.action,
                        caster: trigger.owner,
                        sourceType: HsLogic.SOURCE_TYPE.MINION,
                        sourceCard: trigger.sourceCard
                    };
                    return new HsLogic.CalculateAndDealDamage( {
                        source: source,
                        targets: TargetFinder.ANY_CHARACTER.buildSet( source, context ),
                        amount: 4,
                        damageType: DAMAGE_TYPE.DIRECT
                    });
                }

            })
        ],
        battlecry: null,
        tags: []
    };


    var Stormwind_Champion: IMinion = {
        name: `Stormwind Champion`,
        cost: 7,
        rarity: RARITY.COMMON,
        cardClass: CARD_CLASS.NEUTRAL,

        attack: 6,
        health: 6,
        minion_type: MINION_TYPE.GENERAL,

        triggers: [
            AuraGenerator( {
                auraType: AURA_TYPE.ATTACK_HEALTH,

                rebuildAura: ( trigger: Trigger, event: ActionEvent, context: HsGameCtx ): Enchantment[] => {
                    let result: Enchantment[] = [];
                    TargetFinder.FRIENDLY_MINION
                        .addFilter( Filters.OtherThan( trigger.sourceCard ) )
                        .buildSet( event.param.source, context )
                        .forEach(( minion ) => {
                            result.push( new HsLogic.AttackHealthEnchantment( {
                                action: null,
                                caster: trigger.sourceCard.owner,
                                sourceType: HsLogic.SOURCE_TYPE.MINION,
                                sourceCard: trigger.sourceCard
                            }, minion, true )
                                .init( { attack: 1, health: 1 }) )
                        });

                    return result;
                }
            })
        ],
        battlecry: null,
        tags: []
    };


}
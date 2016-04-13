namespace Def {

    var Power_Overwhelming: ISpell = {
        name: `Power Overwhelming`,
        cost: 1,
        rarity: RARITY.COMMON,

        triggers: [],
        onPlayAction: {
            targets: TARGET.SINGLE_CHARACTER,
            actionBuilder( source: ISource, targets: Character[], context: HsGameCtx ): Action[] {

                return [
                    DefActionHelper.MinionStatMod( {
                        source: source,
                        targets: targets,
                        values: {
                            attack: { add: 4 },
                            hp: { add: 4 }
                        },
                        duration: EFFECT_DURATION.PERMANENT
                    }),
                    DefActionHelper.AddTag( {
                        source: source,
                        targets: targets,
                        tag: Destroy_At_The_End_of_Turn_Tag
                    })
                ];

            }

        }

    };

    var Arcane_Missiles: ISpell = {
        name: `Arcane Missiles`,
        cost: 1,
        rarity: RARITY.COMMON,

        triggers: [],
        onPlayAction: null

        //enchantments: [],
        //triggers: [],

        //        playActions: [
        //
        //            (source: HsSource, context: GameCtx): Action[]=> {
        //                return [
        //                    //context.actionFactory.damage.randomlySplitDamage( {
        //                    //    source: source,
        //                    //    damageType: DAMAGE_TYPE.DIRECT,
        //                    //    partsAmount: 3,
        //                    //    damagePerPart: 1,
        //                    //    splitMode: SPLIT_MODE.MISSILE
        //                    //})
        //                ]
        //            }
        //        ],


    };
}
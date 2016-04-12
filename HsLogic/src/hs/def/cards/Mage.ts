namespace Def {

    var Frost_Bolt: ISpell = {
        name: `Frost Bolt`,
        cost: 2,
        rarity: RARITY.COMMON,

        triggers: [],
        onPlayAction: {
            target: TARGET.SINGLE_CHARACTER,
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
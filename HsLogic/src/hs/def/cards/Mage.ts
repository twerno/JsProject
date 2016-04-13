namespace Def {

    var Frost_Bolt: ISpell = {
        name: `Frost Bolt`,
        cost: 2,
        rarity: RARITY.COMMON,

        triggers: [],
        onPlayAction: {
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

        triggers: [],

        onPlayAction: {
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
}
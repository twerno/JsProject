"use strict";

namespace Def {

    export var Shapeshift: IHeroPower = {
        name: `Shapeshift`,

        cost: 2,

        ability: {
            targets: null,
            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {
                let actions: Action[] = [];

                actions.push( gameCtx.actionFactory.gainArmor( {
                    source: source, targetPlayer: source.player, amount: 1
                }) );

                actions.concat(
                    Enchantment( {
                        expireMode: EXPIRE_MODE.UNTIL_END_OF_TURN,
                        enchantmentBuilder: ( source: ISource, target: Permanent, gameCtx: HsGameCtx ): Enchantment => {
                            return new HsLogic.AttackHealthEnchantment( source, <Character>target, false )
                                .init( { attack: 1, health: 0 });
                        }
                    })( source, targets, gameCtx )
                );

                return actions;

            }
        }
    }

}
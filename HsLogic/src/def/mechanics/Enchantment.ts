"use strict";

namespace Def {

    export enum EXPIRE_MODE {
        PERMANENT = <any>"PERMANENT",
        UNTIL_END_OF_TURN = <any>"UNTIL_END_OF_TURN"

    }

    export interface EnchantmentParam {
        enchantmentBuilder: ( source: ISource, target: Permanent, gameCtx: HsGameCtx ) => Enchantment,
        expireMode: EXPIRE_MODE,
    }


    export function Enchantment( param: EnchantmentParam ): ( source: ISource, targets: Permanent[], gameCtx: HsGameCtx ) => Action[] {

        return ( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] => {
            let actions: Action[] = [],
                triggers: Trigger[] = [];

            for ( let target of targets ) {
                let enchantment: Enchantment = param.enchantmentBuilder( source, target, gameCtx );

                actions.push( gameCtx.techActionFactory.attachEnchantment( {
                    source: source, target: target, enchantment: enchantment
                }) );

                if ( param.expireMode === EXPIRE_MODE.UNTIL_END_OF_TURN ) {
                    expireUntilEndOfTurn( source, target, gameCtx, enchantment );
                }

            }
            return actions;


        }
    }


    function expireUntilEndOfTurn( source: ISource, target: Permanent, gameCtx: HsGameCtx, enchantment: Enchantment ): Action[] {
        let trigger: Trigger = new HsLogic.Trigger( target, <Card>source.entity, {

            respondsTo: [HsLogic.event.EndOfTurn],

            enable_self_trigger_protection: false,

            actionBuilder: ( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): Action | Action[] => {
                return [
                    gameCtx.techActionFactory.detachEnchantment( {
                        source: source, target: target, enchantment: enchantment
                    }),
                    gameCtx.techActionFactory.unregisterTrigger( {
                        source: source, target: target, trigger: trigger
                    })
                ]
            }
        }).init();

        return [
            gameCtx.techActionFactory.registerTrigger( {
                source: source, target: target, trigger: trigger
            })
        ];
    }
}
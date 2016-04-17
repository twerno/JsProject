"use strict";

namespace Def {

    export enum EXPIRE_MODE {
        PERMANENT,
        UNTIL_END_OF_TURN

    }

    export interface AttackHealthEnchantParam {
        targets: IDefTargetDefinition<Object>,
        values: HsLogic.AttackHealthEnchantmentParam,
        expireMode: EXPIRE_MODE,
        isAura?: boolean
    }


    export function AttackHealthEnchant( param: AttackHealthEnchantParam ): IDefAction {
        return {
            targets: param.targets,

            actionBuilder: ( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] => {
                let actions: Action[] = [],
                    trigger: Trigger;

                for ( let target of targets ) {
                    let enchant: HsLogic.AttackHealthEnchantment
                        = new HsLogic.AttackHealthEnchantment( source, target, param.isAura || false )
                            .init( param.values );

                    actions.push( DefActionHelper.AttachEnchantment( enchant ) );

                    if ( param.expireMode === EXPIRE_MODE.UNTIL_END_OF_TURN ) {
                        trigger = new HsLogic.Trigger( target, <Card>source.entity, {
                            respondsTo: [HsLogic.event.EndOfTurn],
                            enable_self_trigger_protection: true,
                            actionBuilder: ( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): Action | Action[] => {
                                return [
                                    DefActionHelper.DetachEnchantment( enchant ),
                                    DefActionHelper.unregisterTrigger( trigger )
                                ];
                            }
                        });
                        actions.push( DefActionHelper.registerTrigger( target, trigger ) );
                    }
                }

                return actions;

            }
        }
    }
}
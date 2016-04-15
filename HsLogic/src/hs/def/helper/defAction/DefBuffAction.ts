"use strict";

namespace Def {

    //export enum EFFECT_DURATION {
    //    UNTIL_END_OF_TURN,
    //    PERMANENT
    //}

    //export enum STAT_MOD_MODE { BUFF, SET }

    export interface SimplyfyDamageTargetsParam extends IActionParam {
        damageType?: Def.DAMAGE_TYPE,
        targets: Character[],
        amount: number,

        damageState?: HsLogic.DAMAGE_STATE,
        notifyMode?: HsLogic.NOTIFY_MODE,

        customDamagePower?: ( param: HsLogic.DamageTargetsParam, context: HsGameCtx ) => number
    }

    //export interface MinionStatModParam {
    //    source: ISource,
    //    targets: Character[],
    //    values: {
    //        attack?: { add: number } | { set: number },
    //        hp?: { add: number } | { set: number }
    //    },
    //    duration: EFFECT_DURATION
    //}

    export class DefActionHelper {

        static DirectDamage( simplyfyParam: SimplyfyDamageTargetsParam ): Action {
            return new HsLogic.CalculateAndDealDamage( {
                source: simplyfyParam.source,
                damageType: simplyfyParam.damageType || DAMAGE_TYPE.DIRECT,
                targets: simplyfyParam.targets,
                amount: simplyfyParam.amount,
                damageState: simplyfyParam.damageState || HsLogic.DAMAGE_STATE.PENDING,
                notifyMode: simplyfyParam.notifyMode || HsLogic.NOTIFY_MODE.AFTER_EVERY_ACTION,
                customDamagePower: simplyfyParam.customDamagePower
            });
        }

        static AddTag( param: { source: ISource, targets: Character[], tag: TagClass }): Action {
            return null;
        }

        static RemoveTag( param: { source: ISource, targets: Character, tag: Tag }): Action {
            return null;
        }

        static AttachEnchantment( enchantment: Enchantment ): Action {
            return null;
        }

        static DetachEnchantment( enchantment: Enchantment ): Action {
            return null;
        }

        static DetachEnchantments( enchantment: Enchantment[] ): Action {
            return null;
        }


    }

}
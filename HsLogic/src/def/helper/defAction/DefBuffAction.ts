"use strict";

namespace Def {

    //export interface SimplyfyDamageTargetsParam extends IActionParam {
    //    damageType?: Def.DAMAGE_TYPE,
    //    targets: Character[],
    //    amount: number,

    //    damageState?: HsLogic.DAMAGE_STATE,
    //    notifyMode?: HsLogic.NOTIFY_MODE,

    //    customDamagePower?: ( param: HsLogic.DamageTargetsParam, context: HsGameCtx ) => number
    //}

    export class DefActionHelper {

        //static DirectDamage( simplyfyParam: SimplyfyDamageTargetsParam ): Action {
        //    return new HsLogic.CalculateAndDealDamage( {
        //        source: simplyfyParam.source,
        //        damageType: simplyfyParam.damageType || DAMAGE_TYPE.DIRECT,
        //        targets: simplyfyParam.targets,
        //        amount: simplyfyParam.amount,
        //        damageState: simplyfyParam.damageState || HsLogic.DAMAGE_STATE.PENDING,
        //        notifyMode: simplyfyParam.notifyMode || HsLogic.NOTIFY_MODE.AFTER_EVERY_ACTION,
        //        customDamagePower: simplyfyParam.customDamagePower
        //    });
        //}

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

        static registerTrigger( target: Card | Player, trigger: Trigger ): Action {
            return null;
        }

        static unregisterTrigger( trigger: Trigger ): Action {
            return null;
        }


    }

}
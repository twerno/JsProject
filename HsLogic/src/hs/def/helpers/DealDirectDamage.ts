"use strict";

namespace Def {


    export function DealDirectDamageToTarget<T extends Character>( amount: number ): FSingleTargetActionBuilder<T> {
        return ( source: HsSource, target: T, context: GameCtx ): Action[] => {
            return [
                //context.actionFactory.damage.dealDamage( {
                //    source: source,
                //    damageType: DAMAGE_TYPE.DIRECT,
                //    targets: [target],
                //    baseDamage: amount,
                //})
            ];
        }
    }


    export function DealDirectDamageToTargets<T extends Character>( amount: number ): FTargetsActionBuilder<T> {
        return ( source: HsSource, targets: T[], context: GameCtx ): Action[] => {
            return [
                //context.actionFactory.damage.dealDamage( {
                //    source: source,
                //    damageType: DAMAGE_TYPE.DIRECT,
                //    targets: targets,
                //    baseDamage: amount,
                //})
            ];
        }
    }
}
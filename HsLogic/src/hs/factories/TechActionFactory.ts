/// <reference path="../model/zone.ts" />

"use strict";

namespace HsLogic {


    export class TechActionFactory<T extends HsGameCtx> {

        inlineAction( executor: CommonUtils.PromiseWorker<ActionType | ActionType[]> ): jsAction.IAction<T> {
            return new InlineAction( executor );
        }

        singleTarget( param: AcquireTargetsActionParam ): jsAction.IAction<T> {
            return new ChooseSingleTarget( param );
        }

        addTag( param: AddTagParam ): jsAction.IAction<T> {
            return new AddTag( param );
        }

        removeTag( param: RemoveTagParam ): jsAction.IAction<T> {
            return new RemoveTag( param );
        }

        attachEnchantment( param: AttachEnchantmentParam ): jsAction.IAction<T> {
            return new AttachEnchantment( param );
        }

        detachEnchantment( param: DetachEnchantmentParam ): jsAction.IAction<T> {
            return new DetachEnchantment( param );
        }

        registerTrigger( param: RegisterTriggerParam ): jsAction.IAction<T> {
            return new RegisterTrigger( param );
        }

        unregisterTrigger( param: UnregisterTriggerParam ): jsAction.IAction<T> {
            return new UnregisterTrigger( param );
        }

        calculateDamage( param: CalculateDamageParam ): jsAction.IAction<T> {
            return new CalculateDamage( param );
        }

        damage( param: DamageParam ): jsAction.IAction<T> {
            return new Damage( param );
        }

        internalDamage( param: DamageParam ): jsAction.IAction<T> {
            return new InternalDamage( param );
        }

        splitDamage( param: SplitDamageParam ): jsAction.IAction<T> {
            return new SplitDamage( param );
        }

        calculateHeal( param: CalculateHealParam ): jsAction.IAction<T> {
            return new CalculateHeal( param );
        }

        heal( param: HealParam ): jsAction.IAction<T> {
            return new Heal( param );
        }

        internalHeal( param: HealParam ): jsAction.IAction<T> {
            return new InternalHeal( param );
        }

        splitHeal( param: SplitHealParam ): jsAction.IAction<T> {
            return new SplitHeal( param );
        }

        chooseAtRandom( param: ChooseAtRandomParam<any> ): jsAction.IAction<T> {
            return new ChooseAtRandom<any, ChooseAtRandomParam<any>>( param );
        }
    }
}
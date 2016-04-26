/// <reference path="../model/zone.ts" />

"use strict";

namespace HsLogic {



    export class TechActionFactory<T extends HsGameCtx> {

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
    }
}
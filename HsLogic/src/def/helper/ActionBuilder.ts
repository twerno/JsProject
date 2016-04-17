"use strict";

namespace Def {

    export class DefActionHelper {

        static AddTag( targets: Character | Character[], tag: Tag ): Action {
            return null;
        }

        static BuildAddTag( param: { source: ISource, targets: Character | Character[], tag: TagClass }): Action {
            return null;
        }

        static RemoveTag( targets: Character | Character[], tag: Tag ): Action {
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
"use strict";

namespace HsLogic {

    export class Enchantment {
        private _triggers: RegisteredTrigger[];
        private _effects: RegisteredEffect[];
        private _tags: RegisteredTag[];


        constructor( public parent: Card | Player ) {
        }

        registerTrigger( target: Card | Player, trigger: Trigger ): void {
            target.triggers.push( trigger );
            this._triggers.push( { target: target, trigger: trigger });
        }

        registerEffect( target: Card | Player, effect: Object ): void {
            target.effects.push( effect );
            this._effects.push( { target: target, effect: effect });
        }
        registerTag( target: Card | Player, tag: Tag ): void {
            target.tags.add( tag );
            this._tags.push( { target: target, tag: tag });
        }

        unregister(): void {

        }

    }



    interface RegisteredObject {
        target: Card | Player
    }
    interface RegisteredTrigger extends RegisteredObject {
        trigger: Trigger
    }
    interface RegisteredEffect extends RegisteredObject {
        effect: Object
    }
    interface RegisteredTag extends RegisteredObject {
        tag: Tag
    }

}
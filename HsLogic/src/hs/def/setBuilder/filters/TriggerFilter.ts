"use strict";

namespace Def {

    export class TriggerFilter {

        constructor( protected owner: Player ) { }

        static OWNER( owner: Player ): TriggerFilter {
            return new TriggerFilter( owner );
        }


        owns_trigger( source: HsSource, trigger: IDefTriggerImpl, gameCtx: GameCtx ): boolean {
            return trigger.owner === this.owner;
        }

        DOES_NOT_own_trigger( source: HsSource, trigger: IDefTriggerImpl, gameCtx: GameCtx ): boolean {
            return trigger.owner !== this.owner;
        }
    }
}
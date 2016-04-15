"use strict";

namespace Def {

    //TODO - przerobic tak jak otherThan
    export class TriggerFilter {

        constructor( protected owner: Player ) { }

        static OWNER( owner: Player ): TriggerFilter {
            return new TriggerFilter( owner );
        }


        owns_trigger( source: ISource, trigger: any, context: HsGameCtx ): boolean {
            return trigger.owner === this.owner;
        }

        DOES_NOT_own_trigger( source: ISource, trigger: any, context: HsGameCtx ): boolean {
            return trigger.owner !== this.owner;
        }

    }
}
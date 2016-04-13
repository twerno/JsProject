"use strict";

namespace Def {

    export class EntityFilter {

        constructor( protected entity: HsLogic.HsEntity /*| HsLogic.HsEntity[]*/ ) { }

        static VALUE( entity: HsLogic.HsEntity ): EntityFilter {
            return new EntityFilter( entity );
        }


        other_than( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {
            return ( this.entity instanceof HsLogic.HsEntity && this.entity !== entity )
            /*|| (this.entity instanceof Array && this.entity.indexOf(entity) === -1) */
        }
    }
}
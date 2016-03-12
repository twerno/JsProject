///<reference path="../../core/Entity.ts"/>
///<reference path="../entity/def/entity/ICard.ts"/>

"use strict";

namespace HSLogic {

    export class HsEntity extends jsLogic.Entity implements IHsEntity {
        name: string;
        card_type: CARD_TYPE;

        protected initFromDefinition( def: IHsEntity ): void {
            this.name = def.name;
            this.card_type = def.card_type;
        }

        constructor( public owner: HsEntity, def?: IHsEntity ) {
            super( owner );
            def && this.initFromDefinition( def );
        }
    }

}
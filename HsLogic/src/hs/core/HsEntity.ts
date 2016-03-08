///<reference path="../../core/Entity.ts"/>
///<reference path="../entities/def/ICard.ts"/>

"use strict";

namespace HSLogic {

    export class HsEntity extends jsLogic.Entity implements IHsEntity {
        name: string;
        type: CARD_TYPE;

        protected initFromDefinition(def: IHsEntity): void {
            this.name = def.name;
            this.type = def.type;
        }

        constructor(public owner: HsEntity, def?: IHsEntity) {
            super(owner);
            def && this.initFromDefinition(def);
        }
    }

}
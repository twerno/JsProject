///<reference path="../../core/Entity.ts"/>
///<reference path="../def/entity/ICard.ts"/>

"use strict";

namespace HSLogic {

    export class HsEntity extends jsLogic.Entity implements IHsEntity {
        def: IHsEntity;
        name: string;
        cardType: CARD_TYPE;
        enchantments: IEnchantment[];


        protected initFromDefinition( def: IHsEntity ): void {
            this.def = def;
            this.name = def.name;
            this.cardType = def.cardType;
            this.enchantments = def.enchantments;
        }

        constructor( public owner: HsEntity, def?: IHsEntity ) {
            super( owner );
            def && this.initFromDefinition( def );
        }
    }

}
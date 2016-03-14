///<reference path="../../core/Entity.ts"/>
///<reference path="../def/entity/ICard.ts"/>

"use strict";

namespace HsLogic {

    export class HsEntity extends jsLogic.Entity implements Def.IHsEntity {
        def: Def.IHsEntity;
        name: string;
        cardType: Def.CARD_TYPE;
        enchantments: Def.IEnchantment[];


        protected initFromDefinition( def: Def.IHsEntity ): void {
            this.def = def;
            this.name = def.name;
            this.cardType = def.cardType;
            this.enchantments = def.enchantments;
        }

        constructor( public owner: HsEntity, def?: Def.IHsEntity ) {
            super( owner );
            def && this.initFromDefinition( def );
        }
    }

}
///<reference path="../../core/Entity.ts"/>
///<reference path="../def/entity/ICard.ts"/>

"use strict";

namespace HsLogic {

    export class HsEntity extends jsLogic.Entity implements Def.IHsEntityImpl {
        def: Def.IHsEntity;
        type: Def.TYPE;

        orderOfPlay: number;


        protected initFromDefinition( def: Def.IHsEntity ): void {
            this.def = def;
            this.type = Def.TYPE.UNKNOWN
            this.orderOfPlay = jsLogic.generateNewId();
        }



        constructor( public owner: Player, def?: Def.IHsEntity ) {
            super( owner );
            def && this.initFromDefinition( def );
        }
    }

}
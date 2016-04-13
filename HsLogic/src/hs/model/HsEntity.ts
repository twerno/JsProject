///<reference path="../../core/Entity.ts"/>


"use strict";

namespace HsLogic {


    export class HsEntity extends jsLogic.Entity {
        def: Object;

        orderOfPlay: number;


        protected initFromDefinition( def: Object ): void {
            this.def = def;
            this.orderOfPlay = orderOfPlayGen();
        }



        constructor( public owner: Player, def?: Object ) {
            super( owner );
            def && this.initFromDefinition( def );
        }
    }


    var _orderOfPlayGenerator: number = 0;

	/**
	 *  orderOfPlayGenerator
	 *
	 */
    export function orderOfPlayGen(): number {
        return ++_orderOfPlayGenerator;
    }

}
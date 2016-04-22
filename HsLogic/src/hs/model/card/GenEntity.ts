/// <reference path="../../../core/entity.ts" />

"use strict";

namespace HsLogic {


    export class Entity extends jsAction.Entity {
        def: Object;

        orderOfPlay: number;


        protected initFromDefinition( def: Object ): void {
            this.def = def;
            this.orderOfPlay = orderOfPlayGen();
        }


        constructor( public owner: Player, def?: Object ) {
            super( owner );
            this.def = def || null;
        }

        init(): Entity {
            this.def && this.initFromDefinition( this.def );
            return this;
        }

        getSource(): ISource {
            return {
                player: this.owner,
                entity: this,
                sourceType: this.getSourceType()
            }
        }

        getSourceType(): SOURCE_TYPE {
            return SOURCE_TYPE.NONE;
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



    export interface ILivingEntity {
        def: { attack: number, health: number },
        body: MinionBody
    }

    export interface IPermanent {
        enchantments: Enchantment<Permanent>[]
    }

}
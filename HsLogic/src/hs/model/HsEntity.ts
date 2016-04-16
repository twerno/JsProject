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

    export class MinionBody {
        hp(): number { return this.hp() - this.damages };
        health: number;
        attack: number;
        damages: number;
    }

    export interface ILivingEntity {
        def: { attack: number, health: number },
        body: MinionBody
    }

    export interface IPermanent {
        enchantments: Enchantment<Permanent>[]
    }

}
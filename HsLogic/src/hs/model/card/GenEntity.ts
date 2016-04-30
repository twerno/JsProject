/// <reference path="../../../core/entity.ts" />

"use strict";

namespace HsLogic {


    export interface IOrderable {
        orderOfPlay: Date
    }

    //    export function compareOrderable(a: IOrderable, b: IOrderable): number {
    //        return a.orderOfPlay.getTime() - b.orderOfPlay.getTime();
    //    }

    export class OrderableEntity extends jsAction.Entity implements IOrderable {
        orderOfPlay: Date = new Date();

        static compare( a: IOrderable, b: IOrderable ): number {
            return a.orderOfPlay.getTime() - b.orderOfPlay.getTime();
        }
    }


    export class Entity extends OrderableEntity {
        def: Object;

        protected initFromDefinition( def: Object ): void {
            this.def = def;
        }


        static build( owner: Player, def: Object ): Entity {
            return new Entity( owner, def ).init();
        }


        constructor( public owner: Player, def: Object ) {
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


    //    var _orderOfPlayGenerator: number = 0;
    //
    //    /**
    //     *  orderOfPlayGenerator
    //     *
    //     */
    //    export function orderOfPlayGen(): number {
    //        return ++_orderOfPlayGenerator;
    //    }



    export interface ILivingEntity {
        def: { attack: number, health: number },
        body: MinionBody
    }

    export interface IPermanent {
        enchantments: Enchantment<Permanent>[]
    }

}
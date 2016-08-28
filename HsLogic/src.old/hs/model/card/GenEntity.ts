/// <reference path="../../../core/entity.ts" />

"use strict";

namespace HsLogic {


    export class Entity {
        id: string;
        def: Object;
        owner: Player;
        orderOfPlay: Date = new Date();

        //static build( source: ISource, def: Object ): Entity {
        //    return new Entity( source, def ).init();
        //}


        constructor( public source: ISource, def: Object ) {
            this.id = generateNewId();
            this.owner = source ? source.player : null;
            this.def = def || null;
        }

        init(): Entity {
            return this;
        }

        getSource(): ISource {
            return {
                player: this.owner,
                sourceCardDef: this.def,
                sourceType: this.getSourceType()
            }
        }

        getSourceType(): SOURCE_TYPE {
            return SOURCE_TYPE.NONE;
        }

        static compare( a: Entity, b: Entity ): number {
            return a.orderOfPlay.getTime() - b.orderOfPlay.getTime();
        }

        toString(): string {
            return `[${ClassUtils.getNameOfClass( this )}:${this.id}]`;
        }

    }


    //export class NamedEntity extends Entity {

    //    def: Def.INamedEntity;

    //    name: string;


    //    protected initFromDefinition( def: Def.INamedEntity ): void {
    //        super.initFromDefinition( def );

    //        this.name = def.name;
    //    }


    //    static build( owner: Player, def: Def.INamedEntity ): NamedEntity {
    //        return new NamedEntity( owner, def ).init();
    //    }


    //    constructor( owner: Player, def: Def.INamedEntity ) {
    //        super( owner, def );
    //    }

    //    init(): NamedEntity {
    //        super.init();
    //        return this;
    //    }
    //}


    export interface ILivingEntity {
        def: { attack: number, health: number },
        body: MinionBody
    }

    export function isLivingEntity( x: any ): x is ILivingEntity {
        return ClassUtils.ObjectValidator
            .NUMBER( 'def.attack' )
            .NUMBER( 'def.health' )
            .OBJECT( 'body', MinionBody )
            .validate( x );
    }

    export interface IPermanent {
        enchantments: Enchantment<Permanent>[]
    }

}
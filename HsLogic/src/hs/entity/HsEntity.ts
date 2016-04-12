///<reference path="../../core/Entity.ts"/>


"use strict";

namespace HsLogic {


    export class HsEntity extends jsLogic.Entity {
        def: Object;

        orderOfPlay: number;


        protected initFromDefinition( def: Object ): void {
            this.def = def;
            this.orderOfPlay = jsLogic.generateNewId();
        }



        constructor( public owner: Player, def?: Object ) {
            super( owner );
            def && this.initFromDefinition( def );
        }
    }




    //    namespace newIntf {
    //
    //        export interface IEntity {
    //            id: number,
    //            //type: Def.TYPE,
    //            orderOfPlay: number,
    //            tags: Object[], // flags, counters (obnizenie kosztu, itp)
    //        }
    //
    //
    //        export interface IHsEntity extends IEntity {
    //            def: Def.IHsEntity,
    //        }
    //
    //
    //        export interface ILivingEntity extends IEntity {
    //            attack: number,
    //            hp: number,
    //            maxHp: number,
    //            effects: Object[] // attack/hp buffs/debuffs
    //        }
    //
    //
    //        export interface IPermanent {
    //            enchantments: Object[],
    //            listeners: IListener[],
    //            activatedActions: Object[]
    //        }
    //
    //
    //        export interface IListener {
    //            parent: ICard | IPermanent,
    //            sourceCard: ICard,
    //            eventType: string[],
    //            priority: number,
    //
    //            //actions: Def.IDefTriggerAction,
    //            //isTriggerable: Def.FTriggerable,
    //        }
    //
    //
    //        export interface ICard extends IHsEntity {
    //            playActions: Def.IDefAction[],
    //
    //            areSpecialRequ: (source: ISource, context: HsGameCtx) => boolean,
    //            isPlayalble: (source: ISource, context: HsGameCtx) => boolean,
    //            calculatedCost: (self: ICard, context: HsGameCtx) => number
    //        }
    //
    //        export interface IMinion extends ICard, ILivingEntity, IPermanent {
    //            position: number
    //        }
    //
    //        export interface IWeapon extends ICard, ILivingEntity, IPermanent {
    //            attack: number,
    //            durability: number,
    //
    //        }
    //
    //        export interface ISpell extends ICard { }
    //
    //        export interface IPlayer extends ILivingEntity, IPermanent {
    //            name: string
    //        }
    //
    //
    //    }

}
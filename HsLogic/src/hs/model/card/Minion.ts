/// <reference path="card.ts" />

"use strict";

namespace HsLogic {


    export class Minion extends Card implements ILivingEntity {
        def: Def.IMinion;
        body: MinionBody = new MinionBody();
        minion_type: string;

        auras: Aura[] = [];
        battlecry: Def.IDefAction;

        static build( owner: Player, def: Def.IMinion ): Minion {
            return new Minion( owner, def ).init();
        }

        init(): Minion {
            super.init();
            return this;
        }

        protected initFromDefinition( def: Def.IMinion ): void {
            super.initFromDefinition( def );

            this.body.attack = def.attack;
            this.body.health = def.health;

            this.minion_type = def.minion_type;
            this.battlecry = def.battlecry || null;

            if ( def.aura instanceof Array )
                for ( let auraDef of <Def.IDefAura[]>def.aura )
                    this.auras.push( new Aura( this, this, auraDef ).init() );
        }

        getSourceType(): SOURCE_TYPE {
            return SOURCE_TYPE.MINION;
        }
    }


    export class MinionBody {
        hp(): number { return this.health - this.damages };
        health: number = 0;
        attack: number = 0;
        damages: number = 0;
        armor: number = 0;
    }

}
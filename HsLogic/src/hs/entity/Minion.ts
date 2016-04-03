///<reference path="../def/entity/ICard.ts"/>

"use strict";

namespace HsLogic {

    export class Minion extends Card implements Def.IMinionImpl, IPermanent<Minion> {

        def: Def.IMinion;

        hp: number;

        maxHp: number;

        attack: number;

        minion_type: Def.MINION_TYPE;

        flags: Def.IFlags;

        states: PermanentState<Minion, any>[] = [];


        initFromDefinition( def: Def.IMinion ): void {
            super.initFromDefinition( def );

            this.states = [];

            this.type = Def.TYPE.MINION;
            this.hp = def.hp;
            this.maxHp = def.hp;
            this.attack = def.attack;
            this.minion_type = def.minion_type;
        }
    }

}
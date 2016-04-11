
"use strict";

namespace HsLogic {

    export class Minion extends Card implements IPermanent, ICharacterState {

        def: Def.IMinion;

        minion_type: Def.MINION_TYPE;

        // current state
        hp: number;
        maxHp: number;
        attack: number;
        flags: Def.IFlags;
        tags: Def.ITags;

        states: PermanentState<any>[] = [];

        initFromDefinition( def: Def.IMinion ): void {
            super.initFromDefinition( def );

            this.states = [];

            this.hp = def.hp;
            this.maxHp = def.hp;
            this.attack = def.attack;
            this.minion_type = def.minion_type;
            this.flags = Def.cloneFlags( def.flags );
        }
    }

}
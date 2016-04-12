
"use strict";

namespace HsLogic {

    export class Minion extends Card implements IPermanent, ICharacterState {
        def: Def.IMinion;

        hp: number;
        maxHp: number;
        attack: number;
        minion_type: Def.MINION_TYPE;

        battlecry: Def.IDefAction;
        tags: Def.ITags;

        states: PermanentState<any>[] = [];

        initFromDefinition( def: Def.IMinion ): void {
            super.initFromDefinition( def );

            //this.states = [];

            this.hp = def.hp;
            this.maxHp = def.hp;
            this.attack = def.attack;
            this.minion_type = def.minion_type;
            this.battlecry = def.battlecry;

            for ( let i = 0; i < def.tags.length; i++ )
                this.tags.register( new def.tags[i]( {
                    action: null,
                    caster: this.owner,
                    sourceType: SOURCE_TYPE.NONE,
                    sourceCard: this
                }) );
        }
    }

}
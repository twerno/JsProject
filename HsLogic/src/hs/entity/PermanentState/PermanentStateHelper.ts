"use strict";

namespace HsLogic {

    export class PermanentStateHelper {

        static findLethal( minion: Minion ): PermanentState<any> {
            if ( minion.hp > 0 )
                return null;

            let tmpState: ICharacterState = {
                attack: minion.def.attack,
                hp: minion.def.hp,
                maxHp: minion.def.hp,
                //                flags: Def.cloneFlags( minion.def.flags )
            };

            let candidates: PermanentState<any>[];

            for ( let i = 0; i < minion.states.length; i++ ) {
                minion.states[i].apply( tmpState );

                if ( minion.states[i] instanceof CharacterDamage && tmpState.hp <= 0 )
                    candidates.push( minion.states[i] );
                else if ( tmpState.hp > 0 )
                    candidates = [];
            }



            return null;
        }

        static findFirst<T extends Permanent>( permanent: IPermanent, stateClass: PermanentStateClass ): PermanentState<any> {
            for ( let i = 0; i < permanent.states.length; i++ )
                if ( permanent.states[i] instanceof stateClass )
                    return permanent.states[i];

            return null;
        }

    }

}
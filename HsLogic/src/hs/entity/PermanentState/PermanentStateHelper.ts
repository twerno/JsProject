"use strict";

namespace HsLogic {

    export class PermanentStateHelper {

        static findLethal( minion: Minion ): PermanentState<Minion, any> {
            return null;
        }

        static findFirst<T extends Permanent>( permanent: IPermanent<T>, stateClass: PermanentStateClass ): PermanentState<T, any> {
            for ( let i = 0; i < permanent.states.length; i++ )
                if ( permanent.states[i] instanceof stateClass )
                    return permanent.states[i];

            return null;
        }

    }

}
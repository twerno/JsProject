"use strict";

namespace Def {

    export interface IFlags {
        immune?: boolean,
        elusive?: boolean,
        divine_shield?: boolean,
        charge?: boolean,
        forgetful?: boolean,
        freezed?: boolean,
        stealth?: boolean,
        taunt?: boolean,
        windfury?: boolean,
        silenced?: boolean,
        pending_destroy?: boolean
    }


    export function cloneFlags( flags: IFlags ): IFlags {
        return {
            immune: flags.immune,
            elusive: flags.elusive,
            divine_shield: flags.divine_shield,
            charge: flags.charge,
            forgetful: flags.forgetful,
            freezed: flags.freezed,
            stealth: flags.stealth,
            taunt: flags.taunt,
            windfury: flags.windfury,
            silenced: flags.silenced,
            pending_destroy: flags.pending_destroy,
        }
    }

}
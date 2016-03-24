"use strict";

namespace Def {

    //Damage
    //Heal
    //Buff
    // .
    // ..
    // ...
    //Aura



    export interface IDefEnchantment extends IHsEntity {

        sourceCard: Card,
        attachedTo: IHsEntityImpl,

        //attach: () => void,
        //recalculate: () => void,
        //remove: () => void,

        auras: Object[],
        triggers: IDefTrigger[],



    }


}
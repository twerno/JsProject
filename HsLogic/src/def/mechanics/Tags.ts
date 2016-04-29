/// <reference path="../../hs/model/mechanic/tag.ts" />
///<reference path="../Aliases.ts"/>

"use strict";

namespace Def {

    // flags
    export class Cant_Attack_Tag extends HsLogic.Tag { }
    export class Charge_Tag extends HsLogic.Tag { }
    export class Destroy_At_The_End_of_Turn_Tag extends HsLogic.Tag { }
    export class Divine_Shield_Tag extends HsLogic.Tag { }
    export class Elusive_Tag extends HsLogic.Tag { }
    export class Enrage_Tag extends HsLogic.Tag { }
    export class Forgetful_Tag extends HsLogic.Tag { }
    export class Freeze_Tag extends HsLogic.Tag { }
    export class Immune_Tag extends HsLogic.Tag { }
    export class Mega_Windfury_Tag extends HsLogic.Tag { }
    export class Stealth_Tag extends HsLogic.Tag { }
    export class Taunt_Tag extends HsLogic.Tag { }
    export class Windfury_Tag extends HsLogic.Tag { }



    export class Pending_Destroy_Tag extends HsLogic.Tag { silencable: boolean = false }
    export class Silenced_Tag extends HsLogic.Tag { silencable: boolean = false }
    export class Summoning_Sickness_Tag extends HsLogic.Tag { silencable: boolean = false }
    export class Overload_Tag extends HsLogic.Tag { silencable: boolean = false }
    export class Future_Overload_Tag extends HsLogic.Tag { silencable: boolean = false }


    export class SpellPower_Tag extends HsLogic.Tag { silencable: boolean = false }
    export class HealPower_Tag extends HsLogic.Tag { silencable: boolean = false }
    export class PingPower_Tag extends HsLogic.Tag { silencable: boolean = false }

}
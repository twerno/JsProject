"use strict";

namespace Def {

    export interface TagClass {
        new ( source: HsLogic.ISource ): Tag;
    }

    export class Tag {
        get type(): string { return ClassUtils.getNameOfClass( this ) }
        silencable: boolean;

        constructor( public source: HsLogic.ISource ) { }
    }

    export interface ITags {
        register( tag: Tag ): void;
        has( tagClass: TagClass ): boolean;
        hasAny( tagClasses: TagClass[] ): boolean;
        removeAll( tagClass: TagClass ): number;
        getFirst( tagClass: TagClass ): Tag;
        getFirstSource( tagClass: TagClass ): HsLogic.ISource;
        list(): Tag[];
    }


    export class Pending_Destroy_Tag extends Tag { silencable: boolean = false }
    export class Divine_Shield_Tag extends Tag { }
    export class Immune_Tag extends Tag { }
    export class Elusive_Tag extends Tag { }
    export class Forgetful_Tag extends Tag { }
    export class Freeze_Tag extends Tag { }
    export class Stealth_Tag extends Tag { }
    export class Taunt_Tag extends Tag { }
    export class Windfury_Tag extends Tag { }
    export class Mega_Windfury_Tag extends Tag { }
    export class Silenced_Tag extends Tag { silencable: boolean = false }
    export class Summoning_Sickness_Tag extends Tag { silencable: boolean = false }
    export class Cant_Attack_Tag extends Tag { }
    export class Charge_Tag extends Tag { }
    export class Destroy_At_The_End_of_Turn_Tag extends Tag { }

}
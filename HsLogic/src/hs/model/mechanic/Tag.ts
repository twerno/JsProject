"use strict";

namespace HsLogic {

    export interface TagClass {
        new ( source: HsLogic.ISource ): Tag;
    }

    export class Tag {
        get type(): string { return ClassUtils.getNameOfClass( this ) }
        silencable: boolean;

        constructor( public source: HsLogic.ISource ) { }
    }

    export interface ITags {
        add( tag: Tag ): void;
        contains( tag: Tag ): boolean;
        has( tag: Tag ): boolean;
        has( tagClass: TagClass ): boolean;
        doesNotHave( tagClass: Tag ): boolean;
        hasAny( tagClasses: TagClass[] ): boolean;
        remove( tag: Tag ): void;
        removeAll( tagClass: TagClass ): number;
        getFirst( tagClass: TagClass ): Tag;
        getFirstSource( tagClass: TagClass ): HsLogic.ISource;
        list(): Tag[];
        count( tagClass: TagClass ): number;
    }

}
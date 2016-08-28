"use strict";

namespace HsLogic {


    export class Enchantment<T extends PermanentExt> extends Entity {

        def: Def.IDefEnchantment;

        get priority(): number { return this.def.priority || 1 }
        get name(): string { return this.def.name || '' }
        get desc(): string { return this.def.desc || '' }
        get mechanic(): string { return this.def.mechanic || '' }
        get enchantmentMode(): Def.ENCHANTMENT_MODE { return this.def.enchantmentMode || Def.ENCHANTMENT_MODE.DYNAMIC }
        get effectBuilder(): Def.FEnchantmentEffectBuilder { return this.def.effectBuilder }

        attachedTo: PermanentExt;
        managedBy: Entity;

        constructor( source: ISource, def: Def.IDefEnchantment ) {
            super( null, def );
        }


        eq( enchant: Enchantment<PermanentExt> ): boolean {
            return this.def === enchant.def
                && this.owner === enchant.owner
                && this.attachedTo === enchant.attachedTo
                && this.managedBy === enchant.managedBy;
        }

        compare( a: Enchantment<T>, b: Enchantment<T> ): number {
            if ( a.priority === b.priority )
                return a.orderOfPlay.getTime() - b.orderOfPlay.getTime();
            else
                return a.priority - b.priority;
        }

        get owner(): Player { return this.attachedTo.owner }
        set owner( dummy: Player ) { /* dummy */ }
    }
}
/// <reference path="../card/genentity.ts" />

"use strict";

namespace HsLogic {

    export class Aura extends Entity {
        def: Def.IDefAura;

        get owner(): Player { return this.sourceCard.owner }
        sourceCard: Card;

        auraType: Def.AURA_TYPE;
        targets: ( self: Aura, gameCtx: HsGameCtx ) => Def.ISetBuilder<PermanentExt>;
        effectBuilder: ( self: Aura, target: PermanentExt, gameCtx: HsGameCtx ) => ( Enchantment<PermanentExt> | Tag )[];


        state: {
            affactedTargets: PermanentExt[]
        }


        constructor( sourceCard: Card, def: Def.IDefAura ) {
            super( null, def );

            this.targets = null;
            this.effectBuilder = null;
            this.state = { affactedTargets: null };
        }


        init(): Aura {
            super.init();
            return this;
        }


        protected initFromDefinition( def: Def.IDefAura ): void {
            super.initFromDefinition( def );

            this.auraType = def.auraType;
            this.targets = def.targets;
            this.effectBuilder = def.effectBuilder;
        }


        getSourceType(): SOURCE_TYPE {
            return this.sourceCard.getSourceType();
        }


        set owner( dummy: Player ) { /* dummy */ }

    } // class Aura



}
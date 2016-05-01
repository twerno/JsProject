/// <reference path="../card/genentity.ts" />

"use strict";

namespace HsLogic {

    export class Aura extends Entity {
        def: Def.IDefAura;

        auraBearer: PermanentExt;

        priority: number;
        auraType: Def.AURA_TYPE;
        targetBuilder: ( aura: Aura ) => Def.ISetBuilder<PermanentExt>;
        effectBuilder: Def.FAuraEffectBuilder;


        state: {
            managedEffects: Collection.IStringMap<Def.IAuraManagedEffects>;
        }


        constructor( sourceCard: Card, def: Def.IDefAura ) {
            super( null, def );

            this.targetBuilder = null;
            this.effectBuilder = null;
            this.state = { managedEffects: {} };
        }


        init(): Aura {
            super.init();
            return this;
        }


        protected initFromDefinition( def: Def.IDefAura ): void {
            super.initFromDefinition( def );

            if ( !Def.isDefAura( def ) )
                throw new Error( `Not a valid aura definition: ${def}` );

            this.priority = def.priority || 0;
            this.auraType = def.auraType;
            this.targetBuilder = def.targetBuilder;
            this.effectBuilder = def.effectBuilder;
        }


        getSourceType(): SOURCE_TYPE {
            return this.auraBearer.getSourceType();
        }

        getSource(): ISource {
            return {
                player: this.owner,
                entity: this.auraBearer,
                sourceType: this.getSourceType()
            }
        }


        get owner(): Player {
            if ( this.auraBearer instanceof Player )
                return <Player>this.auraBearer
            else if ( this.auraBearer instanceof Card )
                return this.auraBearer.owner
            else
                return null;
        }
        set owner( dummy: Player ) { /* dummy */ }

    } // class Aura

}
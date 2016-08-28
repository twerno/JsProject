"use strict";

namespace Def {

    export function SpellDamageAura( affects: ISetBuilder<Player>, amount: number ): IDefAura {

        return {

            auraType: AURA_TYPE.OTHER,

            targetBuilder: ( aura: Aura ) => affects,

            effectBuilder: ( aura: Aura, target: PermanentExt, gameCtx: HsGameCtx ): IEffects => {
                let tags: Tag[] = [];

                for ( let i = 0; i < amount; i++ )
                    tags.push( new SpellPower_Tag( aura.getSource() ) );

                return { tags: tags }
            }
        };

    }
}
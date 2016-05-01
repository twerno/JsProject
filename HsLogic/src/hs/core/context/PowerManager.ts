"use strict";

namespace HsLogic {


    export class PowerManager implements IPowerMgr {

        healBoost( source: ISource, gameCtx: HsGameCtx ): number {
            return source.player.tags.count( Def.HealPower_Tag );
        }

        damageBoost( param: CalculateDamageParam, gameCtx: HsGameCtx ): number {
            if ( param.damageType === Def.DAMAGE_TYPE.DIRECT ) {

                if ( param.source.sourceType === SOURCE_TYPE.SPELL )
                    return param.source.player.tags.count( Def.SpellPower_Tag );

                else if ( param.source.sourceType === SOURCE_TYPE.HERO_POWER )
                    return param.source.player.tags.count( Def.PingPower_Tag );

            }
            return 0;
        }
    }

}
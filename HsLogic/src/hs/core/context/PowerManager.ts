"use strict";

namespace HsLogic {


    export class PowerManager implements IPowerMgr {

        healPower( source: ISource ): number {
            return source.player.tags.count( Def.HealPower_Tag );
        }

        damagePower( source: ISource, damageType: Def.DAMAGE_TYPE ): number {
            if ( damageType === Def.DAMAGE_TYPE.DIRECT ) {

                if ( source.sourceType === SOURCE_TYPE.SPELL )
                    return source.player.tags.count( Def.SpellPower_Tag );

                else if ( source.sourceType === SOURCE_TYPE.HERO_POWER )
                    return source.player.tags.count( Def.PingPower_Tag );

            }
            return 0;
        }
    }

}
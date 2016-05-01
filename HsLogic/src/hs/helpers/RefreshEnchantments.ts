"use strict";

namespace HsLogic {

    export function refreshEnchantments( entities: PermanentExt[] ): void {

        for ( let entity of entities ) {

            if ( isLivingEntity( entity ) ) {
                entity.body.attack = entity.def.attack;
                entity.body.health = entity.def.health;
            } else if ( entity instanceof Weapon ) {
                entity.attack = entity.def.attack;
                entity.durability = entity.def.durability;
            }

            for ( let enchant of entity.enchantments )
                enchant.apply();

        }
    }
}
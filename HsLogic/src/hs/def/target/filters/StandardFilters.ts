"use strict";

namespace Def {

    export class StandardFilters {

        static minion( source: HSLogic.IHsSource, entity: HSLogic.HsEntity, gameCtx: HSLogic.HsGameCtx ): boolean {
            return entity instanceof HSLogic.Minion;
        }

        static hero( source: HSLogic.IHsSource, entity: HSLogic.HsEntity, gameCtx: HSLogic.HsGameCtx ): boolean {
            return entity.cardType === CARD_TYPE.HERO;
        }

        static waepon( source: HSLogic.IHsSource, entity: HSLogic.HsEntity, gameCtx: HSLogic.HsGameCtx ): boolean {
            return entity instanceof HSLogic.Weapon;
        }

        static character( source: HSLogic.IHsSource, entity: HSLogic.HsEntity, gameCtx: HSLogic.HsGameCtx ): boolean {
            return StandardFilters.minion( source, entity, gameCtx )
                || StandardFilters.hero( source, entity, gameCtx );
        }

        static friendly( source: HSLogic.IHsSource, entity: HSLogic.HsEntity, gameCtx: HSLogic.HsGameCtx ): boolean {
            return entity === source.caster
                || entity.owner === source.caster;
        }

        static enemy( source: HSLogic.IHsSource, entity: HSLogic.HsEntity, gameCtx: HSLogic.HsGameCtx ): boolean {
            return !StandardFilters.friendly( source, entity, gameCtx );
        }
    }
}
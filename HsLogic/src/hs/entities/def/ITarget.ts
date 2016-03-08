"use strict";

namespace HSLogic {


    export type ICustomActionTarget = (caller: Player, entity: HsEntity, gameCtx: HsGameCtx) => boolean;


    export class CardActionTarget {

        filters: ICustomActionTarget[] = [];


        MINION(): CardActionTarget {
            this.filters.push(StandardFilters.minion);
            return this;
        }

        HERO(): CardActionTarget {
            this.filters.push(StandardFilters.hero);
            return this;
        }

        CHARACTER(): CardActionTarget {
            this.filters.push(StandardFilters.character);
            return this;
        }

        FRIENDLY_MINION(): CardActionTarget {
            this.filters.push(StandardFilters.friendly);
            this.filters.push(StandardFilters.minion);
            return this;
        }

        FRIENDLY_HERO(): CardActionTarget {
            this.filters.push(StandardFilters.friendly);
            this.filters.push(StandardFilters.hero);
            return this;
        }

        FRIENDLY_CHARACTER(): CardActionTarget {
            this.filters.push(StandardFilters.friendly);
            this.filters.push(StandardFilters.character);
            return this;
        }

        ENEMY_MINION(): CardActionTarget {
            this.filters.push(StandardFilters.enemy);
            this.filters.push(StandardFilters.minion);
            return this;
        }

        ENEMY_HERO(): CardActionTarget {
            this.filters.push(StandardFilters.enemy);
            this.filters.push(StandardFilters.hero);
            return this;
        }

        ENEMY_CHARACTER(): CardActionTarget {
            this.filters.push(StandardFilters.enemy);
            this.filters.push(StandardFilters.character);
            return this;
        }
    }

    export function CARD_TARGET(): CardActionTarget {
        return new CardActionTarget();
    }



    class StandardFilters {

        static minion: ICustomActionTarget = (caller: Player, entity: HsEntity, gameCtx: HsGameCtx): boolean => {
            return entity.type === CARD_TYPE.MINION;
        }

        static hero: ICustomActionTarget = (caller: Player, entity: HsEntity, gameCtx: HsGameCtx): boolean => {
            return entity.type === CARD_TYPE.HERO;
        }

        static character: ICustomActionTarget = (caller: Player, entity: HsEntity, gameCtx: HsGameCtx): boolean => {
            return entity.type in [CARD_TYPE.HERO, CARD_TYPE.MINION];
        }

        static friendly: ICustomActionTarget = (caller: Player, entity: HsEntity, gameCtx: HsGameCtx): boolean => {
            return entity === caller
                || entity.owner === caller;
        }

        static enemy: ICustomActionTarget = (caller: Player, entity: HsEntity, gameCtx: HsGameCtx): boolean => {
            return !StandardFilters.friendly(caller, entity, gameCtx);
        }
    }
}
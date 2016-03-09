"use strict";

namespace HSLogic {


    export type ICustomTargetFilter = (caller: Player, entity: HsEntity, gameCtx: HsGameCtx) => boolean;
    export type ICustomTargetSetBuilder = (caller: Player, gameCtx: HsGameCtx, filters: ICustomTargetFilter[]) => HsEntity[];

    export type DefProperTarget = DefTargetFilter | DefTargetFilter[];

    export interface IOptionHasAttack {
        attack: number
    }

    export class DefTargetFilter {

        protected _setBuilder: ICustomTargetSetBuilder = StandardSetBuilder.all;
        protected _filters: ICustomTargetFilter[] = [];


        returnSet(caller: Player, gameCtx: HsGameCtx): HsEntity[] {
            return this._setBuilder(caller, gameCtx, this._filters);
        }


        addFilter(filter: ICustomTargetFilter): DefTargetFilter {
            this._filters.push(filter);
            return this;
        }

        protected static NEW(): DefTargetFilter {
            return new DefTargetFilter();
        }


        static get MINION(): DefTargetFilter { return new DefTargetFilter().MINION }
        get MINION(): DefTargetFilter { return this.addFilter(StandardFilters.minion) }


        static get HERO(): DefTargetFilter { return new DefTargetFilter().HERO }
        get HERO(): DefTargetFilter { return this.addFilter(StandardFilters.hero) }


        static get WAEPON(): DefTargetFilter { return new DefTargetFilter().WAEPON }
        get WAEPON(): DefTargetFilter { return this.addFilter(StandardFilters.waepon) }


        static get CHARACTER(): DefTargetFilter { return new DefTargetFilter().CHARACTER }
        get CHARACTER(): DefTargetFilter { return this.addFilter(StandardFilters.character) }


        static get CARD_IN_HAND(): DefTargetFilter { return new DefTargetFilter().CARD_IN_HAND }
        get CARD_IN_HAND(): DefTargetFilter { return this.addFilter(StandardFilters.cardInHand) }


        static get FRIENDLY(): DefTargetFilter { return new DefTargetFilter().FRIENDLY }
        get FRIENDLY(): DefTargetFilter { return this.addFilter(StandardFilters.friendly) }


        static get ENEMY(): DefTargetFilter { return new DefTargetFilter().ENEMY }
        get ENEMY(): DefTargetFilter { return this.addFilter(StandardFilters.enemy) }


        static MINION_WITH_ATTACK_GREATER_THAN_OR_EQAUL_TO(attackValue: number): DefTargetFilter {
            return new DefTargetFilter().ATTACK_GREATER_THAN_OR_EQAUL_TO(attackValue);
        }
        ATTACK_GREATER_THAN_OR_EQAUL_TO(attackValue: number): DefTargetFilter {
            return this.addFilter(new MinionByAttackFilter(attackValue).greatThenOrEqualTo);
        }

        OTHER_THAN(target: HsEntity): DefTargetFilter {
            return this.addFilter(
                (caller: Player, entity: HsEntity, gameCtx: HsGameCtx): boolean => { return target !== entity }
            )
        }
    }


    class StandardSetBuilder {

        static testAgainstFilters(entity: HsEntity, caller: Player, gameCtx: HsGameCtx, filters: ICustomTargetFilter[]): boolean {

            for (let i = 0; i < filters.length; i++) {
                if (!filters[i](caller, entity, gameCtx))
                    return false;
            }
            return true;
        }


        static all: ICustomTargetSetBuilder = (caller: Player, gameCtx: HsGameCtx, filters: ICustomTargetFilter[]): HsEntity[] => {
            let result: HsEntity[] = [],
                zones: HsZones = null,
                player: Player = null,
                cards: Card[] = null;

            for (let i = 0; i < gameCtx.players.length; i++) {
                player = gameCtx.players[i];

                if (StandardSetBuilder.testAgainstFilters(player, caller, gameCtx, filters)) {
                    result.push(player);

                    zones = gameCtx.zonesOf(player);
                    for (let s in zones._map) {
                        cards = zones._map[s].getRawArray();

                        for (let j = 0; j < cards.length; j++)
                            StandardSetBuilder.testAgainstFilters(cards[j], caller, gameCtx, filters)
                                && result.push(cards[j]);
                    }
                }
            }

            return result;
        }
    }


    class StandardFilters {

        static minion: ICustomTargetFilter = (caller: Player, entity: HsEntity, gameCtx: HsGameCtx): boolean => {
            return entity.type === CARD_TYPE.MINION;
        }

        static hero: ICustomTargetFilter = (caller: Player, entity: HsEntity, gameCtx: HsGameCtx): boolean => {
            return entity.type === CARD_TYPE.HERO;
        }

        static waepon: ICustomTargetFilter = (caller: Player, entity: HsEntity, gameCtx: HsGameCtx): boolean => {
            return entity.type === CARD_TYPE.WEAPON;
        }

        static character: ICustomTargetFilter = (caller: Player, entity: HsEntity, gameCtx: HsGameCtx): boolean => {
            return entity.type in [CARD_TYPE.HERO, CARD_TYPE.MINION];
        }

        static friendly: ICustomTargetFilter = (caller: Player, entity: HsEntity, gameCtx: HsGameCtx): boolean => {
            return entity === caller
                || entity.owner === caller;
        }

        static enemy: ICustomTargetFilter = (caller: Player, entity: HsEntity, gameCtx: HsGameCtx): boolean => {
            return !StandardFilters.friendly(caller, entity, gameCtx);
        }

        static cardInHand: ICustomTargetFilter = (caller: Player, entity: HsEntity, gameCtx: HsGameCtx): boolean => {
            return entity instanceof Card
                && gameCtx.zonesOf(entity.owner).hand.has(entity);
        }

        //static otherThan: ICustomTargetFilter = (caller: Player, entity: HsEntity, gameCtx: HsGameCtx): boolean => {
        //    return entity instanceof Card
        //        && gameCtx.zonesOf(entity.owner).hand.has(entity);
        //}
    }

    class MinionByAttackFilter {

        constructor(public attackValue: number) { }

        lessThen(caller: Player, entity: HsEntity, gameCtx: HsGameCtx): boolean {
            return entity instanceof Minion
                && entity.attack < this.attackValue;
        }

        lessThenOrEqualTo(caller: Player, entity: HsEntity, gameCtx: HsGameCtx): boolean {
            return entity instanceof Minion
                && entity.attack <= this.attackValue;
        }

        greatThen(caller: Player, entity: HsEntity, gameCtx: HsGameCtx): boolean {
            return entity instanceof Minion
                && entity.attack > this.attackValue;
        }

        greatThenOrEqualTo(caller: Player, entity: HsEntity, gameCtx: HsGameCtx): boolean {
            return entity instanceof Minion
                && entity.attack >= this.attackValue;
        }

        equalTo(caller: Player, entity: HsEntity, gameCtx: HsGameCtx): boolean {
            return entity instanceof Minion
                && entity.attack === this.attackValue;
        }

        notEqualTo(caller: Player, entity: HsEntity, gameCtx: HsGameCtx): boolean {
            return entity instanceof Minion
                && entity.attack !== this.attackValue;
        }
    }
}
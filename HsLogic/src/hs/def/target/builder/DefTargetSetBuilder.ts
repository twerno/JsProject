"use strict";

namespace HSLogic {


    export type ICustomTargetFilter = ( source: IHsSource, entity: HsEntity, gameCtx: HsGameCtx ) => boolean;
    export type ICustomTargetSetBuilder = ( source: IHsSource, gameCtx: HsGameCtx, filters: ICustomTargetFilter[] ) => HsEntity[];

    export type DefProperTarget<T extends HsEntity> = IDefTargetSetBuilder<T> | IDefTargetSetBuilder<T>[];


    export abstract class IDefTargetSetBuilder<T extends HsEntity> {
        abstract buildSet( source: IHsSource, gameCtx: HsGameCtx ): HsEntity[];
    }

    export class DefTargetSetBuilder<T extends HsEntity> extends IDefTargetSetBuilder<T> {

        protected _setBuilder: ICustomTargetSetBuilder = StandardSetBuilder.all;
        protected _filters: ICustomTargetFilter[] = [];


        buildSet( source: IHsSource, gameCtx: HsGameCtx ): HsEntity[] {
            return this._setBuilder( source, gameCtx, this._filters );
        }


        addFilter( filter: ICustomTargetFilter ): DefTargetSetBuilder<T> {
            this._filters.push( filter );
            return this;
        }


        static get MINION(): DefTargetSetBuilder<Minion> { return new DefTargetSetBuilder().MINION }
        get MINION(): DefTargetSetBuilder<T> { return this.addFilter( StandardFilters.minion ) }


        static get HERO(): DefTargetSetBuilder<Player> { return new DefTargetSetBuilder().HERO }
        get HERO(): DefTargetSetBuilder<T> { return this.addFilter( StandardFilters.hero ) }


        static get WAEPON(): DefTargetSetBuilder<Weapon> { return new DefTargetSetBuilder().WAEPON }
        get WAEPON(): DefTargetSetBuilder<T> { return this.addFilter( StandardFilters.waepon ) }


        static get CHARACTER(): DefTargetSetBuilder<Player | Minion> { return new DefTargetSetBuilder().CHARACTER }
        get CHARACTER(): DefTargetSetBuilder<T> { return this.addFilter( StandardFilters.character ) }


        static get CARD_IN_HAND(): DefTargetSetBuilder<Card> { return new DefTargetSetBuilder().CARD_IN_HAND }
        get CARD_IN_HAND(): DefTargetSetBuilder<T> { return this.addFilter( StandardFilters.cardInHand ) }


        static get FRIENDLY(): DefTargetSetBuilder<Player | Minion> { return new DefTargetSetBuilder().FRIENDLY }
        get FRIENDLY(): DefTargetSetBuilder<T> { return this.addFilter( StandardFilters.friendly ) }


        static get ENEMY(): DefTargetSetBuilder<Player | Minion> { return new DefTargetSetBuilder().ENEMY }
        get ENEMY(): DefTargetSetBuilder<T> { return this.addFilter( StandardFilters.enemy ) }


        static MINION_WITH_ATTACK_GREATER_THAN_OR_EQAUL_TO( attackValue: number ): DefTargetSetBuilder<Minion> {
            return new DefTargetSetBuilder().ATTACK_GREATER_THAN_OR_EQAUL_TO( attackValue );
        }
        ATTACK_GREATER_THAN_OR_EQAUL_TO( attackValue: number ): DefTargetSetBuilder<T> {
            return this.addFilter( new MinionByAttackFilter( attackValue ).greatThenOrEqualTo );
        }

        OTHER_THAN( target: HsEntity ): DefTargetSetBuilder<T> {
            return this.addFilter(
                ( source: IHsSource, entity: HsEntity, gameCtx: HsGameCtx ): boolean => { return target !== entity }
            )
        }

        static get TARGETABLE_BY_SPELL_OR_HERO_POWER(): DefTargetSetBuilder<Player | Minion> { return new DefTargetSetBuilder().TARGETABLE_BY_SPELL_OR_HERO_POWER }
        get TARGETABLE_BY_SPELL_OR_HERO_POWER(): DefTargetSetBuilder<T> {
            return this.addFilter(
                ( source: IHsSource, entity: HsEntity, gameCtx: HsGameCtx ): boolean => {
                    if ( entity instanceof Player
                        || entity instanceof Minion )
                        return !entity.flags.immune
                            && !entity.flags.elusive;

                    return false;
                }
            )
        }
    }


    class StandardSetBuilder {

        static testAgainstFilters( entity: HsEntity, source: IHsSource, gameCtx: HsGameCtx, filters: ICustomTargetFilter[] ): boolean {

            for ( let i = 0; i < filters.length; i++ ) {
                if ( !filters[i]( source, entity, gameCtx ) )
                    return false;
            }
            return true;
        }


        static all: ICustomTargetSetBuilder = ( source: IHsSource, gameCtx: HsGameCtx, filters: ICustomTargetFilter[] ): HsEntity[] => {
            let result: HsEntity[] = [],
                zones: HsZones = null,
                player: Player = null,
                cards: Card[] = null;

            for ( let i = 0; i < gameCtx.players.length; i++ ) {
                player = gameCtx.players[i];

                if ( StandardSetBuilder.testAgainstFilters( player, source, gameCtx, filters ) ) {
                    result.push( player );

                    zones = gameCtx.zonesOf( player );
                    for ( let s in zones._map ) {
                        cards = zones._map[s].getRawArray();

                        for ( let j = 0; j < cards.length; j++ )
                            StandardSetBuilder.testAgainstFilters( cards[j], source, gameCtx, filters )
                                && result.push( cards[j] );
                    }
                }
            }

            return result;
        }

    }


    class StandardFilters {

        static minion: ICustomTargetFilter = ( source: IHsSource, entity: HsEntity, gameCtx: HsGameCtx ): boolean => {
            return entity.cardType === CARD_TYPE.MINION;
        }

        static hero: ICustomTargetFilter = ( source: IHsSource, entity: HsEntity, gameCtx: HsGameCtx ): boolean => {
            return entity.cardType === CARD_TYPE.HERO;
        }

        static waepon: ICustomTargetFilter = ( source: IHsSource, entity: HsEntity, gameCtx: HsGameCtx ): boolean => {
            return entity.cardType === CARD_TYPE.WEAPON;
        }

        static character: ICustomTargetFilter = ( source: IHsSource, entity: HsEntity, gameCtx: HsGameCtx ): boolean => {
            return entity.cardType in [CARD_TYPE.HERO, CARD_TYPE.MINION];
        }

        static friendly: ICustomTargetFilter = ( source: IHsSource, entity: HsEntity, gameCtx: HsGameCtx ): boolean => {
            return entity === source.caller
                || entity.owner === source.caller;
        }

        static enemy: ICustomTargetFilter = ( source: IHsSource, entity: HsEntity, gameCtx: HsGameCtx ): boolean => {
            return !StandardFilters.friendly( source, entity, gameCtx );
        }

        static cardInHand: ICustomTargetFilter = ( source: IHsSource, entity: HsEntity, gameCtx: HsGameCtx ): boolean => {
            return entity instanceof Card
                && gameCtx.zonesOf( entity.owner ).hand.has( entity );
        }
    }



    class MinionByAttackFilter {

        constructor( public attackValue: number ) { }

        lessThen( source: IHsSource, entity: HsEntity, gameCtx: HsGameCtx ): boolean {
            return entity instanceof Minion
                && entity.attack < this.attackValue;
        }

        lessThenOrEqualTo( source: IHsSource, entity: HsEntity, gameCtx: HsGameCtx ): boolean {
            return entity instanceof Minion
                && entity.attack <= this.attackValue;
        }

        greatThen( source: IHsSource, entity: HsEntity, gameCtx: HsGameCtx ): boolean {
            return entity instanceof Minion
                && entity.attack > this.attackValue;
        }

        greatThenOrEqualTo( source: IHsSource, entity: HsEntity, gameCtx: HsGameCtx ): boolean {
            return entity instanceof Minion
                && entity.attack >= this.attackValue;
        }

        equalTo( source: IHsSource, entity: HsEntity, gameCtx: HsGameCtx ): boolean {
            return entity instanceof Minion
                && entity.attack === this.attackValue;
        }

        notEqualTo( source: IHsSource, entity: HsEntity, gameCtx: HsGameCtx ): boolean {
            return entity instanceof Minion
                && entity.attack !== this.attackValue;
        }
    }
}
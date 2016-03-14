"use strict";

namespace Def {

    export type IDefTargetSetFilter = ( source: HsSource, entity: HsLogic.HsEntity, gameCtx: GameCtx ) => boolean;


    export abstract class IDefTarget {

        protected _filters: IDefTargetSetFilter[] = [];

        addFilter( filter: IDefTargetSetFilter ): IDefTarget {
            this._filters.push( filter );
            return this;
        }

        abstract buildSet( source: HsSource, gameCtx: GameCtx ): HsLogic.HsEntity[];
    }



    export interface IDefTargetProperties {
        zoneArrayGetter: ( zones: HsLogic.HsZones ) => HsLogic.HsZone[],
        includePlayer?: boolean
    }


    export class DefTarget extends IDefTarget {

        constructor( protected _props: IDefTargetProperties ) { super(); }


        buildSet( source: HsSource, gameCtx: GameCtx ): HsLogic.HsEntity[] {
            let result: HsLogic.HsEntity[] = [],
                zones: HsLogic.HsZone[] = null,
                player: HsLogic.Player = null,
                cards: HsLogic.Card[] = null;

            for ( let i = 0; i < gameCtx.players.length; i++ ) {
                player = gameCtx.players[i];

                if ( this._props.includePlayer && this.testAgainstFilters( source, player, gameCtx ) )
                    result.push( player );

                zones = this._props.zoneArrayGetter( gameCtx.zonesOf( player ) );
                for ( let j = 0; j < zones.length; j++ ) {
                    cards = zones[j].getRawArray();

                    for ( let k = 0; k < cards.length; k++ )
                        if ( this.testAgainstFilters( source, cards[k], gameCtx ) )
                            result.push( cards[k] );
                }
            }

            return this.sort( result, gameCtx );
        }


        protected testAgainstFilters( source: HsSource, entity: HsLogic.HsEntity, gameCtx: GameCtx ): boolean {

            for ( let i = 0; i < this._filters.length; i++ ) {
                if ( !this._filters[i]( source, entity, gameCtx ) )
                    return false;
            }
            return true;
        }


        protected sort( array: HsLogic.HsEntity[], gameCtx: GameCtx ): HsLogic.HsEntity[] {
            return array.sort(
                ( a: HsLogic.HsEntity, b: HsLogic.HsEntity ): number => {
                    if ( a === gameCtx.activePlayer )
                        return -1;
                    else if ( b === gameCtx.activePlayer )
                        return 1
                    else
                        return a.id - b.id;
                });
        }

    }
}
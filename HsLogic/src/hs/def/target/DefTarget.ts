"use strict";

namespace Def {

    export type IDefTargetSetFilter = ( source: HsSource, entity: HSLogic.HsEntity, gameCtx: GameCtx ) => boolean;


    export abstract class IDefTarget {

        protected _filters: IDefTargetSetFilter[] = [];

        addFilter( filter: IDefTargetSetFilter ): IDefTarget {
            this._filters.push( filter );
            return this;
        }

        abstract buildSet( source: HsSource, gameCtx: GameCtx ): HSLogic.HsEntity[];
    }



    export interface IDefTargetProperties {
        zoneArrayGetter: ( zones: HSLogic.HsZones ) => HSLogic.HsZone[],
        includePlayer?: boolean
    }


    export class DefTarget extends IDefTarget {

        constructor( protected _props: IDefTargetProperties ) { super(); }


        buildSet( source: HsSource, gameCtx: GameCtx ): HSLogic.HsEntity[] {
            let result: HSLogic.HsEntity[] = [],
                zones: HSLogic.HsZone[] = null,
                player: HSLogic.Player = null,
                cards: HSLogic.Card[] = null;

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


        protected testAgainstFilters( source: HsSource, entity: HSLogic.HsEntity, gameCtx: GameCtx ): boolean {

            for ( let i = 0; i < this._filters.length; i++ ) {
                if ( !this._filters[i]( source, entity, gameCtx ) )
                    return false;
            }
            return true;
        }


        protected sort( array: HSLogic.HsEntity[], gameCtx: GameCtx ): HSLogic.HsEntity[] {
            return array.sort(
                ( a: HSLogic.HsEntity, b: HSLogic.HsEntity ): number => {
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
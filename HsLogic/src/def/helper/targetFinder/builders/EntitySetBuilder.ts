/// <reference path="../itargetsetbuilder.ts" />

"use strict";

namespace Def {

    export interface IDefTargetProperties {
        zones: ( zones: Zones ) => Zone[],
        includePlayer?: boolean
    }


    export class EntitySetBuilder<T extends Entity> extends ITargetSetBuilder<T> {

        constructor( protected param: IDefTargetProperties ) { super(); }

        protected _internalBuildSet( source: ISource, gameCtx: HsGameCtx ): Entity[] {
            let result: Entity[] = [],
                zones: Zone[] = null,
                player: HsLogic.Player = null,
                cards: Card[] = null;

            for ( let player of gameCtx.players ) {

                if ( this.param.includePlayer && this.testAgainstFilters( source, player, gameCtx ) )
                    result.push( player );

                if ( this.param.zones ) {
                    zones = this.param.zones( gameCtx.gameBoard.zonesOf( player ) );
                    for ( let j = 0; j < zones.length; j++ ) {
                        cards = zones[j].getRawArray();

                        for ( let k = 0; k < cards.length; k++ )
                            if ( this.testAgainstFilters( source, cards[k], gameCtx ) )
                                result.push( cards[k] );
                    }
                }
            }

            return result;
        }
    }
}
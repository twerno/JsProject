/// <reference path="../itargetsetbuilder.ts" />

"use strict";

namespace Def {

    export interface IDefTargetProperties {
        zones: ( zones: HsZones ) => HsZone[],
        includePlayer?: boolean
    }


    export class EntitySetBuilder<T extends Entity> extends ITargetSetBuilder<T> {

        constructor( protected param: IDefTargetProperties ) { super(); }

        protected _internalBuildSet( source: ISource, context: HsGameCtx ): Entity[] {
            let result: Entity[] = [],
                zones: HsZone[] = null,
                player: HsLogic.Player = null,
                cards: Card[] = null;

            for ( let i = 0; i < context.players.length; i++ ) {
                player = context.players[i];

                if ( this.param.includePlayer && this.testAgainstFilters( source, player, context ) )
                    result.push( player );

                if ( this.param.zones ) {
                    zones = this.param.zones( context.zonesOf( player ) );
                    for ( let j = 0; j < zones.length; j++ ) {
                        cards = zones[j].getRawArray();

                        for ( let k = 0; k < cards.length; k++ )
                            if ( this.testAgainstFilters( source, cards[k], context ) )
                                result.push( cards[k] );
                    }
                }
            }

            return result;
        }
    }
}
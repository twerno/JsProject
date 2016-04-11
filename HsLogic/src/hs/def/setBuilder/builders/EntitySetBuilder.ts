"use strict";

namespace Def {

    export interface IDefTargetProperties {
        zoneArrayGetter: ( zones: HsLogic.HsZones ) => HsLogic.HsZone<HsLogic.Card>[],
        includePlayer?: boolean
    }


    export class EntitySetBuilder extends IDefSetBuilder {

        constructor( protected _props: IDefTargetProperties ) { super(); }

        protected _internalBuildSet( source: ISource, context: HsGameCtx ): Entity[] {
            let result: Entity[] = [],
                zones: HsLogic.HsZone<HsLogic.Card>[] = null,
                player: HsLogic.Player = null,
                cards: HsLogic.Card[] = null;

            for ( let i = 0; i < context.players.length; i++ ) {
                player = context.players[i];

                if ( this._props.includePlayer && this.testAgainstFilters( source, player, context ) )
                    result.push( player );

                zones = this._props.zoneArrayGetter( context.zonesOf( player ) );
                for ( let j = 0; j < zones.length; j++ ) {
                    cards = zones[j].getRawArray();

                    for ( let k = 0; k < cards.length; k++ )
                        if ( this.testAgainstFilters( source, cards[k], context ) )
                            result.push( cards[k] );
                }
            }

            return result;
        }
    }
}
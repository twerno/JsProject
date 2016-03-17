"use strict";

namespace Def {

    export interface IDefTargetProperties {
        zoneArrayGetter: ( zones: HsLogic.HsZones ) => HsLogic.HsZone<HsLogic.Card>[],
        includePlayer?: boolean
    }


    export class EntitySetBuilder extends IDefSetBuilder {

        constructor( protected _props: IDefTargetProperties ) { super(); }

        protected _internalBuildSet( source: HsSource, gameCtx: GameCtx ): IHsEntityImpl[] {
            let result: HsLogic.HsEntity[] = [],
                zones: HsLogic.HsZone<HsLogic.Card>[] = null,
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

            return result;
        }
    }
}
/// <reference path="../itargetsetbuilder.ts" />

"use strict";

namespace Def {

    export interface IDefTargetProperties {
        zones: ( zones: Zones ) => Zone[],
        includeHeroes?: boolean
    }


    export class EntitySetBuilder<T extends Entity> extends ITargetSetBuilder<T> {

        constructor( protected param: IDefTargetProperties ) { super(); }

        protected _internalBuildSet( source: ISource, gameCtx: HsGameCtx ): Entity[] {
            let result: Entity[] = [],
                zones: Zone[] = null,
                cards: Card[] = null;

            for ( let player of gameCtx.players ) {

                if ( this.param.includeHeroes && this.testAgainstFilters( source, player.hero, gameCtx ) )
                    result.push( player.hero );

                if ( this.param.zones ) {
                    zones = this.param.zones( gameCtx.gameBoard.zonesOf( player ) );
                    for ( let zone of zones ) {
                        for ( let card of zone.getRawArray() )
                            if ( this.testAgainstFilters( source, card, gameCtx ) )
                                result.push( card );
                    }
                }
            }

            return result;
        }
    }
}
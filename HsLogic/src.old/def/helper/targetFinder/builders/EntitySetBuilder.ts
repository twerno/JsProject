/// <reference path="iEntitySetBuilder.ts" />
/// <reference path="../isetbuilder.ts" />

"use strict";

namespace Def {

    export interface IDefTargetProperties {
        zones: ( zones: Zones ) => Zone[],
        includeHeroes?: boolean,
        includePlayers?: boolean
    }


    export class EntitySetBuilder<T extends Entity> extends IEntitySetBuilder<T> {

        constructor( protected param: IDefTargetProperties ) { super(); }

        protected _internalBuildSet( source: ISource, gameCtx: HsGameCtx ): T[] {
            let result: Entity[] = [],
                zones: Zone[] = null,
                cards: Card[] = null;

            for ( let player of gameCtx.players ) {

                if ( this.param.includePlayers && this.testAgainstFilters( source, player, gameCtx ) )
                    result.push( player );

                if ( this.param.includeHeroes && this.testAgainstFilters( source, player.hero, gameCtx ) )
                    result.push( player.hero );

                if ( this.param.zones ) {
                    zones = this.param.zones( gameCtx.gameBoard.zonesOf( player ) );
                    for ( let zone of zones ) {
                        for ( let card of zone.entities )
                            if ( this.testAgainstFilters( source, card, gameCtx ) )
                                result.push( card );
                    }
                }
            }

            return <T[]>result;
        }
    }
}
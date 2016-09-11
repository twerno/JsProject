import {Card} from '../card/Card';
import {IDefTarget} from './IDefTarget';

export interface IDefTargetProperties {
    //zones: ( zones: Zones ) => Zone[],
    includeHeroes?: boolean,
    includePlayers?: boolean
}


export class PermanentTargetDef<T extends Card> extends IDefTarget<T> {

    constructor( protected param: IDefTargetProperties ) { 
        super(); 
    }

    protected _internalResultSet( source: Object, gameEnv: Object ): T[] {
        let result: T[] = [];

        if (source && gameEnv) {}

        /*
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
        */

        return result;
    }

	/**
     * order of play order
	 */
    protected _compare( a: T, b: T ): number {
        return a.compare(b);
    }
}

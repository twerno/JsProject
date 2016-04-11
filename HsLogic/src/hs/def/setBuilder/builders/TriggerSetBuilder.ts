"use strict";

namespace Def {

    export class TriggerSetBuilder extends IDefSetBuilder {

        protected eventType: string;

        constructor( event: HsLogic.ActionEvent<HsLogic.IActionParam> ) {
            super();
            this.eventType = event.type;
        }


        protected _internalBuildSet( source: ISource, context: HsGameCtx ): any[] {
            let result: any[] = [],
                player: Player,
                zones: HsLogic.HsZones;

            for ( let i = 0; i < context.players.length; i++ ) {
                player = context.players[i];
                zones = context.zonesOf( player );

                result.concat( this._triggersOfEventType( player.triggers, source, context ) );

                result.concat( this._lookForTriggers( zones.battlefield.getRawArray(), source, context ) );
                result.concat( this._lookForTriggers( zones.weapon.getRawArray(), source, context ) );
                result.concat( this._lookForTriggers( zones.hand.getRawArray(), source, context ) );
                result.concat( this._lookForTriggers( zones.secret.getRawArray(), source, context ) );
            }
            return result;
        }


        protected _lookForTriggers( cards: Card[], source: ISource, context: HsGameCtx ): any[] {
            let result: any[] = [];

            for ( let i = 0; i < cards.length; i++ ) {
                result.concat( this._triggersOfEventType( cards[i].triggers, source, context ) );
            }

            return result;
        }


        protected _triggersOfEventType( triggers: any[], source: ISource, context: HsGameCtx ): any[] {
            let result: any[] = [];

            for ( let i = 0; i < triggers.length; i++ )
                for ( let j = 0; j < triggers[i].eventType.length; j++ )
                    if ( triggers[i].eventType[j] === this.eventType
                        && this.testAgainstFilters( source, triggers[i], context ) )
                        result.push( triggers[i] );

            return result;
        }


        protected sort( array: any[], context: HsGameCtx ): any[] {
            return array.sort(
                ( a: any, b: any ): number => {
                    let result: number = a.triggerPriority - b.triggerPriority;
                    if ( result === 0 )
                        return a.orderOfPlay - b.orderOfPlay;
                    else
                        return result;
                });
        }


        protected compare( a: any, b: any ): number {
            let result: number = a.triggerPriority - b.triggerPriority;
            if ( result === 0 )
                return super.compare( a, b );
            else
                return result;
        }
    }
}
"use strict";

namespace Def {

    export class TriggerSetBuilder extends IDefSetBuilder {

        protected eventType: string;

        constructor( event: HsLogic.ActionEvent<HsLogic.IActionParam> ) {
            super();
            this.eventType = event.type;
        }


        protected _internalBuildSet( source: HsSource, gameCtx: GameCtx ): IHsEntityImpl[] {
            let result: IDefTriggerImpl[] = [],
                player: Player,
                zones: HsLogic.HsZones;

            for ( let i = 0; i < gameCtx.players.length; i++ ) {
                player = gameCtx.players[i];
                zones = gameCtx.zonesOf( player );

                result.concat( this._triggersOfEventType( player.triggers, source, gameCtx ) );

                result.concat( this._lookForTriggerIn( zones.battlefield.getRawArray(), source, gameCtx ) );
                result.concat( this._lookForTriggerIn( zones.weapon.getRawArray(), source, gameCtx ) );
                result.concat( this._lookForTriggerIn( zones.hand.getRawArray(), source, gameCtx ) );
                result.concat( this._lookForTriggerIn( zones.secret.getRawArray(), source, gameCtx ) );

                return result;
            }
        }

        protected _lookForTriggerIn( cards: Card[], source: HsSource, gameCtx: GameCtx ): IDefTriggerImpl[] {
            let result: IDefTriggerImpl[] = [];

            for ( let i = 0; i < cards.length; i++ ) {
                result.concat( this._triggersOfEventType( cards[i].triggers, source, gameCtx ) );
            }

            return result;
        }

        protected _triggersOfEventType( triggers: IDefTriggerImpl[], source: HsSource, gameCtx: GameCtx ): IDefTriggerImpl[] {
            let result: IDefTriggerImpl[] = [];

            for ( let i = 0; i < triggers.length; i++ )
                if ( triggers[i].eventType === this.eventType
                    && this.testAgainstFilters( source, triggers[i], gameCtx ) )
                    result.push( triggers[i] );

            return result;
        }

        protected sort( array: IDefTriggerImpl[], gameCtx: GameCtx ): IDefTriggerImpl[] {
            return array.sort(
                ( a: IDefTriggerImpl, b: IDefTriggerImpl ): number => {
                    let result: number = a.triggerPriority - b.triggerPriority;
                    if ( result === 0 )
                        return a.orderOfPlay - b.orderOfPlay;
                    else
                        return result;
                });
        }

        protected compare( a: IDefTriggerImpl, b: IDefTriggerImpl ): number {
            let result: number = a.triggerPriority - b.triggerPriority;
            if ( result === 0 )
                return super.compare( a, b );
            else
                return result;
        }
    }
}
/// <reference path="iEntitySetBuilder.ts" />

"use strict";

namespace Def {

    export class TriggerSetBuilder extends IEntitySetBuilder<Trigger> {

        private _eventType: string;

        constructor( private _event: HsLogic.ActionEvent<HsLogic.IActionParam> ) {
            super();
            this._eventType = _event.type;

            this.init();
        }


        protected init(): void {
            let self: TriggerSetBuilder = this;

            this.addFilter(( source: ISource, trigger: Trigger, gameCtx: HsGameCtx ): boolean => {
                return trigger instanceof HsLogic.Trigger
                    && trigger.respondsTo.indexOf( self._eventType ) !== -1
                    && ( !trigger.enable_self_trigger_protection
                        || HsLogic.Trigger.SELF_TRIGGER_PROTECTOR( trigger, self._event, gameCtx ) );
            })
        }


        protected _internalBuildSet( source: ISource, gameCtx: HsGameCtx ): any[] {
            let result: any[] = [],
                player: Player,
                zones: HsLogic.Zones;

            for ( let i = 0; i < gameCtx.players.length; i++ ) {
                player = gameCtx.players[i];
                zones = gameCtx.gameBoard.zonesOf( player );

                result = result.concat( this._getApplicableTriggers( player.triggers, source, gameCtx ) );
                result = result.concat( this._getApplicableTriggers( player.hero.triggers, source, gameCtx ) );

                result = result.concat( this._locateTriggerInside( zones.battlefield.entities, source, gameCtx ) );
                result = result.concat( this._locateTriggerInside( zones.weapon.entities, source, gameCtx ) );
                result = result.concat( this._locateTriggerInside( zones.hand.entities, source, gameCtx ) );
                result = result.concat( this._locateTriggerInside( zones.secret.entities, source, gameCtx ) );
            }
            return result;
        }


        protected _locateTriggerInside( cards: Card[], source: ISource, gameCtx: HsGameCtx ): Trigger[] {
            let result: any[] = [];

            for ( let i = 0; i < cards.length; i++ )
                result.push.apply( result, this._getApplicableTriggers( cards[i].triggers, source, gameCtx ) );

            return result;
        }


        protected _getApplicableTriggers( triggers: Trigger[], source: ISource, gameCtx: HsGameCtx ): Trigger[] {
            let result: any[] = [];

            for ( let i = 0; i < triggers.length; i++ )
                if ( this.testAgainstFilters( source, triggers[i], gameCtx ) )
                    result.push( triggers[i] );

            return result;
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
"use strict";

namespace Def {

    export class TriggerSetBuilder extends ITargetSetBuilder {

        private _eventType: string;

        constructor( private _event: HsLogic.ActionEvent<HsLogic.IActionParam> ) {
            super();
            this._eventType = _event.type;

            this.init();
        }


        protected init(): void {
            let self: TriggerSetBuilder = this;

            this.addFilter(( source: ISource, trigger: Trigger, context: HsGameCtx ): boolean => {
                return trigger instanceof HsLogic.Trigger
                    && trigger.respondsTo.indexOf( self._eventType ) !== -1
                    && ( !trigger.disable_self_trigger_protection
                        || HsLogic.Trigger.SELF_TRIGGER_PROTECTOR( trigger, self._event, context ) );
            })
        }


        protected _internalBuildSet( source: ISource, context: HsGameCtx ): any[] {
            let result: any[] = [],
                player: Player,
                zones: HsLogic.HsZones;

            for ( let i = 0; i < context.players.length; i++ ) {
                player = context.players[i];
                zones = context.zonesOf( player );

                result.concat( this._getApplicableTriggers( player.triggers, source, context ) );

                result.concat( this._locateTriggerInside( zones.battlefield.getRawArray(), source, context ) );
                result.concat( this._locateTriggerInside( zones.weapon.getRawArray(), source, context ) );
                result.concat( this._locateTriggerInside( zones.hand.getRawArray(), source, context ) );
                result.concat( this._locateTriggerInside( zones.secret.getRawArray(), source, context ) );
            }
            return result;
        }


        protected _locateTriggerInside( cards: Card[], source: ISource, context: HsGameCtx ): Trigger[] {
            let result: any[] = [];

            for ( let i = 0; i < cards.length; i++ )
                result.concat( this._getApplicableTriggers( cards[i].triggers, source, context ) );

            return result;
        }


        protected _getApplicableTriggers( triggers: Trigger[], source: ISource, context: HsGameCtx ): Trigger[] {
            let result: any[] = [];

            for ( let i = 0; i < triggers.length; i++ )
                if ( this.testAgainstFilters( source, triggers[i], context ) )
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
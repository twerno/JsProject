/// <reference path="../card/genentity.ts" />

"use strict";

namespace HsLogic {

    export class Trigger extends Entity {
        def: Def.IDefTrigger;

        get owner(): Player { return this.attachedTo.owner }
        attachedTo: Card | Player;
        sourceCard: Card;

        keyword: string;
        respondsTo: string[] = [];
        triggerPriority: number;

        enable_self_trigger_protection: boolean;

        triggerable: Def.FTriggerable;
        actionBuilder: Def.FTriggerActionBulder;


        constructor( attachedTo: Card | Player, sourceCard: Card, def?: Def.IDefTrigger ) {
            super( null, def );

            this.attachedTo = attachedTo || null;
            this.sourceCard = sourceCard || null;
        }

        init(): Trigger {
            super.init();
            return this;
        }

        protected initFromDefinition( def: Def.IDefTrigger ): void {
            super.initFromDefinition( def );

            if ( def.respondsTo instanceof Array )
                for ( let i = 0; i < def.respondsTo.length; i++ )
                    this.respondsTo.push( ClassUtils.getNameOfClass(( <ActionEventClass[]>def.respondsTo )[i] ) );
            else
                this.respondsTo.push( ClassUtils.getNameOfClass( def.respondsTo ) );

            this.keyword = def.keyword || Def.KEYWORD.NONE;
            this.triggerPriority = def.triggerPriority || Def.TRIGGER_PRIORITY_DEFAULT;
            this.enable_self_trigger_protection = enableSelfTriggerProtectionVal( def.enable_self_trigger_protection );
            this.triggerable = def.triggerable || null;
            this.actionBuilder = def.actionBuilder;
        }


        static SELF_TRIGGER_PROTECTOR( trigger: Trigger, event: ActionEvent<IActionParam>, gameCtx: HsGameCtx ): boolean {
            return trigger.sourceCard !== event.param.source.entity;
        }

        getSourceType(): SOURCE_TYPE {
            return this.attachedTo.getSourceType();
        }

        set owner( dummy: Player ) { /* dummy */ }

    } // class Trigger



    function enableSelfTriggerProtectionVal( value: boolean ): boolean {
        if ( value == null
            || value === undefined )
            return true;
        else
            return value;
    }
}
/// <reference path="hsentity.ts" />

"use strict";

namespace HsLogic {

    export class Trigger extends HsEntity {
        def: Def.IDefTrigger;

        get owner(): Player { return this.parent.owner }
        parent: Card | Player;
        sourceCard: Card;

        keyword: string;
        respondsTo: string[];
        triggerPriority: number;

        enable_self_trigger_protection: boolean;

        triggerable: Def.FTriggerable;
        actionBuilder: Def.FTriggerActionBulder;

        internalCtx: Object = {};


        constructor( parent: Card | Player, sourceCard: Card, def?: Def.IDefTrigger ) {
            super( parent.owner, def );

            this.parent = parent || null;
            this.sourceCard = sourceCard || null;
        }


        initFromDefinition( def: Def.IDefTrigger ): void {
            super.initFromDefinition( def );

            if ( def.respondsTo instanceof Array )
                for ( let i = 0; i < def.respondsTo.length; i++ )
                    this.respondsTo.push( ClassUtils.getNameOfClass(( <ActionEventClass[]>def.respondsTo )[i] ) );
            else
                this.respondsTo.push( ClassUtils.getNameOfClass( def.respondsTo ) );

            this.keyword = def.keyword;
            this.triggerPriority = def.triggerPriority || Def.TRIGGER_PRIORITY_DEFAULT;
            this.enable_self_trigger_protection = enableSelfTriggerProtectionVal( def.enable_self_trigger_protection );
            this.triggerable = def.triggerable || null;
            this.actionBuilder = def.actionBuilder;
        }


        static SELF_TRIGGER_PROTECTOR( trigger: Trigger, event: ActionEvent<IActionParam>, context: HsGameCtx ): boolean {
            return trigger.sourceCard !== event.param.source.entity;
        }

        getSourceType(): SOURCE_TYPE {
            return this.parent.getSourceType();
        }

    } // class Trigger



    function enableSelfTriggerProtectionVal( value: boolean ): boolean {
        if ( value == null
            || value === undefined )
            return false;
        else
            return value;
    }
}
"use strict";

namespace HsLogic {

    export class Trigger extends HsEntity {
        def: Def.IDefTrigger;

        get owner(): Player { return this.parent.owner }
        parent: HsEntity;
        sourceCard: Card;

        respondsTo: string[];
        triggerPriority: number;

        disable_self_trigger_protection: boolean;

        triggerable: Def.FTriggerable;
        actionBuilder: Def.FTriggerActionBulder;


        constructor( parent: HsEntity, sourceCard: Card, def?: Def.IDefTrigger ) {
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

            this.triggerPriority = def.triggerPriority;
            this.disable_self_trigger_protection = def.disable_self_trigger_protection;
            this.triggerable = def.triggerable || null;
            this.actionBuilder = def.actionBuilder;
        }


        static SELF_TRIGGER_PROTECTOR( trigger: Trigger, event: ActionEvent<IActionParam>, context: HsGameCtx ): boolean {
            return trigger.sourceCard !== event.param.source.sourceCard;
        }

    } // class Trigger

}
"use strict";

namespace HsLogic {

    export class Trigger extends HsEntity {
        parent: HsEntity;
        sourceCard: Card;
        eventType: string[] = [];
        triggerPriority: number;

        actions: Def.IDefTriggerAction;
        triggerable: Def.FTriggerable;
        computeOwner: ( self: Trigger ) => Player;

        constructor( parent: HsEntity, sourceCard: Card, def?: Def.IHsEntity ) {
            super( parent.owner, def );

            this.parent = parent || null;
            this.sourceCard = sourceCard || null;
        }


        initFromDefinition( def: Def.IDefTrigger ): void {
            super.initFromDefinition( def );

            if ( def.eventClass instanceof Array )
                for ( let i = 0; i < def.eventClass.length; i++ )
                    this.eventType.push( ClassUtils.getNameOfClass(( <ActionEventClass[]>def.eventClass )[i] ) );
            else
                this.eventType.push( ClassUtils.getNameOfClass( def.eventClass ) );
            this.triggerPriority = def.triggerPriority;
            this.actions = def.actions;
            this.triggerable = def.triggerable || Trigger.SELF_TRIGGER_PROTECTOR;
        }


        // http://hearthstone.gamepedia.com/Advanced_rulebook#Glossary
        // Humble safeguard: Minions are not allowed to trigger on themselves entering play.
        static SELF_TRIGGER_PROTECTOR( self: Trigger, event: ActionEvent<IActionParam>, context: HsGameCtx ): boolean {
            return self.sourceCard !== event.param.source.sourceCard;
        }


        get owner(): Player {
            if ( this.computeOwner )
                return <Player>this.computeOwner( this );
            else
                return this.parent.owner;
        }
    }
}
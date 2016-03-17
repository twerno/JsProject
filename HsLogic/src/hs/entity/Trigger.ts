///<reference path="../def/entity/ICard.ts"/>

"use strict";

namespace HsLogic {

    export class Trigger extends HsEntity implements Def.IDefTriggerImpl {
        parent: HsEntity;
        sourceCard: Card;
        eventType: string;
        triggerPriority: number;

        actions: Def.IDefTriggerAction;
        triggerable: Def.FTriggerable;
        computeOwner: ( self: Trigger ) => Player;

        constructor( parent: HsEntity, sourceCard: Card, def?: Def.IHsEntity ) {
            super( parent.owner, def );

            this.type = Def.TYPE.TRIGGER;
            this.parent = parent || null;
            this.sourceCard = sourceCard || null;
        }

        initFromDefinition( def: Def.IDefTrigger ): void {
            super.initFromDefinition( def );

            this.computeOwner = def.owner;
            this.eventType = ClassUtils.getNameOfClass( def.eventClass );
            this.triggerPriority = def.triggerPriority;
            this.actions = def.actions || [];
            this.triggerable = def.triggerable || Trigger.SELF_TRIGGER_PROTECTOR;
        }

        static SELF_TRIGGER_PROTECTOR( self: Def.IDefTriggerImpl, eventParam: IActionParam, gameCtx: HsGameCtx ): boolean {
            return self.sourceCard !== eventParam.source.card;
        }

        get owner(): Player {
            if ( this.computeOwner )
                return <Player>this.computeOwner( this );
            else
                return this.parent.owner;
        }
    }
}
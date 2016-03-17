"use strict";

namespace Def {

    export type FTriggerable = ( self: IDefTriggerImpl, eventParam: IActionParam, gameCtx: GameCtx ) => boolean;
    export type IDefTriggerAction = ( self: IDefTriggerImpl, eventParam: IActionParam, gameCtx: GameCtx ) => Action[];

    export interface IDefTrigger extends IHsEntity {
        eventClass: ActionEventClass,
        triggerPriority: number,
        actions: IDefTriggerAction,
        triggerable?: FTriggerable,
        owner: ( self: IDefTriggerImpl ) => Player;
    }

    export interface IDefTriggerImpl extends IHsEntityImpl {
        computeOwner: ( self: IDefTriggerImpl ) => Player,
        parent: IHsEntityImpl,
        sourceCard: ICardImpl,

        eventType: string,
        triggerPriority: number,
        actions: IDefTriggerAction,
        triggerable: FTriggerable
    }

}
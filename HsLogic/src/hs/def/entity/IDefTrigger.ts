"use strict";

namespace Def {

    export type FTriggerable = ( self: IDefTriggerImpl, event: ActionEvent, gameCtx: GameCtx ) => boolean;
    export type IDefTriggerAction = ( self: IDefTriggerImpl, event: ActionEvent, gameCtx: GameCtx ) => Action[];

    export const Trigger_Priority_DEFAULT = 200;


    export interface IDefTrigger extends IHsEntity {
        eventClass: ActionEventClass | ActionEventClass[],
        triggerPriority: number,
        actions: IDefTriggerAction,
        triggerable?: FTriggerable,
    }

    export interface IDefTriggerImpl extends IHsEntityImpl {
        parent: IHsEntity,
        sourceCard: ICardImpl,

        eventType: string[],
        triggerPriority: number,
        actions: IDefTriggerAction,
        triggerable: FTriggerable
    }

}
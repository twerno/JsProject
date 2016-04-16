"use strict";

namespace Def {

    export type FTriggerable = ( trigger: Trigger, event: ActionEvent, context: HsGameCtx ) => boolean;
    export type FTriggerActionBulder = ( trigger: Trigger, event: ActionEvent, context: HsGameCtx ) => Action | Action[];


    export const TRIGGER_PRIORITY_LOWEST = 100;
    export const TRIGGER_PRIORITY_DEFAULT = 200;
    export const TRIGGER_PRIORITY_HIGHEST = 300;


    export interface IDefTrigger {

        keyword?: string,

        triggerPriority?: number,

        respondsTo: ActionEventClass | ActionEventClass[],

        // http://hearthstone.gamepedia.com/Advanced_rulebook#Glossary
        // Humble safeguard: Minions are not allowed to trigger on themselves entering play.
        enable_self_trigger_protection?: boolean,

        triggerable?: FTriggerable;

        actionBuilder: FTriggerActionBulder,
    }
}
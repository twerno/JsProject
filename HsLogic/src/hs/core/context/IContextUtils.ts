"use strict";

namespace HsLogic {

    export interface IEventMgr {
        save( event: ActionEvent<IActionParam> ): void;
        get( eventClass: ActionEventClass ): ActionEvent<IActionParam>[];
        count( eventClass: ActionEventClass ): number;
        has( eventClass: ActionEventClass ): boolean;
    }

    export interface IPendingEvents {
        summon: event.Summon[],
        death: ActionEvent<IActionParam>[],
        //general: ActionEvent<IActionParam>[]
    }

    export interface PowerMgr {
        getHealPower( source: ISource ): number;
        getDamagePower( source: ISource, damageType: Def.DAMAGE_TYPE ): number;
    }

    //export interface LethalMonitorElement {
    //    target: Character,
    //    SourceBuffer: ISource
    //}

    export interface LethalMonitor {
        registerCandidate( target: Character, source: ISource ): void;
        clear(): void;
        getSourceFor( target: Character ): ISource;
    }

}
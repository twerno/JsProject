"use strict";

namespace HsLogic {

    export interface IEventMgr {
        save( event: ActionEvent<IActionParam> ): void;
        get( eventClass: ActionEventClass ): ActionEvent<IActionParam>[];
        count( eventClass: ActionEventClass ): number;
        has( eventClass: ActionEventClass ): boolean;
        isEmpty(): boolean;
    }



    export interface IPowerMgr {
        healBoost( source: ISource, gameCtx: HsGameCtx ): number;
        damageBoost( param: CalculateDamageParam, gameCtx: HsGameCtx ): number;
    }



    export interface ILethalMonitor {
        registerCandidate( target: Character, source: ISource ): void;
        clear(): void;
        getSourceFor( target: Character ): ISource;
    }


    export interface ContextConsts {
        battlefield_limit: number,
        mana_limit: number,
        hand_size_limit: number
    }

}
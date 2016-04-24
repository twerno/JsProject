"use strict";

namespace HsTest {

    // aliases
    export type IActionClass = jsAction.IActionClass;
    export type ActionType = HsLogic.ActionType;
    export type HsGameCtx = HsLogic.HsGameCtx;
    export type Player = HsLogic.Player;
    export type Zones = HsLogic.Zones;
    export type Card = HsLogic.Card;
    export type ICard = Def.ICard;
    export type IMinion = Def.IMinion;
    export type IWeapon = Def.IWeapon;




    export enum TestResultState {
        NOT_RESOLVABLE, RESOLVING, UNTESTED, PASSED, FAILED, RESOLVING_ERROR, TEST_ERROR
    }

    export enum TestSequenceResultState {
        PASSED, FAILED, RESOLVING_ERROR, TEST_ERROR, UNRESOLVED_TEST_LEFT
    }


    export interface TestResult {
        id: string,
        actionClass: string,
        chain: string[],
        state: TestResultState,
        param: {
            before: HsLogic.IActionParam,
            after: HsLogic.IActionParam
        },
        eventClass: string,
        executionTime?: number
    }


    export interface TestSequenceResult {
        id: string,
        testTitle: string,
        testResults: TestResult[],
        state: TestSequenceResultState,
        error: Error
    }


    export interface Test {

        timeLimit?: number,

        toBeTested: IActionClass,

        testable?: ( action: ActionType, hsGameCtx: HsGameCtx ) => boolean

        test: ( action: ActionType, hsGameCtx: HsGameCtx ) => boolean;
    }


    export interface TestSequence {
        hsGameCtxBuilder: () => HsGameCtx,
        actions: ( hsGameCtx: HsGameCtx ) => ActionType[],
        tests: Test[],
        consequencesMonitorExcludes?: jsAction.IActionClass[]
    }

}